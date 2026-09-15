/**
 * INVENTORY PROBES — what exists upstream, enumerated.
 *
 * The hash layer answers "did something I teach change?". It is structurally
 * blind to "did something appear that I don't teach?", because a file you never
 * tracked has no baseline hash. These probes close that gap: each enumerates one
 * upstream surface, and `coverage.mjs` records a verdict per item. An item with
 * no verdict is reported as NEW.
 *
 * This is the half of APM's `.apm/docs-index.yml` that `sources.mjs` is not:
 * its `symbol_index`, where an unmapped symbol is a documentation hole.
 *
 * A probe returns a flat list of stable ids. Keep ids boring and human-readable
 * — they become ledger keys and must survive a release.
 */

/** Commands whose own subcommands are worth enumerating separately. */
const GROUPED = ['change', 'spec', 'schema', 'store', 'new', 'config', 'completion'];

function commandsFrom(help) {
  const after = help.split(/^Commands:\s*$/m)[1];
  if (!after) return [];
  return after
    .split(/\r?\n/)
    .map((l) => l.match(/^ {2}(\S+)/))
    .filter(Boolean)
    // Commander renders an aliased command as `list|ls`; the first name is canonical.
    .map((m) => m[1].split('|')[0])
    .filter((c) => c !== 'help');
}

/** Top-level keys of a `z.object({ ... })` assigned to `name`. */
function zodKeys(src, name) {
  const start = src.indexOf(`export const ${name} = z`);
  if (start === -1) return null;
  const rest = src.slice(start);
  const end = rest.search(/^\}\)/m);
  const block = end === -1 ? rest : rest.slice(0, end);
  const keys = [...block.matchAll(/^ {2}([a-zA-Z_][a-zA-Z0-9_]*):/gm)].map((m) => m[1]);
  return keys.length ? [...new Set(keys)] : null;
}

export const probes = [
  {
    id: 'cli.command',
    label: 'CLI-Befehle',
    hint: 'ein neuer Top-Level-Befehl ist fast immer ein neues Feature',
    async list(ctx) {
      return commandsFrom(await ctx.cli([]));
    },
  },
  {
    id: 'cli.subcommand',
    label: 'CLI-Subbefehle',
    hint: 'neue Subbefehle unter change/spec/schema/store/config/new/completion',
    async list(ctx) {
      const out = [];
      for (const g of GROUPED) {
        try {
          for (const sub of commandsFrom(await ctx.cli([g]))) out.push(`${g} ${sub}`);
        } catch { /* command gone; cli.command reports that */ }
      }
      return out;
    },
  },
  {
    id: 'config.key',
    label: 'openspec/config.yaml — Top-Level-Keys',
    hint: 'neue Konfigurationsmöglichkeit für Teams',
    async list(ctx) {
      const keys = zodKeys(await ctx.gh('src/core/project-config.ts'), 'ProjectConfigSchema');
      if (!keys) throw new Error('ProjectConfigSchema not extractable from src/core/project-config.ts');
      return keys;
    },
  },
  {
    id: 'change-meta.key',
    label: '.openspec.yaml — Change-Metadaten',
    hint: 'Marker wie skip_specs, die das Verhalten eines Change ändern',
    async list(ctx) {
      const keys = zodKeys(await ctx.gh('src/core/change-metadata/schema.ts'), 'ChangeMetadataSchema');
      if (!keys) throw new Error('ChangeMetadataSchema not extractable from src/core/change-metadata/schema.ts');
      return keys;
    },
  },
  {
    id: 'workflow',
    label: 'Workflows',
    hint: 'ALL_WORKFLOWS — installierbare Slash-Commands',
    async list(ctx) {
      const src = await ctx.gh('src/core/profiles.ts');
      const m = src.match(/ALL_WORKFLOWS\s*=\s*\[([\s\S]*?)\]\s*as const/);
      if (!m) throw new Error('ALL_WORKFLOWS not found in src/core/profiles.ts');
      return [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
    },
  },
  {
    id: 'docs.page',
    label: 'Dokumentationsseiten',
    hint: 'eine neue Seite ist ein neues Thema',
    async list(ctx) {
      return (await ctx.tree())
        .filter((p) => p.startsWith('docs/') && p.endsWith('.md'))
        .map((p) => p.slice('docs/'.length));
    },
  },
  {
    id: 'skill',
    label: 'Mitgelieferte Skills',
    hint: 'neue Agent-Playbooks',
    async list(ctx) {
      const set = new Set();
      for (const p of await ctx.tree()) {
        const m = p.match(/^skills\/([^/]+)\//);
        if (m) set.add(m[1]);
      }
      return [...set];
    },
  },
  {
    id: 'schema.workflow',
    label: 'Workflow-Schemas',
    hint: 'ein zweites Schema neben spec-driven würde das Kapitel "Phasen" berühren',
    async list(ctx) {
      const set = new Set();
      for (const p of await ctx.tree()) {
        const m = p.match(/^schemas\/([^/]+)\//);
        if (m) set.add(m[1]);
      }
      return [...set];
    },
  },
];
