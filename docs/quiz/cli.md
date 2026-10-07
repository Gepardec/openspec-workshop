# OpenSpec CLI Quiz

Quiz-Runde nach Kapitel 4 („Die CLI als Datei-Navigator“), vor den Übungen.

## Vorbereitung

Das Quiz läuft auf dem Branch `workshop/quiz`. Er enthält den App-Stand vor den Übungen und
ein `openspec/`, in dem es genug zu finden gibt:

| Change | Zustand |
| --- | --- |
| `us-06-dashboard` | alle 16 Tasks erledigt, noch nicht archiviert (Stand aus Übung 2) |
| `remove-animal-notes` | alle Artefakte da, 0/14 Tasks (Change aus Übung 4) |
| `us-07-feeding-times` | nur Proposal und Specs, eine Spec fällt durch die Validierung (gibt es nur im Quiz) |

Dazu 5 Haupt-Specs und 5 archivierte Changes (`us-01` bis `us-05`).

```sh
git switch workshop/quiz
openspec --version          # 1.14.1 oder neuer
```

Danach zurück mit `git switch main`. Das Quiz liest nur, es bleibt nichts zurück.

Dieser Antwortschlüssel liegt bewusst nicht auf `workshop/quiz`.

## Aufbau

10 Multiple-Choice-Fragen mit je einer richtigen Antwort, ausgelegt auf 15 Minuten.

Jede Frage nennt den Befehl und die Stelle in der Ausgabe, die zur Antwort führt. Dateien öffnen
gilt nicht: Alles steht in der CLI-Ausgabe.

---

## Abschnitt 1 — Was ist in Arbeit? (`openspec list`, `openspec view`)

### Q1
Wie viele Changes sind aktiv, also noch nicht archiviert?

- 1
- 2
- **3** ✓
- 8

```sh
openspec list
```

Unter `Changes:` stehen drei Einträge. „Aktiv“ heißt nur: noch nicht archiviert. Auch
`us-06-dashboard` mit `✓ Complete` zählt dazu.

---

### Q2
Wie viele Changes sind bereits archiviert?

- 0
- 3
- **5** ✓ (`us-01` bis `us-05`)
- 6

```sh
openspec list --archived
```

Alle fünf tragen das Archivdatum im Namen: `2026-06-01-us-01-animal-list` usw.
`openspec list --all` zeigt aktive und archivierte Changes zusammen.

---

### Q3
In welcher Gruppe zeigt `openspec view` den Change `us-06-dashboard`?

- Draft Changes
- Active Changes
- **Completed Changes** ✓
- Gar nicht, weil er archiviert ist.

```sh
openspec view
```

Alle 16 Tasks sind abgehakt, deshalb „Completed“, archiviert ist er aber noch nicht. Den Unterschied
zu `openspec list` (Q1) im Plenum auflösen: Archiviert wird erst in Übung 3.

---

## Abschnitt 2 — Einen Change lesen (`openspec show`)

### Q4
Welche neue Capability führt der Change `us-07-feeding-times` ein?

- `us-07-feeding-times`
- **`animal-feeding`** ✓
- `animal-profile`
- `feeding-schedule`

```sh
openspec show us-07-feeding-times
```

Abschnitt `### New Capabilities` im ausgegebenen Proposal: `` `animal-feeding`: Daily feeding times
of an animal, readable via REST``. `animal-profile` steht unter `### Modified Capabilities`: Diese
Spec gibt es schon.

---

### Q5
Der Change `remove-animal-notes` entfernt das Feld `notes`. Welche Delta-Operation verwenden
seine Delta-Specs?

- `REMOVED`
- `ADDED` und `REMOVED`
- **nur `MODIFIED`** ✓ (6 Requirements in 3 Specs)
- `RENAMED`

```sh
openspec show remove-animal-notes --diff
openspec show remove-animal-notes --json --deltas-only   # Feld "operation"
```

Unter `Specifications Changed (diffs)` beginnt jeder Eintrag mit `MODIFIED:`. Die Requirements
bleiben bestehen, nur ihr Text verliert `notes`. `REMOVED` würde das ganze Requirement löschen.

---

### Q6
Welche Haupt-Spec ändern sowohl `remove-animal-notes` als auch `us-07-feeding-times`?

- `animal-create`
- `animal-edit`
- **`animal-profile`** ✓
- `dashboard`

```sh
openspec show remove-animal-notes --diff   # animal-create, animal-edit, animal-profile
openspec show us-07-feeding-times --diff   # animal-feeding, animal-profile
```

Spec-Namen unter `Specifications Changed (diffs)`. `dashboard` ist noch keine Haupt-Spec, sie
entsteht erst beim Archivieren von `us-06-dashboard`. Überleitung zu Kapitel 6 (zwei Changes,
dieselbe Spec).

---

## Abschnitt 3 — Wo steht ein Change? (`openspec status`)

### Q7
Beim Change `us-07-feeding-times` ist das Artefakt `tasks` blockiert. Auf welches Artefakt wartet es?

- `proposal`
- `specs`
- **`design`** ✓
- `proposal` und `specs`

```sh
openspec status --change us-07-feeding-times
```

Zeile `[-] tasks (blocked by: design)`, darüber `Progress: 2/4 artifacts complete`. Blockiert ist ein Hinweis, keine Sperre (siehe Folie
„Wo steht ein Change?“).

---

### Q8
Welchen Befehl nennt `openspec status` als nächsten Schritt für `us-07-feeding-times`?

- `openspec instructions tasks --change "us-07-feeding-times" --json`
- **`openspec instructions design --change "us-07-feeding-times" --json`** ✓
- `openspec instructions apply --change "us-07-feeding-times" --json`
- `openspec archive us-07-feeding-times`

```sh
openspec status --change us-07-feeding-times
```

Letzte Zeile `Next: …`. Diesen Befehl ruft der Agent auf, um die Anleitung für `design.md` zu
holen. Überleitung zu Kapitel 5 („Die CLI als Agent-Bridge“).

---

## Abschnitt 4 — Validieren (`openspec validate`)

### Q9
Welcher Change fällt bei `openspec validate --all --strict` durch?

- `us-06-dashboard`
- `remove-animal-notes`
- **`us-07-feeding-times`** ✓
- keiner, alle bestehen die Validierung

```sh
openspec validate --all --strict
```

Zeile `✗ change/us-07-feeding-times`, Summe `Totals: 7 passed, 1 failed (8 items)`.

---

### Q10
Warum fällt `us-07-feeding-times` bei der Validierung durch?

- Das Artefakt `design.md` fehlt.
- `tasks.md` fehlt.
- Ein Requirement enthält weder SHALL noch MUST.
- **Ein Requirement hat kein Scenario.** ✓

```sh
openspec validate --all --strict
openspec validate us-07-feeding-times   # Details und Hinweise zur Behebung
```

Zeile `✗ [ERROR] animal-feeding/spec.md: ADDED "Feeding time per animal is unique" must include
at least one scenario`. Fehlende Artefakte stören `validate` nicht, sie zeigt nur `status` (Q7).
