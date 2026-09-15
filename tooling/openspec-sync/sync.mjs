#!/usr/bin/env node
/**
 * openspec-sync — is the workshop deck still true for the current OpenSpec?
 *
 *   node tooling/openspec-sync/sync.mjs            # report (also writes report.md)
 *   node tooling/openspec-sync/sync.mjs --update   # re-baseline at latest, after fixing the deck
 *   node tooling/openspec-sync/sync.mjs --baseline 1.11.0   # declare which version the deck was last true for
 *
 * Exit 0 = nothing to do. Exit 1 = something needs your attention.
 *
 * Determinism model:
 *   - assertions.mjs  -> hard pass/fail, no judgement (tier 1)
 *   - content hashes  -> an unchanged hash is PROOF there is no work (tier 2)
 *   - changelog       -> the "why", for the sources that did move (tier 3)
 * Nothing is inferred: a source is either byte-identical to the baseline or it
 * is shown to you as a diff.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { upstream, sources, noImpact } from './sources.mjs';
import { assertions } from './assertions.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../..');
const CACHE = path.join(HERE, '.cache');
const LOCK = path.join(HERE, 'sync.lock.json');
const REPORT = path.join(HERE, 'report.md');
const UPDATE = process.argv.includes('--update');
const BASELINE = (() => { const i = process.argv.indexOf('--baseline'); return i > -1 ? process.argv[i + 1] : null; })();

const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
const short = (h) => h.slice(0, 12);

function cmpVer(a, b) {
  const pa = a.split('-')[0].split('.').map(Number);
  const pb = b.split('-')[0].split('.').map(Number);
  for (let i = 0; i < 3; i++) if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) - (pb[i] || 0);
  const ra = a.includes('-'), rb = b.includes('-');
  return ra === rb ? 0 : ra ? -1 : 1;
}

// ------------------------------------------------------------------ fetching

function ensureCli(version) {
  const dir = path.join(CACHE, 'cli', version);
  const bin = path.join(dir, 'node_modules', '.bin', 'openspec');
  if (!fs.existsSync(bin)) {
    fs.mkdirSync(dir, { recursive: true });
    process.stderr.write(`  · installing ${upstream.pkg}@${version} (cached after this)\n`);
    execSync(`npm install --silent --no-audit --no-fund --prefix "${dir}" ${upstream.pkg}@${version}`, { stdio: 'pipe' });
  }
  return bin;
}

async function ghFile(tag, p) {
  const cached = path.join(CACHE, 'gh', tag, p);
  if (fs.existsSync(cached)) return fs.readFileSync(cached, 'utf8');
  const url = `https://raw.githubusercontent.com/${upstream.owner}/${upstream.repo}/${tag}/${p}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const text = await res.text();
  fs.mkdirSync(path.dirname(cached), { recursive: true });
  fs.writeFileSync(cached, text);
  return text;
}

function ghIssue(n) {
  try {
    return JSON.parse(execFileSync('gh', ['api', `repos/${upstream.owner}/${upstream.repo}/issues/${n}`], { encoding: 'utf8' }));
  } catch {
    return null;
  }
}

function makeCtx(version) {
  const tag = upstream.tag(version);
  let bin;
  return {
    version,
    gh: (p) => ghFile(tag, p),
    cli: (argv) => {
      bin ??= ensureCli(version);
      return execFileSync(bin, [...argv, '--help'], {
        encoding: 'utf8',
        env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0', COLUMNS: '100' },
      });
    },
    issue: (n) => ghIssue(n),
  };
}

async function contentOf(src, ctx) {
  if (src.kind === 'github-file') return await ctx.gh(src.path);
  if (src.kind === 'cli-help') return ctx.cli(src.argv);
  if (src.kind === 'github-issue') {
    const i = ctx.issue(src.number);
    return i ? `state=${i.state}` : null;
  }
  throw new Error(`unknown source kind: ${src.kind}`);
}

function diff(a, b, label) {
  const dir = fs.mkdtempSync(path.join(CACHE, 'diff-'));
  const fa = path.join(dir, 'baseline'), fb = path.join(dir, 'current');
  fs.writeFileSync(fa, a); fs.writeFileSync(fb, b);
  let out = '';
  try {
    execFileSync('git', ['diff', '--no-index', '--no-color', '--unified=3', '--', fa, fb], { encoding: 'utf8' });
  } catch (e) {
    out = e.stdout || '';
  }
  fs.rmSync(dir, { recursive: true, force: true });
  return out
    .split('\n')
    .filter((l) => !/^(diff --git|index |--- |\+\+\+ )/.test(l))
    .join('\n')
    .trim() || `(changed, but no textual diff — ${label})`;
}

function changelogWindow(text, fromVer, toVer) {
  const sections = [];
  let cur = null;
  for (const line of text.split('\n')) {
    const m = line.match(/^## (\d+\.\d+\.\d+\S*)\s*$/);
    if (m) { cur = { v: m[1], body: [] }; sections.push(cur); continue; }
    if (cur) cur.body.push(line);
  }
  return sections
    .filter((s) => cmpVer(s.v, fromVer) > 0 && cmpVer(s.v, toVer) <= 0)
    .map((s) => ({
      v: s.v,
      body: s.body.join('\n')
        .replace(/\[`[0-9a-f]{7,}`\]\(https:\/\/github\.com\/\S+?\)\s*/g, '')
        .replace(/Thanks \[@[^\]]+\]\([^)]+\)!\s*/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim(),
    }));
}

// ------------------------------------------------------------------ main

const lock = fs.existsSync(LOCK)
  ? JSON.parse(fs.readFileSync(LOCK, 'utf8'))
  : { openspec_version: null, reconciled_at: null, sources: {} };

const latest = execSync(`npm view ${upstream.pkg} version`, { encoding: 'utf8' }).trim();
const pinned = lock.openspec_version;
const baselined = Boolean(pinned && Object.keys(lock.sources).length);

process.stderr.write(`openspec-sync: pinned ${pinned ?? '(none)'} -> latest ${latest}\n`);
fs.mkdirSync(CACHE, { recursive: true });

// --baseline <version>: record hashes at an arbitrary version and stop. Use it to
// state the version the deck was actually written against, so the first real
// run produces a meaningful window instead of an empty one.
if (BASELINE) {
  const ctx = makeCtx(BASELINE);
  const next = { openspec_version: BASELINE, reconciled_at: new Date().toISOString().slice(0, 10), sources: {} };
  for (const src of sources) {
    try {
      const c = await contentOf(src, ctx);
      if (c != null) next.sources[src.id] = { kind: src.kind, hash: sha(c), tier: src.tier };
      else process.stderr.write(`  ! ${src.id}: unavailable\n`);
    } catch (e) {
      process.stderr.write(`  ! ${src.id}: ${e.message}\n`);
    }
  }
  fs.writeFileSync(LOCK, JSON.stringify(next, null, 2) + '\n');
  process.stderr.write(`baseline written at ${BASELINE} (${Object.keys(next.sources).length} sources)\n`);
  process.exit(0);
}

const ctxLatest = makeCtx(latest);

// 1. assertions ------------------------------------------------------------
const assertResults = [];
for (const a of assertions) {
  let r;
  try { r = await a.run(ctxLatest); }
  catch (e) { r = { status: 'unresolved', detail: `threw: ${e.message}` }; }
  assertResults.push({ ...a, ...r });
}

// 2. hashes ----------------------------------------------------------------
const changed = [], unchanged = [], added = [], failed = [];
for (const src of sources) {
  let content;
  try { content = await contentOf(src, ctxLatest); }
  catch (e) { failed.push({ src, error: e.message }); continue; }
  if (content == null) { failed.push({ src, error: 'source unavailable' }); continue; }
  const h = sha(content);
  const prev = lock.sources[src.id]?.hash;
  if (!prev) added.push({ src, hash: h, content });
  else if (prev === h) unchanged.push({ src, hash: h });
  else changed.push({ src, hash: h, prev, content });
}

// 3. diffs for changed sources (needs the pinned version) ------------------
if (changed.length && pinned) {
  const ctxPinned = makeCtx(pinned);
  for (const c of changed) {
    try {
      const before = await contentOf(c.src, ctxPinned);
      c.diff = before == null ? '(baseline content unavailable)' : diff(before, c.content, c.src.id);
    } catch (e) {
      c.diff = `(could not reconstruct baseline at v${pinned}: ${e.message})`;
    }
  }
}

// 4. changelog window ------------------------------------------------------
let releases = [];
if (pinned && cmpVer(latest, pinned) > 0) {
  try {
    releases = changelogWindow(await ghFile(upstream.tag(latest), 'CHANGELOG.md'), pinned, latest);
  } catch (e) {
    releases = [{ v: '?', body: `could not read CHANGELOG.md: ${e.message}` }];
  }
}

// 5. report ----------------------------------------------------------------
const mismatches = assertResults.filter((r) => r.status === 'mismatch');
const unresolved = assertResults.filter((r) => r.status === 'unresolved');
const L = [];
const p = (s = '') => L.push(s);

p(`# OpenSpec sync report`);
p();
p(`| | |`);
p(`|---|---|`);
p(`| content baseline | ${baselined ? `**${pinned}** (recorded ${lock.reconciled_at ?? 'date unknown'})` : '_none yet_'} |`);
p(`| latest released | **${latest}** |`);
p(`| releases in window | ${releases.length ? releases.map((r) => r.v).join(', ') : '—'} |`);
p(`| tracked sources | ${sources.length} (${sources.flatMap((s) => s.backs).length} slide claims) |`);
p();

p(`## 1. Assertions — hard facts, no judgement`);
p();
p(`_Independent of the baseline: these compare the deck's stated facts against`);
p(`the current release every run, and keep failing until a slide is edited._`);
p();
if (mismatches.length === 0 && unresolved.length === 0) {
  p(`All ${assertResults.length} passed.`);
} else {
  for (const r of assertResults) {
    if (r.status === 'ok') continue;
    p(`### ${r.status === 'mismatch' ? 'MISMATCH' : 'UNRESOLVED'} · \`${r.id}\``);
    p(`- **slide**: \`${r.claim.slide}\``);
    if (r.claim.text) p(`- **slide claims**: ${r.claim.text}`);
    p(`- **upstream**: ${r.detail}`);
    p();
  }
  const ok = assertResults.filter((r) => r.status === 'ok');
  if (ok.length) p(`_Passing: ${ok.map((r) => '`' + r.id + '`').join(', ')}_`);
}
p();

p(`## 2. Tracked sources`);
p();
if (!baselined) {
  p(`No baseline recorded yet, so all ${added.length} sources are new. Nothing can be`);
  p(`diffed until you reconcile the deck and run \`--update\` once.`);
} else {
  p(`**${changed.length} changed**, ${unchanged.length} unchanged${added.length ? `, ${added.length} newly tracked` : ''}${failed.length ? `, ${failed.length} unreadable` : ''}.`);
  p();
  if (unchanged.length) {
    p(`<details><summary>${unchanged.length} unchanged — provably no work</summary>`);
    p();
    p(unchanged.map((u) => '`' + u.src.id + '`').join(', '));
    p();
    p(`</details>`);
    p();
  }
  for (const c of changed.sort((a, b) => a.src.tier - b.src.tier)) {
    p(`### \`${c.src.id}\` · tier ${c.src.tier} · ${c.src.path ?? 'openspec ' + (c.src.argv?.join(' ') || '') + ' --help'}`);
    p();
    p(`Slides that depend on it:`);
    for (const b of c.src.backs) p(`- \`${b.slide}\` — ${b.claim}`);
    p();
    p('```diff');
    p((c.diff ?? '(no baseline to diff against)').split('\n').slice(0, 120).join('\n'));
    p('```');
    p();
  }
}
for (const f of failed) p(`- **unreadable**: \`${f.src.id}\` — ${f.error}`);
p();

p(`## 3. Changelog ${pinned ? `${pinned} → ${latest}` : '(no window without a baseline)'}`);
p();
if (!releases.length) p(`_No releases in the window._`);
for (const r of releases) {
  p(`### ${r.v}`);
  p();
  p(r.body);
  p();
}

p(`## 4. Not tracked, on purpose`);
p();
p(noImpact.map((n) => '`' + n + '`').join(', '));
p();

const report = L.join('\n');
fs.writeFileSync(REPORT, report);
process.stdout.write(report + '\n');

// 6. --update --------------------------------------------------------------
if (UPDATE) {
  const next = { openspec_version: latest, reconciled_at: new Date().toISOString().slice(0, 10), sources: {} };
  for (const e of [...unchanged, ...changed, ...added]) {
    next.sources[e.src.id] = { kind: e.src.kind, hash: e.hash, tier: e.src.tier };
  }
  for (const f of failed) if (lock.sources[f.src.id]) next.sources[f.src.id] = lock.sources[f.src.id];
  fs.writeFileSync(LOCK, JSON.stringify(next, null, 2) + '\n');
  process.stderr.write(`\nbaseline updated -> ${latest} (${Object.keys(next.sources).length} sources)\n`);
}

const dirty = mismatches.length || unresolved.length || changed.length || (!baselined);
process.stderr.write(`\nreport written to ${path.relative(REPO, REPORT)}\n`);
process.exit(UPDATE ? 0 : dirty ? 1 : 0);
