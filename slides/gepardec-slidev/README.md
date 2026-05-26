# slidev-theme-gepardec

A [Slidev](https://sli.dev) theme matching the Gepardec brand:

- Pure black background, Gepardec yellow (`#FFC800`) accents
- Italic condensed typography (Barlow Semi Condensed)
- `//` bullet markers in yellow, white content text
- Cheetah-spot cluster and `gepardec` logo on every slide
- No bordered boxes — clean, minimal aesthetic

## Layouts

| Layout       | Use for                                                   |
|--------------|-----------------------------------------------------------|
| `cover`      | Title slide. Cheetah image on left, big title on right.   |
| `section`    | Section breaks. Same visual style as `cover`.             |
| `default`    | Standard content. Title + `//` bullets, minimal layout.   |
| `two-cols`   | Side-by-side content with a title above two columns.      |
| `statement`  | Big bold statement, no decorations beyond logo + spots.   |
| `end`        | Closing slide. "Danke." by default.                       |

## Install

### Local (recommended while iterating)

Drop this folder anywhere and reference it in frontmatter:

```yaml
---
theme: ./gepardec-slidev
---
```

### As an npm package

```bash
npm i slidev-theme-gepardec
```

```yaml
---
theme: gepardec
---
```

## Brand assets

The official Gepardec assets are bundled inside the theme at `assets/`:

- `assets/cheetah.jpg` — cover/section image
- `assets/logo.png` — footer wordmark
- `assets/spots.png` — corner decoration

They are imported by the Vue components and resolved through Vite's asset
pipeline, so they work transparently no matter where your slide deck lives.
To swap any of them, replace the file and rebuild.

### Overriding the cover image per slide

If you want a different image on a specific cover or section slide, pass an
`image:` prop pointing at a file in **your own** `public/` directory:

```yaml
---
layout: cover
image: /my-custom-cover.jpg
---
```

## Usage

### Title slide

```md
---
layout: cover
---

# Java Enterprise<br/>Modernization

## Quarkus, Jakarta EE, OpenShift

March 2026
```

### Section break

```md
---
layout: section
---

# Part 2

## Implementation
```

### Content slide

Just write standard Markdown — title and bullets flow naturally:

```md
---
layout: default
---

# Why modernize now?

- NIS2 compliance pressure
- Vendor support dropped
- Dependency drift = release risk
```

### Two columns

```md
---
layout: two-cols
---

::title::

# Tech stack comparison

::left::

### Legacy
- Java EE 7
- Manual deploys

::right::

### Target
- Jakarta EE 10
- CI/CD
```

### Statement slide

```md
---
layout: statement
---

# We only recommend<br/>**what we can technically justify.**
```

### End slide

```md
---
layout: end
---

# Danke.
```

## Customization

All theme colors and fonts are CSS variables in `styles/layout.css`:

```css
:root {
  --gepardec-yellow: #FFC800;
  --gepardec-black:  #000000;
  --gepardec-font-display: 'Barlow Semi Condensed', system-ui, sans-serif;
  /* ... */
}
```

Override them in a project-level `style.css`.

## Bullet style opt-out

All `<ul>` bullets render as `//` in Gepardec yellow. To opt out for a
single list, wrap it in `.no-slash-bullets`:

```md
<div class="no-slash-bullets">

- regular bullets here

</div>
```

## Build the example

```bash
npm i
npx slidev example.md
```

## License

MIT — Gepardec IT Services GmbH
