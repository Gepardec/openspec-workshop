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

# openspec validate

Das Qualitätsgate: findet Silent Failures, bevor der Agent damit weiterarbeitet.

```sh
$ openspec validate --all --strict
```

- Prüft alle Changes und Specs auf Strukturfehler
- Falsche Hash-Tiefe (`### Scenario` statt `#### Scenario`) → Fail
- Fehlende Sektionen, kaputte Querverweise → Fail
- `--strict` für CI, normal lokal

**Faustregel:** rotes `validate` ⇒ kein `apply`.

<!--
Seit 1.13.1 meldet validate mehr stille Fehler: ein Requirement unter einer
falschen Überschrift (Warnung), Delta-Requirements außerhalb von spec.md,
FROM:/TO:-Zeilen ohne Partner, ein Scenario ohne Inhalt (jeweils Fehler).

Seit 1.14.1 ist eine Requirement-Beschreibung über 500 Zeichen eine Warnung.
Mit --strict scheitert die CI daran.
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

---
layout: default
---

# archive braucht keinen Agenten

`openspec archive` ist ein deterministischer CLI-Befehl – kein LLM nötig.

```sh
$ openspec archive us-05-delete-animal
```

Was er tut: Delta-Specs in die Haupt-Specs mergen, Change-Verzeichnis aufräumen, History-Eintrag schreiben.

---
layout: default
---

# Das Problem: opsx:archive per LLM

Der `opsx:archive`-Skill macht dasselbe – aber LLM-gesteuert.

```text
1. Run openspec list --json and check the task counts
2. Compare each delta spec with its main spec ...  ← KI tut das manuell
3. mkdir -p openspec/changes/archive               ← KI tut das manuell
4. mv openspec/changes/<name> openspec/changes/archive/YYYY-MM-DD-<name>
```

Das Issue dazu ([#863](https://github.com/Fission-AI/OpenSpec/issues/863)) ist nicht gelöst, sondern in eine [Diskussion](https://github.com/Fission-AI/OpenSpec/discussions/1574) verschoben – der Skill vergleicht und verschiebt weiterhin selbst.

**Empfehlung:** immer `openspec archive` statt `/opsx:archive`.

<!--
#863 wurde im August 2026 als „not planned“ geschlossen und dabei nach
Discussion #1574 verschoben. Geschlossen heißt hier nicht behoben.

Früher sprach noch etwas für den Agenten: Delta-Specs einer neuen Capability
hatten keinen Purpose, und openspec archive schrieb nur einen
TBD-Platzhalter. Das ist erledigt:
- seit 1.7.0 übernimmt archive den ## Purpose der Delta-Spec, und die
  specs-Instruction, das Template und der sync-Skill verlangen ihn – CLI und
  Agent erzeugen dieselbe Haupt-Spec
- seit 1.11.0 meldet openspec validate einen ungeschriebenen Purpose
  (Warnung, mit --strict ein Fehler)

Seit 1.14.0 bricht der Skill ab, wenn der Spec-Sync scheitert (#2018), statt
den Change trotzdem zu archivieren. Sicherer – aber weiterhin LLM-gesteuert,
die Empfehlung bleibt.
-->

---
layout: default
---

# Faustregel

Hat die CLI einen Befehl dafür → der Skill ruft ihn auf, statt selbst zu arbeiten.

```sh
# gut
openspec archive <change>

# schlecht
# KI vergleicht Specs manuell, verschiebt Verzeichnisse, schreibt History selbst
```
