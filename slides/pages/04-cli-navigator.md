---
layout: section
---

# Die CLI als Datei-Navigator

---

# `openspec list`

Alle aktiven Changes auf einen Blick.

```sh
$ openspec list
```

```
Changes:
  us-06-dashboard     ✓ Complete    18m ago
  us-07-filter        2/4 artifacts  3m ago
```

Mit `--specs` werden stattdessen alle Haupt-Specs aufgelistet. JSON-Output mit `--json`.

---

# `openspec show <change>`

Den Proposal-Inhalt eines Change lesen.

```sh
$ openspec show us-06-dashboard
```

Gibt den Inhalt von `proposal.md` aus — Why, What Changes, Capabilities und Impact.

```md
## Why
The app currently lands the user directly on the animal list...

## What Changes
- Add a new `/dashboard` route as the default landing page
...
```

Mit `--type spec <name>` zeigt der Befehl den Inhalt einer Haupt-Spec.

---

# `openspec status --change <change>`

Welche Artefakte sind vollständig — und was ist noch blockiert?

```sh
$ openspec status --change us-07-filter
```

```
Change: us-07-filter
Schema: spec-driven
Progress: 2/4 artifacts complete

[x] proposal
[ ] design
[x] specs
[-] tasks (blocked by: design)
```

Alle vier Artefakte sind Pflicht. `tasks` ist blockiert, bis sowohl `specs` als auch `design` vorhanden sind.

---

# `openspec view`

Interaktives Terminal-Dashboard.

```sh
$ openspec view
```

Übersicht aller Changes und Specs im Projekt. Nur für den menschlichen Einsatz im Terminal — kein JSON-Output.

---

# Hands-on: Quiz-Runde

Beantworte die [Quiz-Fragen](https://forms.gle/SfRRSALoeZnPtegq7) mit openspec CLI Befehlen.

1. Git-Tag `cli-quiz` auschecken
2. `npm install -g @fission-ai/openspec@latest`
3. `openspec`-Befehle aus dem Root-Verzeichnis des Projekts starten

```sh
openspec list                           # alle aktiven Changes
openspec show <change>                  # Proposal-Inhalt eines Change bzw. einer Spec
openspec status --change <change>       # welche Artefakte sind vorhanden?
openspec view                           # Dashboard
```

<img src="../public/images/qr-code-cli-quiz.png" alt="QR-Code Quiz-Formular" class="h-48 mx-auto mt-6" />
