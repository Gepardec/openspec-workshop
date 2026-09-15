---
name: gepardec-slidev-authoring
description: "Author Slidev decks with the Gepardec theme — its ten layouts, their slots and props, the rules the corporate master enforces, and a script that drafts a `conversation` slide from a real Claude Code session transcript. Use this skill whenever the user is writing, editing, reviewing or debugging a Slidev deck that uses slidev-theme-gepardec (any deck whose headmatter names `@gepardec/slidev-theme-gepardec`), whenever they mention a Gepardec slide or a cover, agenda, quadrants, section, statement, contact or conversation layout, and whenever they want to turn an AI or agent session into slides — even if they never name the theme."
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Slidev theme: Gepardec

A Slidev theme matching the Gepardec brand: pure black background, Gepardec
yellow (`#FFC800`) accents, italic condensed Barlow Semi Condensed with
JetBrains Mono for code, yellow `//` bullet markers. The logo and corner spots
sit on every slide; `cover`, `section` and `contact` add the cheetah sujet.

## Pointing a deck at the theme

```bash
npm i @gepardec/slidev-theme-gepardec
```

```yaml
---
theme: '@gepardec/slidev-theme-gepardec'
---
```

Layouts, components and styles come from the package — nothing is copied into
the deck, so a theme upgrade reaches every slide.

## Start here

Read `references/layouts.md` before writing or editing a slide. It is the
complete contract — every layout, slot, prop and edge case — and it is short
enough to read in full. Guessing at prop names is the most common way to
produce a slide that renders but is subtly wrong, because Slidev silently
ignores frontmatter keys a layout does not declare.

## The two rules behind most mistakes

**Headlines come from the markdown flow, never from frontmatter.** The first
heading on the slide, before any `::slot::` marker, is the headline. There is no
`title:` prop on any layout. What differs between layouts is only how that
heading is *rendered* — the table in the reference has it.

**The theme uses official Slidev bindings only.** No `!important`, no reaching
into Slidev internals, no invented escape hatches, and any layout sharing a
built-in's name honours that built-in's slot contract. When a request seems to
need one of those, the design is wrong, not the constraint — say so and propose
a layout that fits. This is a standing decision, not a preference to re-litigate.

## How much fits

Body copy is sized so a `default` slide takes five bullets comfortably and
eight at the limit. Nothing shrinks to fit — content past the limit runs off
the bottom edge. A slide that genuinely needs more takes `class:
gepardec-text-sm`; one with room to spare takes `gepardec-text-lg`. The
reference has the budgets per layout.

## Choosing a layout

`default` unless the slide genuinely needs another shape. Reaching for an exotic
layout to hold ordinary bullets is how decks stop looking like one deck.

| Need | Layout |
|---|---|
| Title slide | `cover` |
| Chapter divider | `section` |
| Numbered agenda | `agenda` |
| Ordinary content | `default` |
| Four related blocks | `quadrants` |
| Side by side, no headline | `two-cols` |
| Side by side, with headline | `two-cols-header` |
| One line that lands | `statement` |
| Closing slide with a person | `contact` |
| An agent session, turn by turn | `conversation` |

Close a deck with `contact`, or with `statement` when there is no person to put
on it.

## Turning a session into a `conversation` slide

`scripts/transcript_to_slide.py` reads the JSONL transcripts Claude Code writes
to `~/.claude/projects/<slugified-cwd>/<session-id>.jsonl` and drafts a slide.

The split matters. Those transcripts run to tens of megabytes and are mostly
tool traffic; a `conversation` slide holds six to ten turns. So the script does
the mechanical half — find the session, drop harness noise and system reminders,
pair each tool call with its result, number what survives — and stops there. The
half it deliberately leaves alone is choosing *which* turns tell the story and
rewriting them for a room instead of a terminal. That is editorial work, and a
script that guessed at it would produce a slide nobody wants to present.

```bash
S=scripts/transcript_to_slide.py

python3 $S list                          # sessions recorded for this project
python3 $S turns latest                  # numbered, one line each
python3 $S scaffold latest --pick 1,4,7-9 --headline "Getting the build green"
```

Work it in that order. `turns` is the menu — read it, pick the beats that carry
the arc (the ask, the wrong turn, the correction, the result), then `scaffold`
those indices. Indices stay stable between the two commands as long as the flags
match. Useful flags: `--who <Author Name>` for the cap on user turns, `--max-chars` for
how much of a turn survives, `--thinking` to include reasoning blocks,
`--sidechains` for subagent turns, `-o` to write straight into the deck.

**The output is a draft.** It carries an HTML comment saying so, and marks every
mechanically cut turn with `…`. Those ellipses are the edit list: replace each
with a sentence a human would say out loud. Then delete the comment.

Two failure modes worth pre-empting, both covered in the reference: blank lines
inside `<ChatTurn>` are load-bearing, and the deck must be exported with
`--with-clicks` or the PDF shows only the final click with the history already
scrolled away.

## Verify

Nothing here is a substitute for looking at the slide. Overflow is the theme's
characteristic failure and it is invisible in the markdown.

```bash
npx slidev deck.md
npx slidev export deck.md --with-clicks   # any deck with a conversation slide
```

Use the deck repo's own scripts where it has them. Export of any format needs
`playwright-chromium` installed — Slidev treats it as optional, so a first
export in a fresh repo fails on a missing browser until you add it.
