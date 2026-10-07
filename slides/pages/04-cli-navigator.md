---
layout: section
variant: ascii
---

# Die CLI als Datei-Navigator

<!--
Frage-Pause, bevor das Kapitel beginnt: Was ist zu „Setup & Konfiguration“ offen?
Dann wirklich warten – rund zehn Sekunden Stille aushalten.
-->

---
layout: default
---

# Changes und Specs finden

Was ist in Arbeit – und was gilt schon?

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

Mit `--json` maschinenlesbar – so fragen Skills die CLI ab.

<!--
show gibt bei einem Change genau den Inhalt von proposal.md aus: Why, What
Changes, Capabilities, Impact. Die übrigen Artefakte direkt öffnen.

`--type spec` ist nötig, sobald Change und Spec gleich heißen.
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
Braucht ein Change kein design.md, bleibt status bei 3/4 – validate und
archive stört das nicht.

Seit 1.13.1 nennt status in der letzten Zeile den nächsten Befehl.
-->

---
layout: default
---

# Hands-on: Quiz-Runde

<div class="grid grid-cols-[1fr_auto] gap-10 items-start">
<div>

Beantwortet die [Quiz-Fragen](https://docs.google.com/forms/d/e/1FAIpQLSf3liDyLSzmo1eE-5hVfGQ4gySCTiHg-mCbhx6FGZCNXAwXRA/viewform) mit der openspec CLI.

1. `git fetch && git switch workshop/quiz` – danach zurück mit `git switch main`
2. (optional) Autocompletion: `openspec completion install`

```sh
openspec list [--archived]          # aktive bzw. archivierte Changes
openspec view                       # Dashboard
openspec show <change> [--diff]     # Proposal, mit --diff die Delta-Specs
openspec status --change <change>   # welche Artefakte fertig sind
openspec validate --all --strict    # Specs und Changes prüfen
```

Alle Optionen: `openspec <befehl> --help`

</div>
<div class="flex flex-col items-center gap-2 text-sm">

<QRCode
  :width="220"
  :height="220"
  type="svg"
  data="https://docs.google.com/forms/d/e/1FAIpQLSf3liDyLSzmo1eE-5hVfGQ4gySCTiHg-mCbhx6FGZCNXAwXRA/viewform"
  :margin="12"
  :dotsOptions="{ color: '#000000' }"
  :backgroundOptions="{ color: '#ffffff' }"
/>

Am Laptop: Link in der `README.md`<br>von `workshop/quiz`

</div>
</div>

<!--
Fragen und Antwortschlüssel: docs/quiz/cli.md (liegt nicht auf workshop/quiz).
Das Google-Form erzeugt docs/quiz/create-form.gs, siehe docs/quiz/README.md.
Die Befehle decken alle 10 Fragen ab; --diff kennen die Teilnehmer bis hier
noch nicht (braucht Q5).
-->
