# Layout contract

Every layout in the theme, its slots, its props, and the things that bite.
Self-contained on purpose: the theme installs as an npm package, so none of its
own source or demo decks are at hand while you are writing a deck.

## Contents

- [The headline rule](#the-headline-rule) — applies to every layout
- [How much fits on a slide](#how-much-fits-on-a-slide) — applies to every layout
- [cover](#cover) · [section](#section) · [agenda](#agenda) · [default](#default)
- [quadrants](#quadrants) · [two-cols](#two-cols) · [two-cols-header](#two-cols-header)
- [statement](#statement) · [contact](#contact) · [conversation](#conversation)
- [document](#document)
- [What the theme will not do](#what-the-theme-will-not-do)

## The headline rule

Every layout takes its headline from the markdown flow — the first heading on
the slide, before any `::slot::` marker. There is no `title:` prop anywhere.

How that heading is rendered differs, and this is the part people get wrong:

| Layout | The first heading becomes |
|---|---|
| `default` `agenda` `quadrants` `contact` `conversation` | Content headline — uppercase, 3.445rem, weight 400 |
| `document` | The document's name, small, in the status line above the stage |
| `cover` | *Titel* — far larger, uppercase |
| `section` | *Titel*, centred vertically |
| `statement` | A sentence, upright, white, **bold runs go yellow** |
| `two-cols` | Nothing special — it has no headline slot at all |

A slide is a Vue template once Slidev has parsed the markdown, so anything in
angle brackets is read as a component tag, not as text. `<Firstname Lastname>`
renders as nothing at all. Write placeholders plain.

---

## How much fits on a slide

Body copy is 22 px on Slidev's 980 px canvas, and the scale is set so that a
`default` slide takes **five bullets comfortably and eight at the limit**. Two
short paragraphs and a list, or a lead line and a ten-line code block, are
about the same load. Nothing scrolls and nothing shrinks to fit: content past
the limit runs off the bottom edge and over the footer logo.

Write to that budget first. When a slide genuinely needs more, two classes
shift body copy a step — headings keep their own sizes:

```md
---
layout: default
class: gepardec-text-sm
---
```

| Class                | Body copy | For                                        |
|----------------------|-----------|--------------------------------------------|
| `gepardec-text-sm`   | 18 px     | A slide that genuinely runs long           |
| `gepardec-text-lg`   | 27 px     | A slide with one thought and room to spare |

Lists, paragraphs, the lead paragraph and tables all follow the step, and their
spacing is relative, so the rhythm holds either way. Fenced code does not — it
keeps Slidev's own compact sizing at every step.

Slidev's `class:` lands on the slide root for most layouts but on **both
columns** for `two-cols` and `two-cols-header`. To take only part of a slide
down, wrap that part instead — blank lines around the tag keep the markdown
inside it parsing as markdown:

```md
<div class="gepardec-text-sm">

- A long list that needs the density
- While the rest of the slide stays put

</div>
```

A deck where every slide carries `gepardec-text-sm` is a deck with too much on
its slides. Split it instead.

---

## cover

Title slide. Cheetah bleeds off the left edge; the title column starts at ~34%.

```md
---
layout: cover
---

# Titel

## Untertitel

Firstname Lastname

City, dd.MM.yyyy
```

- First heading is the *Titel*, second is the *Untertitel* — both uppercased.
- Every paragraph after the headings drops to the bottom-left *Name / Datum* block.
- No props.

## section

Divider between chapters ("Zwischenfolie"). Shares the cover's background.

```md
---
layout: section
variant: ascii
---

# Migration
```

- `variant`: `cheetah` (default) or `ascii`, the same face cropped flush left.
  There is no third value — the sujet is brand artwork, not a per-slide choice.
- Heading is centred vertically at *Titel* size, not the content headline size.

## agenda

Headline plus numbered `// n` entries. The numbers are positional, so
reordering the list renumbers it; nothing to configure.

```md
---
layout: agenda
---

# Agenda

- Ausgangslage
- Zielbild
- Migrationspfad
```

- Six entries fill one column. The seventh starts a second column automatically.
- Twelve is the maximum. Each half is only ~27rem wide — keep split entries terse.
- Bullet lists and ordered lists render identically.

## default

The standard content slide, and the right answer unless a slide genuinely needs
a different shape. Headline, then ordinary markdown.

- Bullets take the yellow `//` marker; nested bullets step down and dim.
- **Bold** carries brand yellow, *italic* stays white.
- The first paragraph after the headline is set a step larger and in grey — a
  lead line. Later paragraphs are ordinary body copy.
- Five bullets is comfortable, eight is the limit. See
  [How much fits on a slide](#how-much-fits-on-a-slide).
- Tables, ordered lists, blockquotes and fenced code are all styled — see
  [Code and prose](#code-and-prose).

## quadrants

Headline plus four blocks on a 2×2 raster, filled in reading order.

```md
---
layout: quadrants
---

# Themenfelder

::one::

### Architektur
Strangler-Grenze um die JSF-Shell.

::two::

### Security
Keycloak ab dem ersten Service.
```

- Slots `::one::` … `::four::`. Supply only `::one::` and `::two::` and you get
  the top row and nothing else — the empty ones cost no space.
- Any heading level works as the subheading; the layout sets them all alike.
- The `//` before a subheading is drawn by the layout. Write the text plain.
- Copy inside a block is set at the dense step — four blocks on one slide is
  what that step is for. Roughly five lines per block before its row deepens.
- Paragraphs inside a block run with no gap between them. That is deliberate,
  not an oversight — use a second block or a `//` list when copy needs to be
  set apart.
- A block that outgrows its box deepens its row rather than spilling into the
  one below.

## two-cols

Slidev's own slot contract, honoured exactly.

```md
---
layout: two-cols
---

### Legacy

::right::

### Ziel
```

- Everything before `::right::` is the left column. `::left::` is accepted as an
  explicit name for it.
- **No headline spans the columns.** That is the whole difference from
  `two-cols-header` — reach for that one instead of trying to fake a headline here.
- Takes the `class` and `layoutClass` props Slidev's built-in passes.

## two-cols-header

Headline across both columns, then the two halves, then an optional bottom row.

```md
---
layout: two-cols-header
---

# Vorher / Nachher

::left::

### Vorher

::right::

### Nachher

::bottom::

Beide Pfade laufen sechs Wochen parallel.
```

- The default slot (before `::left::`) is the spanning headline.
- `::bottom::` is anchored to the bottom of the slide. Leave it out and it
  costs no space.
- Takes the `class` and `layoutClass` props Slidev's built-in passes. As in the
  built-in, `class` lands on the two columns and the bottom row only — the
  headline is not styled by it. Use `layoutClass` when you need to reach the
  whole slide, headline included.

## statement

One bold line, no cheetah. Use it to land a point, or to close a deck when
there is no person to put on a `contact` slide.

```md
---
layout: statement
---

# Migration ist ein Weg, kein **Ereignis.**
```

- Set upright and white; the **bold** runs take the brand yellow.

## contact

Closing slide. Everything except the person is filled in already.

| Prop | Default |
|---|---|
| `name` `role` `photo` `email` `phone` | — |
| `photoPath` | `public/contact.jpg` |
| `company` | `Gepardec IT Services GmbH` |
| `locations` | Wien + Linz |
| `web` | `www.gepardec.com` |
| `social` | `true` — set `false` to drop the badge row |
| `linkedin` `xing` `facebook` `instagram` | — |

```md
---
layout: contact
name: Firstname Lastname
role: Role
email: firstname.lastname@gepardec.com
phone: +43 000 000 000
locations:
  - { label: 'City', address: 'Street 1, 0000 City' }
  - { label: 'City', address: 'Street 2, 0000 City' }
---

# Kontakt aufnehmen

::note::

Ein Satz unter den Badges.
```

- A heading replaces the default `Kontakt`; `::note::` adds a line under the badges.
- Badges with a URL become links; the rest stay plain, as in print.
- `locations` is a list of `{ label, address }`, rendered as `// <label>: <address>`.

## conversation

An agent session as a rolling transcript window. The slide is a fixed viewport
onto a taller stack of turns; each click reveals the next turn and slides the
stack up, so history scrolls off the top under a gradient.

````md
---
layout: conversation
session: OrderService migration
---

# Getting the build green

::turns::

<ChatTurn role="user">

The checkout suite fails one run in five on CI. Never locally.

</ChatTurn>

<ChatTurn role="agent" v-click>

The assertion races the toast animation.

</ChatTurn>

<ChatTurn role="tool" meta="npm test — 50 runs" v-click>

```
✓ checkout › places the order   50 passed
```

</ChatTurn>
````

**Layout prop**

- `session` — shown bottom-left beside the turn counter. A session name or date.

**`<ChatTurn>` props**

- `role` — `user`, `agent` or `tool`. Drives the whole visual treatment: the
  user's turn gets the loud 3px rule and a yellow wash, the agent's a hairline
  rule and an indent, so the two read apart before colour registers.
- `who` — overrides the role cap, e.g. `who="Alex"` instead of `You`.
- `meta` — a muted note beside the cap: a timestamp, a model, a token count.

**The four things that bite**

1. **Blank lines inside `<ChatTurn>` are load-bearing.** Without a blank line
   after the opening tag and before the closing one, markdown-it parses the
   body as raw HTML and none of the markdown renders.
2. **Export with `--with-clicks`.** Each click is its own PDF page. Without the
   flag the PDF gets one page per slide with the history already scrolled off —
   the crop is meant to be temporal, not lossy.
3. **A turn taller than the viewport can never be shown in full.** The stack
   scrolls its bottom into view and the top is gone, on screen and in print
   alike. In dev the layout warns in the console and outlines the turn in red.
   Split it across two `<ChatTurn>` blocks on consecutive clicks.
4. **Pacing is Slidev's own `v-click`.** The layout registers no clicks itself —
   it reads the classes the directive leaves on the DOM. Whatever you write
   (one turn per click, two at once, a `v-click` range) is what the tape
   follows. The opening turn carries no `v-click` so it is on screen when the
   slide arrives.

Six to ten turns is the working range. Past that the audience loses the thread —
they read the current turn and skim the two above it.

---

## document

A long markdown document, one section at a time. An index rail down the left
carries the document's own table of contents; the stage on the right shows the
section the rail points at, at reading size. Each click steps to the next one.

Paste the document into `::doc::` as it stands. The layout partitions it at the
headings it finds, so the document is its own outline — there is no second copy
of the structure to keep in step with it.

````md
---
layout: document
source: design.md — orders/split-fulfilment
---

# Design review

::doc::

## Context

Fulfilment resolves in a single transaction against one warehouse. Split
shipments were modelled in the schema but never reached the service layer.

## Decisions

### Split at the line, not at the order

A line is the smallest unit the warehouse can reserve, and checkout already
renders per-line dates.

### One reservation call per warehouse

The warehouse API rate-limits per call, not per item.

## Risks / Trade-offs

- **Two shipments, one invoice** — finance reconciles against the order.
````

There is no headline over the stage. The heading before `::doc::` is still the
slide's heading, and Slidev still takes the slide's title from it, but it is set
in the small caption face on the status line's top row, followed by `source`,
with the step count through the whole document at the right.
It never changes while the document is stepped through, so it does not get the
height of a content headline on every section. Leave it out and the status line
carries `source` alone. Anything else written before `::doc::` runs on in that
same single line, so keep it to the heading. Once the rail has folded, a
second row appears under it: the `//` eyebrow — the heading the stage's title
sits under — with the count among that heading's children at its right. Beside
the rail there is no second row, because the rail already lights that entry. An
eyebrow too long for one line wraps, and the row keeps the height of the
longest one on every click, so the stage never moves.

**Props**

- `source` — the caption in the status line, after the heading: a filename, a
  change id, a date. It is a label and nothing more. The layout reads no file,
  so a path written here just prints as text.
- `depth` — how deep the document is cut into steps. The default `3` gives every
  `###` a step of its own and a rail entry to match. `2` stops at `##`, and
  `###` headings then render as sub-headings inside their section. `4` steps
  through `####` as well, which is what a spec file of `#### Scenario` blocks
  wants — the `####` gets a step but no rail row, because a rail listing every
  scenario would be the document again rather than an index of it.
- `rail` — force the index rail on or off. Leave it out: the layout measures the
  document and folds the rail away by itself when a section needs the width or
  the rail outgrows its column.
  `rail: true` insists on keeping it even where that crops, `rail: false`
  always folds it.

**How the document is cut up**

- `##` opens a numbered rail entry. `###` opens a child of the entry above
  it, listed in the rail only while that entry is the current one — so
  the rail shows the whole document's shape and the detail of the part being
  read, and never more rows than fit the column.
- A heading with no body of its own — a `##` followed straight by a `###`, or a
  `###` followed straight by a `####` — shares a click with that first child. A
  click that puts up a heading and nothing else is a click spent on something
  the rail has already said.
- Every step has exactly one title on the stage: the heading that opens it.
  A `##` with a body of its own is its section's title; a bodiless `##` gives
  the title to the `###` it leads into, and under `depth: 4` a bodiless `###`
  gives it to its first `####`. The headings above the title are the rail's to
  show — or, once the rail has folded, the `//` eyebrow's, with the counter
  beside it saying how many siblings that heading has (under `depth: 4`, how
  many scenarios are left in the requirement).
- A document's own `#` title is not a section. It is set at section-title size
  and, like anything else before the first `##`, rides with the first section
  instead of taking a click of its own.
- Headings below `depth` are never boundaries; they render inside their
  section. At the default `depth: 3` that means `####` and below.

**The four things that bite**

1. **Whatever will not fit folds the rail away rather than cropping.** The
   layout lays out every step once the slide is on screen and the fonts have
   landed; if any section overruns the stage, or the rail overruns its column
   with that step's entry unfolded, the index rail folds for the whole document
   and the stage takes the full slide width — worth about 40% more measure. The decision is taken once, never per click, so the rail cannot blink
   in and out while you present, and the status line keeps carrying the section name
   and the step count either way. Nothing about the click count moves.

   A section that still will not fit at full width runs off the bottom edge. The
   number of clicks is fixed when the slide mounts — a count that moved as the
   web fonts landed would renumber the slide under you — so there is no second
   click to carry the rest. In dev the layout warns in the console and outlines
   the section in red. The fix is one the document can express itself: give the
   long part a heading one level deeper and raise `depth` to match, and it
   becomes a section of its own.
2. **Pacing belongs to the layout here.** Unlike `conversation`, this layout
   registers the clicks itself, one per section. Do not put `v-click` inside
   `::doc::` — two things counting clicks on one slide will not agree on the
   total.
3. **Export with `--with-clicks`.** Each section is its own PDF page. Without
   the flag the PDF gets one page per slide, showing the last section only.
4. **The stage sets its own body size**, a step below the slide's, because a
   document section is read rather than declaimed. `gepardec-text-sm` on the
   slide changes nothing, and neither does a `<div class="gepardec-text-sm">`
   inside `::doc::` — the stage is already at that step, and a wrapper around
   headings hides them from the layout, which only cuts at headings it finds at
   the top level of the document. A section too long for the stage wants a
   heading of its own, not a smaller face.

Rail entries wrap rather than being cut, so two headings that open with the
same words — `Requirement: Payroll month is…` twice — still read as two entries.
The cost is height: a document with many headings, or long ones, can outgrow the
column, and then the rail folds away as above. Five to seven `##` sections with
their children is the range where it stays. A document past that wants
`depth: 2`, or two slides, if the index matters to the talk.

---

## Code and prose

- Fenced blocks use the theme's Shiki setup and keep Slidev's own compact
  sizing rather than following the body step. That is deliberate: code is the
  thing a slide has least room for, and at this size a twelve-line listing
  still fits under a headline and a line of prose.
- Line highlights go in braces after the language: ` ```java {4-5} `. The band
  runs the length of the highlighted line and merges into the block's yellow
  left edge.
- Magic-move keeps a single border through the animation.
- ` ```mermaid ` blocks come out in brand colours — grey node borders, yellow
  edges and sequence messages, Barlow labels. Write no `style` or `classDef`
  lines for colour; the theme sets them once for every diagram.
- `inline code` is JetBrains Mono; links are yellow with a dim underline.
- Task lists (`- [ ]`, `- [x]`) take a yellow box in place of the `//` marker;
  done items fill it and dim to grey, so the open ones are what the eye finds.
- Blockquotes get a yellow left bar — the theme draws no bordered content boxes
  anywhere, so a blockquote is how you set a line apart.

## What the theme will not do

Worth knowing before proposing a workaround:

- **No bordered content boxes.** Not on any layout. If content needs separating,
  use a `//` list, a second quadrant block, or a blockquote.
- **No headline on `two-cols`.** Use `two-cols-header`.
- **No third `section` variant.**
- **No `!important`, no reaching into Slidev internals, no invented escape
  hatches.** The theme is built on official Slidev bindings only, and layouts
  that share a built-in's name honour that built-in's slot contract. A change
  that needs an internals hack is a change that needs a different design.
