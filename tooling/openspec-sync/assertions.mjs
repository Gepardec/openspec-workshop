/**
 * TIER-1 EXECUTABLE ASSERTIONS
 *
 * Hashing tells you something moved. These tell you the deck is *wrong*, with
 * no LLM in the loop and no false positives. They are language-independent,
 * which matters because the deck is German and the upstream docs are English.
 *
 * `deckClaims` is the expected side: the fact as the slide currently states it.
 * When you change a slide, change the constant here in the same commit — that
 * pairing is the whole point.
 *
 * Every assertion returns one of:
 *   ok         - slide and upstream agree
 *   mismatch   - the fact changed; the named slide needs an edit
 *   unresolved - the extraction failed (upstream renamed/moved something).
 *                NOT a pass. Go look, then fix the extractor here.
 */

import fs from 'node:fs';
import path from 'node:path';

export const deckClaims = {
  artifactIds: {
    value: ['proposal', 'specs', 'design', 'tasks'],
    slide: 'slides/pages/02-phases-documents.md',
    text: 'Die vier Artefakte proposal, specs, design, tasks',
  },
  tasksRequires: {
    value: ['specs', 'design'],
    slide: 'slides/pages/02-phases-documents.md',
    text: 'tasks baut auf specs und design auf',
  },
  designNotEnforced: {
    value: true,
    slide: 'slides/pages/02-phases-documents.md, 04-cli-navigator.md',
    text: 'Abhängigkeiten, keine Sperren: design.md entsteht nur, wenn der Change es braucht; validate und archive laufen ohne',
  },
  coreWorkflows: {
    value: ['propose', 'explore', 'apply', 'update', 'sync', 'archive'],
    slide: 'slides/pages/03-setup-config.md',
    text: 'Profil-Tabelle, Zeile "core (default)"',
  },
  profileNames: {
    value: ['core', 'custom'],
    slide: 'slides/pages/03-setup-config.md',
    text: 'Profil-Tabelle nennt die Profile "core" und "custom"',
  },
  strictRequiresShall: {
    value: true,
    slide: 'slides/pages/02-phases-documents.md',
    text: 'Notes Begriffe: validate --strict verlangt ein englisches SHALL/MUST je Requirement; ohne --strict nur Warnung',
  },
  deltaOperations: {
    value: ['ADDED', 'MODIFIED', 'REMOVED', 'RENAMED'],
    slide: 'slides/pages/02-phases-documents.md',
    text: 'Delta-Specs-Tabelle: ADDED, MODIFIED, REMOVED, RENAMED (dazu ## Purpose)',
  },
  modifiedKeepsScenarios: {
    value: true,
    slide: 'slides/pages/02-phases-documents.md',
    text: 'MODIFIED richtig schreiben: fehlende Scenarios fangen validate und archive ab',
  },
  purposeSeedsNewSpec: {
    value: true,
    slide: 'slides/pages/02-phases-documents.md',
    text: 'Delta-Specs-Tabelle: ## Purpose wird Purpose der neuen Haupt-Spec',
  },
  schemaTasksExcerpt: {
    value: [
      '- Each tracked task MUST be a checkbox: `- [ ] X.Y Task description`',
      '- Tasks should be small enough to complete in one session',
      '- Each task MUST state how to verify completion (a test, command,',
      'observable behavior, or delivered artifact). …', // trailing " …" = the line continues upstream
      '- Each task group MUST land the tests and documentation its own work',
      'calls for. Do NOT collect testing or documentation into a final group …',
    ],
    slide: 'slides/pages/05-cli-agent-bridge.md',
    text: 'schema.yaml – der Styleguide: wörtlicher Auszug aus der tasks-Instruction',
  },
  instructionsFields: {
    value: ['instruction', 'template', 'context', 'rules', 'dependencies'],
    slide: 'slides/pages/05-cli-agent-bridge.md',
    text: 'Was steckt in den Instructions?: schema.yaml (instruction + template), config.yaml (context + rules), Pfade zu Abhängigkeiten',
  },
  lateArchiveOverwrites: {
    value: true,
    slide: 'slides/pages/06-team.md',
    text: 'Archivieren vor dem Merge: wird erst nach dem Merge archiviert, kann der zweite Change den ersten still überschreiben',
  },
  languageLine: {
    value: 'Keep OpenSpec structural headings and SHALL/MUST keywords in English.',
    slide: 'slides/pages/07-faq.md',
    text: 'Specs auf Deutsch?: diese Zeile schreibt openspec init --language wörtlich; --language ändert keine bestehende config.yaml',
  },
  skipSpecs: {
    value: true,
    slide: 'slides/pages/07-faq.md, 02-phases-documents.md',
    text: 'Refactoring: ohne skip_specs lehnt validate einen Change ohne Deltas ab, mit skip_specs nicht',
  },
  schemaForkExtraArtifact: {
    value: true,
    slide: 'slides/pages/07-faq.md',
    text: 'Eigener Prozess: fork, Artefakt + Template ergänzen, schema validate, schema: in config.yaml — status zeigt das neue Artefakt',
  },
  nestedCapabilityPath: {
    value: true,
    slide: 'slides/pages/07-faq.md',
    text: 'Monorepo: Capability-Pfad billing/invoice-create funktioniert für validate, archive und list --specs',
  },
  commandsUsed: {
    value: ['init', 'list', 'show', 'status', 'view', 'validate', 'archive', 'instructions', 'config', 'completion', 'new', 'update', 'schema'],
    slide: 'slides/pages/03-setup-config.md, 04-cli-navigator.md, 05-cli-agent-bridge.md, 02-phases-documents.md, 07-faq.md',
    text: 'jeder openspec-Befehl, den eine Folie tippt',
  },
  flagsUsed: {
    value: [
      { argv: ['list'], flag: '--specs', slide: 'slides/pages/04-cli-navigator.md' },
      { argv: ['list'], flag: '--json', slide: 'slides/pages/04-cli-navigator.md' },
      { argv: ['show'], flag: '--type', slide: 'slides/pages/04-cli-navigator.md' },
      { argv: ['show'], flag: '--json', slide: 'slides/pages/04-cli-navigator.md' },
      { argv: ['show'], flag: '--diff', slide: 'slides/pages/06-team.md' },
      { argv: ['init'], flag: '--language', slide: 'slides/pages/07-faq.md' },
      // subcommands: the check is the same substring test against `schema --help`
      { argv: ['schema'], flag: 'fork', slide: 'slides/pages/07-faq.md' },
      { argv: ['schema'], flag: 'validate', slide: 'slides/pages/07-faq.md' },
      { argv: ['status'], flag: '--change', slide: 'slides/pages/04-cli-navigator.md' },
      { argv: ['status'], flag: '--json', slide: 'slides/pages/02-phases-documents.md' },
      { argv: ['validate'], flag: '--all', slide: 'slides/pages/04-cli-navigator.md' },
      { argv: ['validate'], flag: '--strict', slide: 'slides/pages/04-cli-navigator.md' },
      { argv: ['instructions'], flag: '--change', slide: 'slides/pages/05-cli-agent-bridge.md' },
      { argv: ['instructions'], flag: '--json', slide: 'slides/pages/02-phases-documents.md' },
    ],
  },
  instructionsTargets: {
    value: ['proposal', 'specs', 'design', 'tasks', 'apply', 'archive'],
    slide: 'slides/pages/05-cli-agent-bridge.md',
    text: 'Gültige Argumente: proposal · specs · design · tasks, dazu apply und archive',
  },
  issue863State: {
    value: 'closed',
    slide: 'slides/pages/04-cli-navigator.md',
    text: '#863 ist geschlossen (nach Discussion #1574 verschoben), das beschriebene Verhalten besteht aber fort',
  },
};

// ---------------------------------------------------------------- helpers

const eqSet = (a, b) => a.length === b.length && [...a].sort().join(',') === [...b].sort().join(',');
const fmt = (a) => `[${[...a].join(', ')}]`;

function extractRequires(block) {
  const inline = block.match(/^[ \t]*requires:[ \t]*\[([^\]]*)\]/m);
  if (inline) return inline[1].split(',').map((s) => s.trim().replace(/['"]/g, '')).filter(Boolean);
  const listed = block.match(/^[ \t]*requires:[ \t]*\r?\n((?:[ \t]*-[ \t]*\S+[ \t]*\r?\n?)+)/m);
  if (listed) return listed[1].split('\n').map((l) => l.replace(/^[ \t]*-[ \t]*/, '').trim()).filter(Boolean);
  return null;
}

function artifactBlocks(schema) {
  const parts = schema.split(/^ {2}- id: /m).slice(1);
  return parts.map((p) => {
    const lines = p.split(/\r?\n/);
    // An artifact block ends at the next top-level key (e.g. `apply:`). Without
    // this the final artifact swallows it and reads that block's `requires:`.
    const end = lines.findIndex((l, i) => i > 0 && /^\S/.test(l));
    return { id: lines[0].trim(), block: (end === -1 ? lines : lines.slice(0, end)).join('\n') };
  });
}

/**
 * A throwaway OpenSpec project for behavioural assertions. `files` maps paths
 * relative to the project root to their content. Returns the directory; the
 * caller removes it with `dropProject`.
 */
function makeProject(ctx, files = {}) {
  const dir = ctx.sandbox();
  const init = ctx.run(['init', '--tools', 'none', '--no-animation'], dir);
  if (init.code !== 0) throw new Error(`openspec init failed in sandbox: ${init.out.trim().split('\n').pop()}`);
  for (const [rel, content] of Object.entries(files)) {
    const file = path.join(dir, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
  return dir;
}

const dropProject = (dir) => fs.rmSync(dir, { recursive: true, force: true });

// A minimal change that passes `validate --strict`: one new capability.
const PROBE_PROPOSAL = '## Why\nThe probe needs one real capability to validate against.\n\n## What Changes\n- Add the probe capability\n\n## Capabilities\n\n### New Capabilities\n- `probe`: A capability that exists only to exercise the CLI\n\n## Impact\n- None\n';
const PROBE_SPEC = '## Purpose\nExists only so the sync tooling can exercise archive behaviour.\n\n## ADDED Requirements\n\n### Requirement: Probe responds\nThe system SHALL respond to the probe.\n\n#### Scenario: Probe is called\n- **WHEN** the probe is called\n- **THEN** the system responds\n';
const PROBE_TASKS = '## 1. Probe\n\n- [x] 1.1 Add the probe and verify it responds\n';

function rootCommands(help) {
  const after = help.split(/^Commands:\s*$/m)[1];
  if (!after) return null;
  const names = [];
  for (const line of after.split(/\r?\n/)) {
    const m = line.match(/^ {2}(\S+)/); // command entries are indented 2; wrapped descriptions far more
    if (m) names.push(m[1]);
  }
  return names.length ? names : null;
}

// ---------------------------------------------------------------- assertions

export const assertions = [
  {
    id: 'schema.artifact-ids',
    claim: deckClaims.artifactIds,
    async run(ctx) {
      const blocks = artifactBlocks(await ctx.gh('schemas/spec-driven/schema.yaml'));
      if (!blocks.length) return { status: 'unresolved', detail: 'no "  - id:" artifact blocks found in schema.yaml' };
      const ids = blocks.map((b) => b.id);
      return eqSet(ids, deckClaims.artifactIds.value)
        ? { status: 'ok', detail: fmt(ids) }
        : { status: 'mismatch', detail: `schema has ${fmt(ids)}, slide claims ${fmt(deckClaims.artifactIds.value)}` };
    },
  },
  {
    id: 'schema.tasks-requires',
    claim: deckClaims.tasksRequires,
    async run(ctx) {
      const blocks = artifactBlocks(await ctx.gh('schemas/spec-driven/schema.yaml'));
      const tasks = blocks.find((b) => b.id === 'tasks');
      if (!tasks) return { status: 'unresolved', detail: 'no artifact with id "tasks"' };
      const req = extractRequires(tasks.block);
      if (!req) return { status: 'unresolved', detail: 'could not parse requires: of the tasks artifact' };
      return eqSet(req, deckClaims.tasksRequires.value)
        ? { status: 'ok', detail: `tasks requires ${fmt(req)}` }
        : { status: 'mismatch', detail: `tasks requires ${fmt(req)}, slide claims ${fmt(deckClaims.tasksRequires.value)}` };
    },
  },
  {
    id: 'cli.design-not-enforced',
    claim: deckClaims.designNotEnforced,
    async run(ctx) {
      const blocks = artifactBlocks(await ctx.gh('schemas/spec-driven/schema.yaml'));
      const design = blocks.find((b) => b.id === 'design');
      if (!design) return { status: 'unresolved', detail: 'no artifact with id "design"' };
      if (!/create only if/i.test(design.block)) {
        return { status: 'mismatch', detail: 'the design instruction no longer marks design.md as conditional ("create only if")' };
      }
      // Proposal, spec and checked-off tasks, deliberately no design.md.
      const dir = makeProject(ctx, {
        'openspec/changes/probe/proposal.md': PROBE_PROPOSAL,
        'openspec/changes/probe/specs/probe/spec.md': PROBE_SPEC,
        'openspec/changes/probe/tasks.md': PROBE_TASKS,
        'openspec/changes/probe/.openspec.yaml': 'schema: spec-driven\n',
      });
      try {
        const validate = ctx.run(['validate', 'probe', '--strict'], dir);
        if (validate.code !== 0) return { status: 'mismatch', detail: `validate --strict now rejects a change without design.md:\n      ${validate.out.trim()}` };
        const archive = ctx.run(['archive', 'probe', '--yes'], dir);
        if (archive.code !== 0) return { status: 'mismatch', detail: `archive now refuses a change without design.md:\n      ${archive.out.trim()}` };
        return { status: 'ok', detail: 'design is conditional in schema.yaml; validate --strict and archive pass without design.md' };
      } finally {
        dropProject(dir);
      }
    },
  },
  {
    id: 'cli.strict-requires-shall',
    claim: deckClaims.strictRequiresShall,
    async run(ctx) {
      const dir = makeProject(ctx, {
        'openspec/changes/probe/proposal.md': PROBE_PROPOSAL,
        'openspec/changes/probe/specs/probe/spec.md': PROBE_SPEC.replace('The system SHALL respond', 'The system should respond'),
        'openspec/changes/probe/.openspec.yaml': 'schema: spec-driven\n',
      });
      try {
        const lenient = ctx.run(['validate', 'probe'], dir);
        const strict = ctx.run(['validate', 'probe', '--strict'], dir);
        if (lenient.code !== 0) return { status: 'mismatch', detail: `validate without --strict now rejects a SHOULD-only requirement:\n      ${lenient.out.trim()}` };
        if (strict.code === 0) return { status: 'mismatch', detail: 'validate --strict now accepts a requirement without SHALL/MUST' };
        if (!/SHALL or MUST/.test(strict.out)) return { status: 'unresolved', detail: `validate --strict failed, but not for the missing keyword:\n      ${strict.out.trim()}` };
        return { status: 'ok', detail: 'SHOULD-only requirement: warning without --strict, failure with --strict' };
      } finally {
        dropProject(dir);
      }
    },
  },
  {
    id: 'schema.delta-operations',
    claim: deckClaims.deltaOperations,
    async run(ctx) {
      const specs = artifactBlocks(await ctx.gh('schemas/spec-driven/schema.yaml')).find((b) => b.id === 'specs');
      if (!specs) return { status: 'unresolved', detail: 'no artifact with id "specs"' };
      const section = specs.block.split(/Delta operations/)[1]?.split(/\n\s*\n/)[0];
      if (!section) return { status: 'unresolved', detail: 'no "Delta operations" list in the specs instruction' };
      const ops = [...section.matchAll(/\*\*([A-Z]+) Requirements\*\*/g)].map((m) => m[1]);
      if (!ops.length) return { status: 'unresolved', detail: 'could not read operation names from the "Delta operations" list' };
      return eqSet(ops, deckClaims.deltaOperations.value)
        ? { status: 'ok', detail: fmt(ops) }
        : { status: 'mismatch', detail: `schema lists ${fmt(ops)}, slide table shows ${fmt(deckClaims.deltaOperations.value)}` };
    },
  },
  {
    id: 'cli.modified-keeps-scenarios',
    claim: deckClaims.modifiedKeepsScenarios,
    async run(ctx) {
      const main = '# probe Specification\n\n## Purpose\nExists only so the sync tooling can exercise archive behaviour.\n\n## Requirements\n\n### Requirement: Probe responds\nThe system SHALL respond to the probe.\n\n#### Scenario: First call\n- **WHEN** the probe is called\n- **THEN** the system responds\n\n#### Scenario: Second call\n- **WHEN** the probe is called again\n- **THEN** the system responds again\n';
      const delta = '## MODIFIED Requirements\n\n### Requirement: Probe responds\nThe system SHALL respond to the probe quickly.\n\n#### Scenario: First call\n- **WHEN** the probe is called\n- **THEN** the system responds quickly\n';
      const dir = makeProject(ctx, {
        'openspec/specs/probe/spec.md': main,
        'openspec/changes/probe-update/proposal.md': PROBE_PROPOSAL.replace('### New Capabilities', '### Modified Capabilities'),
        'openspec/changes/probe-update/specs/probe/spec.md': delta,
        'openspec/changes/probe-update/tasks.md': PROBE_TASKS,
        'openspec/changes/probe-update/.openspec.yaml': 'schema: spec-driven\n',
      });
      try {
        const validate = ctx.run(['validate', 'probe-update', '--strict'], dir);
        const archive = ctx.run(['archive', 'probe-update', '--yes'], dir);
        const kept = fs.readFileSync(path.join(dir, 'openspec/specs/probe/spec.md'), 'utf8').includes('Second call');
        if (validate.code === 0) return { status: 'mismatch', detail: 'validate --strict now accepts a MODIFIED block that drops a scenario of the main spec' };
        if (!/Second call/.test(validate.out)) return { status: 'unresolved', detail: `validate --strict failed, but not over the dropped scenario:\n      ${validate.out.trim()}` };
        if (archive.code === 0 || !kept) return { status: 'mismatch', detail: 'archive now applies a MODIFIED block that drops a scenario of the main spec' };
        if (!/Second call/.test(archive.out)) return { status: 'unresolved', detail: `archive failed, but not over the dropped scenario:\n      ${archive.out.trim()}` };
        return { status: 'ok', detail: 'validate --strict and archive both refuse a MODIFIED block that drops a scenario' };
      } finally {
        dropProject(dir);
      }
    },
  },
  {
    id: 'cli.purpose-seeds-new-spec',
    claim: deckClaims.purposeSeedsNewSpec,
    async run(ctx) {
      const dir = makeProject(ctx, {
        'openspec/changes/probe/proposal.md': PROBE_PROPOSAL,
        'openspec/changes/probe/specs/probe/spec.md': PROBE_SPEC,
        'openspec/changes/probe/tasks.md': PROBE_TASKS,
        'openspec/changes/probe/.openspec.yaml': 'schema: spec-driven\n',
      });
      try {
        const archive = ctx.run(['archive', 'probe', '--yes'], dir);
        if (archive.code !== 0) return { status: 'unresolved', detail: `archive of the probe change failed:\n      ${archive.out.trim()}` };
        const spec = fs.readFileSync(path.join(dir, 'openspec/specs/probe/spec.md'), 'utf8');
        return spec.includes('Exists only so the sync tooling can exercise archive behaviour.')
          ? { status: 'ok', detail: 'the delta\'s ## Purpose became the Purpose of the new main spec' }
          : { status: 'mismatch', detail: 'archive no longer carries a new capability\'s ## Purpose into the main spec' };
      } finally {
        dropProject(dir);
      }
    },
  },
  {
    id: 'schema.tasks-excerpt',
    claim: deckClaims.schemaTasksExcerpt,
    async run(ctx) {
      const tasks = artifactBlocks(await ctx.gh('schemas/spec-driven/schema.yaml')).find((b) => b.id === 'tasks');
      if (!tasks) return { status: 'unresolved', detail: 'no artifact with id "tasks"' };
      const lines = tasks.block.split(/\r?\n/).map((l) => l.trim());
      const quoted = (l) => (l.endsWith(' …') ? lines.some((x) => x.startsWith(l.slice(0, -2))) : lines.includes(l));
      const missing = deckClaims.schemaTasksExcerpt.value.filter((l) => !quoted(l));
      return missing.length === 0
        ? { status: 'ok', detail: 'all quoted lines are verbatim in the tasks instruction' }
        : { status: 'mismatch', detail: `no longer verbatim in schema.yaml:\n      - ${missing.join('\n      - ')}` };
    },
  },
  {
    id: 'cli.instructions-fields',
    claim: deckClaims.instructionsFields,
    async run(ctx) {
      const dir = makeProject(ctx, {
        'openspec/config.yaml': 'schema: spec-driven\ncontext: |\n  Probe context\nrules:\n  tasks:\n    - Probe rule\n',
      });
      try {
        const created = ctx.run(['new', 'change', 'probe'], dir);
        if (created.code !== 0) return { status: 'unresolved', detail: `could not create the probe change:\n      ${created.out.trim()}` };
        const out = ctx.run(['instructions', 'tasks', '--change', 'probe', '--json'], dir);
        let json;
        try { json = JSON.parse(out.out); } catch { return { status: 'unresolved', detail: `instructions --json did not return JSON:\n      ${out.out.trim().slice(0, 300)}` }; }
        const missing = deckClaims.instructionsFields.value.filter((k) => !(k in json));
        if (missing.length) return { status: 'mismatch', detail: `instructions --json no longer has ${fmt(missing)}` };
        if (!String(json.context).includes('Probe context') || !JSON.stringify(json.rules).includes('Probe rule')) {
          return { status: 'mismatch', detail: 'context or rules from config.yaml no longer reach the tasks instructions' };
        }
        return { status: 'ok', detail: `instructions --json carries ${fmt(deckClaims.instructionsFields.value)}, context and rules from config.yaml` };
      } finally {
        dropProject(dir);
      }
    },
  },
  {
    id: 'cli.late-archive-overwrites',
    claim: deckClaims.lateArchiveOverwrites,
    async run(ctx) {
      // Two changes were written against the same main spec and modify the same
      // requirement, keeping its scenario name. Archiving them one after the
      // other is what "archive after merge" does on main.
      const main = '# probe Specification\n\n## Purpose\nExists only so the sync tooling can exercise archive behaviour.\n\n## Requirements\n\n### Requirement: Probe responds\nThe system SHALL respond to the probe.\n\n#### Scenario: Probe is called\n- **WHEN** the probe is called\n- **THEN** the system responds\n';
      const modified = (how) => `## MODIFIED Requirements\n\n### Requirement: Probe responds\nThe system SHALL respond to the probe ${how}.\n\n#### Scenario: Probe is called\n- **WHEN** the probe is called\n- **THEN** the system responds ${how}\n`;
      const proposal = PROBE_PROPOSAL.replace('### New Capabilities', '### Modified Capabilities');
      const change = (name, how) => ({
        [`openspec/changes/${name}/proposal.md`]: proposal,
        [`openspec/changes/${name}/specs/probe/spec.md`]: modified(how),
        [`openspec/changes/${name}/tasks.md`]: PROBE_TASKS,
        [`openspec/changes/${name}/.openspec.yaml`]: 'schema: spec-driven\n',
      });
      const dir = makeProject(ctx, { 'openspec/specs/probe/spec.md': main, ...change('first-change', 'quickly'), ...change('second-change', 'politely') });
      try {
        const first = ctx.run(['archive', 'first-change', '--yes'], dir);
        if (first.code !== 0) return { status: 'unresolved', detail: `archiving the first change failed:\n      ${first.out.trim()}` };
        const validate = ctx.run(['validate', 'second-change', '--strict'], dir);
        const second = ctx.run(['archive', 'second-change', '--yes'], dir);
        const spec = fs.readFileSync(path.join(dir, 'openspec/specs/probe/spec.md'), 'utf8');
        const overwritten = second.code === 0 && validate.code === 0 && spec.includes('politely') && !spec.includes('quickly');
        return overwritten
          ? { status: 'ok', detail: 'the second archive replaced the first change\'s requirement without an error or warning exit' }
          : { status: 'mismatch', detail: `OpenSpec now guards against it (validate exit ${validate.code}, archive exit ${second.code}) — the slide's warning may be obsolete:\n      ${second.out.trim()}` };
      } finally {
        dropProject(dir);
      }
    },
  },
  {
    id: 'cli.init-language-line',
    claim: deckClaims.languageLine,
    async run(ctx) {
      const fresh = ctx.sandbox();
      const existing = makeProject(ctx);
      try {
        const init = ctx.run(['init', '--tools', 'none', '--no-animation', '--language', 'Deutsch'], fresh);
        if (init.code !== 0) return { status: 'unresolved', detail: `init --language failed:\n      ${init.out.trim()}` };
        const config = fs.readFileSync(path.join(fresh, 'openspec/config.yaml'), 'utf8');
        if (!config.includes(deckClaims.languageLine.value)) return { status: 'mismatch', detail: `init --language no longer writes the quoted line; context now reads:\n      ${config.split('context:')[1]?.split('\n\n')[0]?.trim()}` };
        const again = ctx.run(['init', '--tools', 'none', '--no-animation', '--language', 'Deutsch'], existing);
        if (again.code === 0) return { status: 'mismatch', detail: 'init --language now changes an existing config.yaml — the notes say it refuses' };
        if (!/does not overwrite/.test(again.out)) return { status: 'unresolved', detail: `init --language failed on an existing project, but not with the expected refusal:\n      ${again.out.trim()}` };
        return { status: 'ok', detail: 'init --language writes the line verbatim and refuses an existing config.yaml' };
      } finally {
        dropProject(fresh);
        dropProject(existing);
      }
    },
  },
  {
    id: 'cli.skip-specs',
    claim: deckClaims.skipSpecs,
    async run(ctx) {
      const proposal = '## Why\nThe probe service grew messy and needs a behaviour-neutral cleanup.\n\n## What Changes\n- Restructure internal code\n\n## Capabilities\n\n## Impact\n- Internal only\n';
      const dir = makeProject(ctx, {
        'openspec/changes/refactor/proposal.md': proposal,
        'openspec/changes/refactor/.openspec.yaml': 'schema: spec-driven\n',
      });
      try {
        const without = ctx.run(['validate', 'refactor', '--strict'], dir);
        fs.appendFileSync(path.join(dir, 'openspec/changes/refactor/.openspec.yaml'), 'skip_specs: true\n');
        const withFlag = ctx.run(['validate', 'refactor', '--strict'], dir);
        if (without.code === 0) return { status: 'mismatch', detail: 'validate now accepts a zero-delta change without skip_specs' };
        if (!/skip_specs/.test(without.out)) return { status: 'unresolved', detail: `validate failed, but not over the missing deltas:\n      ${without.out.trim()}` };
        if (withFlag.code !== 0) return { status: 'mismatch', detail: `validate rejects a zero-delta change despite skip_specs:\n      ${withFlag.out.trim()}` };
        return { status: 'ok', detail: 'zero deltas: rejected without skip_specs, accepted with it' };
      } finally {
        dropProject(dir);
      }
    },
  },
  {
    id: 'cli.schema-fork-extra-artifact',
    claim: deckClaims.schemaForkExtraArtifact,
    async run(ctx) {
      const dir = makeProject(ctx);
      try {
        const fork = ctx.run(['schema', 'fork', 'spec-driven', 'my-workflow'], dir);
        if (fork.code !== 0) return { status: 'mismatch', detail: `schema fork failed:\n      ${fork.out.trim()}` };
        const schemaPath = path.join(dir, 'openspec/schemas/my-workflow/schema.yaml');
        let schema = fs.readFileSync(schemaPath, 'utf8');
        const at = schema.indexOf('  - id: tasks');
        if (at < 0) return { status: 'unresolved', detail: 'forked schema has no "  - id: tasks" block to insert before' };
        const adr = '  - id: adr\n    generates: adr.md\n    description: Architecture decision record\n    template: adr.md\n    instruction: |\n      Record the key architecture decision of this change.\n    requires:\n      - design\n\n';
        schema = schema.slice(0, at) + adr + schema.slice(at);
        fs.writeFileSync(schemaPath, schema);
        fs.writeFileSync(path.join(dir, 'openspec/schemas/my-workflow/templates/adr.md'), '## Decision\n');
        const validate = ctx.run(['schema', 'validate', 'my-workflow'], dir);
        if (validate.code !== 0) return { status: 'mismatch', detail: `schema validate rejects the extended fork:\n      ${validate.out.trim()}` };
        const configPath = path.join(dir, 'openspec/config.yaml');
        fs.writeFileSync(configPath, fs.readFileSync(configPath, 'utf8').replace(/^schema: .*$/m, 'schema: my-workflow'));
        const created = ctx.run(['new', 'change', 'probe'], dir);
        if (created.code !== 0) return { status: 'unresolved', detail: `new change failed:\n      ${created.out.trim()}` };
        const status = ctx.run(['status', '--change', 'probe', '--json'], dir);
        let ids;
        try { ids = JSON.parse(status.out).artifacts.map((x) => x.id); } catch { return { status: 'unresolved', detail: `status --json unreadable:\n      ${status.out.trim().slice(0, 300)}` }; }
        return ids.includes('adr')
          ? { status: 'ok', detail: `forked schema with an extra artifact validates and drives status: ${fmt(ids)}` }
          : { status: 'mismatch', detail: `status does not list the added artifact: ${fmt(ids)}` };
      } finally {
        dropProject(dir);
      }
    },
  },
  {
    id: 'cli.nested-capability-path',
    claim: deckClaims.nestedCapabilityPath,
    async run(ctx) {
      const dir = makeProject(ctx, {
        'openspec/changes/probe/proposal.md': PROBE_PROPOSAL.replace('`probe`', '`billing/invoice-create`'),
        'openspec/changes/probe/specs/billing/invoice-create/spec.md': PROBE_SPEC,
        'openspec/changes/probe/tasks.md': PROBE_TASKS,
        'openspec/changes/probe/.openspec.yaml': 'schema: spec-driven\n',
      });
      try {
        const validate = ctx.run(['validate', 'probe', '--strict'], dir);
        if (validate.code !== 0) return { status: 'mismatch', detail: `validate rejects a nested capability path:\n      ${validate.out.trim()}` };
        const archive = ctx.run(['archive', 'probe', '--yes'], dir);
        const listed = ctx.run(['list', '--specs'], dir).out;
        if (archive.code !== 0 || !fs.existsSync(path.join(dir, 'openspec/specs/billing/invoice-create/spec.md')) || !listed.includes('billing/invoice-create')) {
          return { status: 'mismatch', detail: `nested capability did not archive or list as billing/invoice-create:\n      ${archive.out.trim()}` };
        }
        return { status: 'ok', detail: 'billing/invoice-create validates, archives to specs/billing/invoice-create/ and lists by its path' };
      } finally {
        dropProject(dir);
      }
    },
  },
  {
    id: 'profiles.core-workflows',
    claim: deckClaims.coreWorkflows,
    async run(ctx) {
      const src = await ctx.gh('src/core/profiles.ts');
      const m = src.match(/CORE_WORKFLOWS\s*=\s*\[([\s\S]*?)\]/);
      if (!m) return { status: 'unresolved', detail: 'CORE_WORKFLOWS not found in src/core/profiles.ts' };
      const actual = [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
      return eqSet(actual, deckClaims.coreWorkflows.value)
        ? { status: 'ok', detail: fmt(actual) }
        : { status: 'mismatch', detail: `core profile installs ${fmt(actual)}, slide table lists ${fmt(deckClaims.coreWorkflows.value)}` };
    },
  },
  {
    id: 'profiles.names',
    claim: deckClaims.profileNames,
    async run(ctx) {
      const src = await ctx.gh('src/core/global-config.ts');
      const m = src.match(/export type Profile\s*=\s*([^;]+);/);
      if (!m) return { status: 'unresolved', detail: 'export type Profile not found in src/core/global-config.ts' };
      const actual = [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
      const bogus = deckClaims.profileNames.value.filter((n) => !actual.includes(n));
      return bogus.length === 0
        ? { status: 'ok', detail: `profiles are ${fmt(actual)}` }
        : { status: 'mismatch', detail: `slide names ${fmt(bogus)} as a profile, but the only profiles are ${fmt(actual)}` };
    },
  },
  {
    id: 'cli.commands-exist',
    claim: deckClaims.commandsUsed,
    async run(ctx) {
      const cmds = rootCommands(await ctx.cli([]));
      if (!cmds) return { status: 'unresolved', detail: 'could not parse the Commands: block of `openspec --help`' };
      const missing = deckClaims.commandsUsed.value.filter((c) => !cmds.includes(c));
      return missing.length === 0
        ? { status: 'ok', detail: `all ${deckClaims.commandsUsed.value.length} commands the deck types still exist` }
        : { status: 'mismatch', detail: `the deck types ${fmt(missing)}, which the CLI no longer offers` };
    },
  },
  {
    id: 'cli.flags-exist',
    claim: deckClaims.flagsUsed,
    async run(ctx) {
      const gone = [];
      for (const f of deckClaims.flagsUsed.value) {
        const help = await ctx.cli(f.argv);
        if (!help.includes(f.flag)) gone.push(`openspec ${f.argv.join(' ')} ${f.flag} (${f.slide})`);
      }
      return gone.length === 0
        ? { status: 'ok', detail: `all ${deckClaims.flagsUsed.value.length} taught flags still exist` }
        : { status: 'mismatch', detail: `no longer offered:\n      - ${gone.join('\n      - ')}` };
    },
  },
  {
    id: 'cli.instructions-targets',
    claim: deckClaims.instructionsTargets,
    async run(ctx) {
      const help = await ctx.cli(['instructions']);
      const desc = help.split(/\r?\n/).find((l) => /^Output enriched instructions/.test(l.trim()));
      if (!desc) return { status: 'unresolved', detail: 'description line of `instructions --help` not recognised' };
      const blocks = artifactBlocks(await ctx.gh('schemas/spec-driven/schema.yaml'));
      if (!blocks.length) return { status: 'unresolved', detail: 'schema artifacts unreadable' };
      // "artifacts" in the description is the collective term for the schema's artifact ids.
      const extras = ['apply', 'archive'].filter((t) => new RegExp(`\\b${t}\\b`).test(desc));
      const actual = [...blocks.map((b) => b.id), ...extras];
      return eqSet(actual, deckClaims.instructionsTargets.value)
        ? { status: 'ok', detail: fmt(actual) }
        : { status: 'mismatch', detail: `accepts ${fmt(actual)}, slide lists ${fmt(deckClaims.instructionsTargets.value)}  —  help says: "${desc.trim()}"` };
    },
  },
  {
    id: 'issue.863-open',
    claim: deckClaims.issue863State,
    async run(ctx) {
      const issue = await ctx.issue(863);
      if (!issue) return { status: 'unresolved', detail: 'could not read issue #863 (gh CLI unavailable or unauthenticated)' };
      return issue.state === deckClaims.issue863State.value
        ? { status: 'ok', detail: `#863 is ${issue.state}` }
        : { status: 'mismatch', detail: `#863 is ${issue.state}${issue.closed_at ? ` (since ${issue.closed_at.slice(0, 10)})` : ''}, slide states it is closed` };
    },
  },
];
