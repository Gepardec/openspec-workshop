---
layout: section
variant: ascii
---

# Die CLI als Datei-Navigator

<!--
Frage-Pause, bevor das Kapitel beginnt: Was ist zu „Setup & Konfiguration“ offen?
Dann wirklich warten — rund zehn Sekunden Stille aushalten.
-->

---
layout: default
---

# Changes und Specs finden

Was ist in Arbeit — und was gilt bereits?

```sh
$ openspec list                          # aktive Changes
$ openspec list --specs                  # Haupt-Specs
$ openspec list --archived               # abgeschlossene Changes
$ openspec show us-06-dashboard          # proposal.md eines Change
$ openspec show animal-list --type spec  # eine Haupt-Spec
```

```
Changes:
  us-07-filter        No tasks      just now
  us-06-dashboard     ✓ Complete    just now
```

Mit `--json` maschinenlesbar — so fragen Skills die CLI ab.

<!--
show gibt bei einem Change genau den Inhalt von proposal.md aus: Why, What
Changes, Capabilities, Impact. Die übrigen Artefakte liest man direkt.

`--type spec` braucht es, sobald ein Change und eine Spec gleich heißen.
-->

---
layout: default
---

# Wo steht ein Change?

```sh
$ openspec status --change us-07-filter
```

```
Change: us-07-filter
Schema: spec-driven
Change root: …/openspec/changes/us-07-filter
Progress: 2/4 artifacts complete

[x] proposal
[x] specs
[ ] design
[-] tasks (blocked by: design)

Next: openspec instructions design --change "us-07-filter" --json
```

`blocked` ist ein Hinweis, keine Sperre: `tasks` baut auf `specs` und `design` auf.

`openspec view`: interaktives Dashboard der aktiven Changes und aller Specs, ohne JSON.

<!--
Braucht ein Change kein design.md, bleibt status bei 3/4 — validate und
archive stört das nicht.

Seit 1.13.1 nennt status in der letzten Zeile den nächsten Befehl.
-->

---
layout: default
---

# Hands-on: Quiz-Runde

Beantworte die [Quiz-Fragen](https://forms.gle/SfRRSALoeZnPtegq7) mit openspec CLI Befehlen.

1. `main`-Branch auschecken
2. `npm install -g @fission-ai/openspec@latest`
3. (optional) `openspec completion install` für Shell Autocompletion

```sh
openspec list                           # alle aktiven Changes
openspec show <change>                  # Proposal-Inhalt eines Change bzw. einer Spec
openspec status --change <change>       # welche Artefakte sind vorhanden?
openspec view                           # Dashboard
```

<!--
Frage 1: Change ist nicht aktiv, sondern completed. AUSBESSERN!
-->
