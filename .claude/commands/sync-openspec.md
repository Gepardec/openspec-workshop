---
description: Check the workshop deck against the current OpenSpec release and propose the edits it needs
allowed-tools: Bash(node tooling/openspec-sync/sync.mjs*), Bash(git*), Read, Edit, Grep, Glob
---

Reconcile the workshop deck with the current OpenSpec release.

## 1. Run the tool

```
node tooling/openspec-sync/sync.mjs
```

It writes `tooling/openspec-sync/report.md`. Read that file — do not re-derive
anything it already tells you, and do not go fetch upstream files it reports as
unchanged. Exit 0 means there is genuinely nothing to do; say so and stop.

## 2. Triage, in this order

**Section 1 — assertions.** These are mechanical comparisons, already verified.
A `MISMATCH` means the named slide is wrong; treat it as fact and write the fix.
An `UNRESOLVED` means the extractor in `tooling/openspec-sync/assertions.mjs`
broke because upstream moved something — investigate and repair the extractor,
never silence it.

**Section 2 — changed sources.** Each entry lists the slides that depend on it
and the exact claim each slide makes. For every diff, decide one of:
- *affects the deck* — name the slide, quote the current wording, propose new wording
- *no effect* — say why in one line (e.g. "wording change, the claim still holds")

Sources listed as unchanged are proof of no work. Skip them entirely.

**Section 3 — coverage.** These are upstream items with no verdict in
`coverage.mjs` — things that *exist* and the deck may simply never mention. This
is a pedagogical call, not a correctness one, so never decide it silently. For
each, propose one of:
- `taught` — it belongs on a slide; say which slide and what it would replace or extend
- `mentioned` — worth a sentence or a presenter note, not a slide
- `out-of-scope` — with a concrete `why`, in the workshop's terms

Group them by what they would cost to teach, and lead with the ones that change
what a participant would do differently. A `GONE` entry means upstream removed
something you had ruled on — check `exercises/` before dropping it.

**Section 4 — changelog.** Use it as the *why* behind the diffs in section 2,
and to catch behaviour changes that no tracked file revealed. Features usually
land here one release before the docs catch up.

## 3. Report back

Present a single table: slide · current wording · proposed wording · source that
justifies it. Then ask which to apply. **Do not edit slides before the user
confirms.** When you do edit:

- The deck is German. Keep the register of the surrounding slides. Technical
  terms keep their article: *der Task / den Task*, never *die Task*.
- Prefer the smallest edit that makes the claim true. A stale fact is a fact
  fix, not an invitation to rewrite the slide.
- If a fix changes a fact that `assertions.mjs` encodes in `deckClaims`, update
  that constant in the same change. The pairing is what keeps the assertion honest.

## 4. Re-baseline

Only after the user has accepted the edits:

```
node tooling/openspec-sync/sync.mjs --update
```

That records the current release as the new content baseline. Running it before
the deck is fixed silently accepts the drift, so never run it on your own initiative.
It deliberately does **not** touch `coverage.mjs` — verdicts are the user's, so an
unreviewed addition can never be re-baselined away. Write accepted verdicts there
by hand as part of the same change.
