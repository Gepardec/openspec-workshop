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

export const deckClaims = {
  artifactIds: {
    value: ['proposal', 'specs', 'design', 'tasks'],
    slide: 'slides/pages/02-phases-documents.md',
    text: 'Alle vier Artefakte sind Pflicht',
  },
  tasksRequires: {
    value: ['specs', 'design'],
    slide: 'slides/pages/02-phases-documents.md',
    text: 'tasks ist blockiert, bis specs und design vorliegen',
  },
  coreWorkflows: {
    value: ['propose', 'apply', 'sync', 'archive', 'explore'],
    slide: 'slides/pages/03-setup-config.md',
    text: 'Profil-Tabelle, Zeile "core (default)"',
  },
  profileNames: {
    value: ['core', 'expanded'],
    slide: 'slides/pages/03-setup-config.md',
    text: 'Profil-Tabelle nennt die Profile "core" und "expanded"',
  },
  commandsUsed: {
    value: ['init', 'list', 'show', 'status', 'view', 'validate', 'archive', 'instructions', 'config', 'completion', 'new'],
    slide: 'slides/pages/03-setup-config.md, 04-cli-navigator.md, 05-cli-agent-bridge.md',
    text: 'jeder openspec-Befehl, den eine Folie tippt',
  },
  flagsUsed: {
    value: [
      { argv: ['list'], flag: '--specs', slide: 'slides/pages/04-cli-navigator.md' },
      { argv: ['list'], flag: '--json', slide: 'slides/pages/04-cli-navigator.md' },
      { argv: ['show'], flag: '--type', slide: 'slides/pages/04-cli-navigator.md' },
      { argv: ['status'], flag: '--change', slide: 'slides/pages/04-cli-navigator.md' },
      { argv: ['validate'], flag: '--all', slide: 'slides/pages/03-setup-config.md' },
      { argv: ['validate'], flag: '--strict', slide: 'slides/pages/03-setup-config.md' },
      { argv: ['instructions'], flag: '--change', slide: 'slides/pages/05-cli-agent-bridge.md' },
      { argv: ['instructions'], flag: '--json', slide: 'slides/pages/02-phases-documents.md' },
    ],
  },
  instructionsTargets: {
    value: ['proposal', 'specs', 'design', 'tasks', 'apply'],
    slide: 'slides/pages/05-cli-agent-bridge.md',
    text: 'Gültige Argumente: proposal · specs · design · tasks · apply',
  },
  issue863State: {
    value: 'open',
    slide: 'slides/pages/03-setup-config.md',
    text: 'Ein offenes Issue (#863)',
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
        : { status: 'mismatch', detail: `#863 is ${issue.state}${issue.closed_at ? ` (since ${issue.closed_at.slice(0, 10)})` : ''}, slide calls it "ein offenes Issue"` };
    },
  },
];
