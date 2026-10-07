# openspec-sync

Answers one question before a workshop delivery: **is the deck still true for the
current OpenSpec?** — without re-reading the deck or the upstream docs.

```sh
node tooling/openspec-sync/sync.mjs     # report; exit 0 = nothing to do
```

Or `/sync-openspec` in Claude Code, which runs it and proposes the slide edits.

## Why it is built this way

OpenSpec ships roughly weekly. Three things were measured before designing this:

1. **Docs churn is low and surgical** — 1 to 8 files per release out of 45–134
   changed files, and the diffs are small. So whole-file hashing is enough; no
   section splitting needed.
2. **Docs lag features by about a release.** `openspec status --all` shipped in
   1.11.0; `docs/cli.md` was not touched until 1.12.0. Docs alone would tell you
   late and never tell you why. Hence the changelog.
3. **The real contract is not prose.** Most of what the deck asserts — flags,
   artifact graph, profile names — is machine-readable. Those get executable
   assertions instead of diffs, which matters because the deck is German and the
   docs are English, so string diffing cannot help there.

## Two questions, four mechanisms

**"Did something I teach change?"** — regression:

| | File | Determinism |
|---|---|---|
| Executable assertions | `assertions.mjs` | total — hard pass/fail, no model involved |
| Content baseline | `sync.lock.json` | high — an unchanged hash is *proof* of no work |
| Changelog window | (fetched) | narrative — the *why*, for what did move |

**"Did something appear that I don't teach?"** — coverage:

| | File | Determinism |
|---|---|---|
| Inventory probes + ledger | `inventory.mjs` + `coverage.mjs` | total — an item either has a verdict or it does not |

Hashing structurally cannot answer the second question: a file you never tracked
has no baseline hash, so a brand-new `docs/team-workflow.md` or a new `store`
command is invisible to it. The probes instead *enumerate* eight upstream
surfaces — CLI commands and subcommands, `openspec/config.yaml` keys,
`.openspec.yaml` change metadata, workflows, docs pages, shipped skills,
workflow schemas — and `coverage.mjs` carries one verdict per item:
`taught` / `mentioned` / `out-of-scope`. Anything with no verdict is reported
as NEW, and keeps being reported until you rule on it.

`out-of-scope` is a real decision and needs a `why`. It is what stops the same
item resurfacing forever, and what tells a future reader that you considered it.

`sources.mjs` is the map: upstream surface → the slides that depend on it, with
the exact claim each slide makes. It is the analogue of APM's
`.apm/docs-index.yml`, inverted — APM maps its own source tree to its own docs;
we map someone else's release surface to our deck. It also carries a `noImpact`
list, so a future reader can see what was considered and rejected.

## Normal use

```sh
node tooling/openspec-sync/sync.mjs              # report
# ... fix the slides the report names ...
node tooling/openspec-sync/sync.mjs --update     # re-baseline at latest
```

`--update` records the current release as the new baseline. Run it **only after**
the deck is actually fixed — running it early silently accepts the drift.

`--baseline <version>` records hashes at an arbitrary version, for when you know
which release the deck was last true for.

## Maintaining it

- **New claim on a slide** → add a `backs` entry to the relevant source in
  `sources.mjs`. One line.
- **New mechanically checkable claim** → add it to `deckClaims` and write an
  assertion. This is where the leverage is; prefer it over a tier-2 source.
- **Claim about behaviour, not surface** ("archive works without design.md") →
  build a throwaway project with `makeProject(ctx, files)` in `assertions.mjs`
  and drive the pinned CLI through `ctx.run(argv, dir)`. Help text cannot prove
  what a command accepts; running it can.
- **Report says NEW under section 3** → add a verdict to `coverage.mjs`. If you
  decide to teach it, that usually also means a new source in `sources.mjs`.
- **Report says GONE** → upstream removed something you had ruled on. Check the
  exercises before deleting the ledger entry; a removed command can break a lab.
- **`--update` never touches the ledger.** Hashes are mechanical, verdicts are
  yours, so re-baselining can never silently accept an unreviewed addition.
- **You edit a slide that an assertion encodes** → update the `deckClaims`
  constant in the same commit. That pairing is what keeps the assertion honest.
- **An assertion reports `UNRESOLVED`** → upstream renamed or moved something and
  the extractor failed. That is not a pass. Fix the extractor; never delete the
  assertion to make it quiet.

## Known limits — read before trusting it

- **It cannot see pedagogical drift.** New *capability* is covered by the probes,
  but if OpenSpec's *recommended practice* shifts without a new command, config
  key, doc page or schema change, nothing fires. The changelog catches some of
  it; nothing catches "the community consensus moved".
- **Probes see names, not meaning.** A probe reports that `operations` appeared
  in the config schema; whether that deserves a slide is your call, every time.
- **`docs/` is mid-migration.** Upstream is rewriting its docs into `docs-lab/`
  for the new website. `docs/` is still the live tree (68 commits in 90 days vs
  8), but when they cut over, every `docs/*` path here breaks at once. The fix is
  one edit per source: change `path`, keep the `id` and the `backs`.
- **Skipping sync for many releases** gives one large report. It is grouped per
  release, so it is walkable, but it is not free.
- **Tier-1 assertions read upstream TypeScript** (`src/core/profiles.ts`,
  `src/core/global-config.ts`). A rename there surfaces as `UNRESOLVED`, which is
  the intended behaviour: loud, not silent.

## Costs

First run installs the pinned CLI versions into `.cache/` (~3s each, gitignored,
reused afterwards) and fetches the tracked files from raw.githubusercontent.com.
Subsequent runs are cached. Issue state needs the `gh` CLI; without it that one
assertion reports `UNRESOLVED` and everything else still works.
