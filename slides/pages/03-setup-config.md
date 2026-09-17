---
layout: section
---

# Setup & Konfiguration

<!--
Frage-Pause, bevor das Kapitel beginnt: Was ist zu „Phasen & Artefakte“ offen?
Dann wirklich warten — rund zehn Sekunden Stille aushalten.
-->

---
layout: default
---

# openspec init

Ein Befehl, der das Projekt OpenSpec-fähig macht.

```sh
$ openspec init
```

Interaktiv: OpenSpec fragt nach den AI-Tools, die in diesem Projekt benutzt werden – und verdrahtet sie automatisch.

- Claude Code, Codex, Copilot, OpenCode, ... 30+ Optionen
- Mehrfachauswahl möglich – ein Projekt, mehrere Agenten
- Erneut ausführbar: nachträglich Tools hinzufügen oder updaten

---
layout: default
---

# Was wird angelegt?

````md magic-move {lines: true}
```text
openspec/
├── config.yaml          ← Projekt-Kontext und Konventionen
├── specs/               ← die Wahrheit (leer beim Start)
└── changes/             ← aktive Vorschläge
```

```text
openspec/
├── config.yaml          ← Projekt-Kontext und Konventionen
├── specs/               ← die Wahrheit (leer beim Start)
└── changes/             ← aktive Vorschläge

.claude/skills/                    ← Skills (primär, pro Agent)
├── openspec-propose/SKILL.md
├── openspec-apply-change/SKILL.md
└── openspec-archive-change/SKILL.md
.claude/commands/opsx/             ← Slash-Commands (wo unterstützt)
├── propose.md
├── apply.md
└── archive.md
```
````

<div v-click.hide="1" class="gepardec-text-sm mt-3">

Tool-unabhängig. Lebt im Repo, gehört in `git`.

</div>

<div v-click="1" class="gepardec-text-sm mt-3">

Pro Agent eigene Skills. Commands nur dort, wo das Tool sie unterstützt.

</div>

<div v-click="2" class="gepardec-text-sm mt-2">

**`AGENTS.md` / `CLAUDE.md`** werden nicht angelegt — vorhandene bleiben unverändert.

</div>

---
layout: default
---

# CLAUDE.md zeigt auf OpenSpec

Wenn ihr eine `CLAUDE.md`, `AGENTS.md` oder ähnliches im Repo habt – **nicht duplizieren**.

```md
<!-- CLAUDE.md -->
# Projekt-Konventionen

Projekt-Kontext, Tech-Stack und Konventionen liegen in
`openspec/config.yaml` – immer dort nachsehen.
```

- `openspec/config.yaml` bleibt **Single Source of Truth**
- Der Agent liest CLAUDE.md/AGENTS.md ohnehin automatisch beim Start
- Keine Drift zwischen zwei Kopien derselben Konventionen

---
layout: default
---

# config.yaml

Die eine Datei, die zählt — zwei Dinge, die jedes Team früh definiert.

```yaml
schema: spec-driven         # welcher Workflow gilt
context: |                  # erscheint bei Erstellung JEDES Artefakts
  ## Tech Stack
  - Quarkus 3.35 + Hibernate Panache + PostgreSQL
  - Angular 21, zoneless, NgRx Signal Store
  ## Konventionen
  - Nur RestAssured-Tests, keine Unit-Tests
```

- **`context`** = was der Agent immer wissen muss (Tech-Stack, Konventionen)
- Optional pro Artefakt-Typ: **`rules`** – z.B. "Proposals enthalten immer einen Rollback-Plan"
- Optional pro Operation: **`operations`** – z.B. für `apply`: "Fokussierte Tests vor der vollen Suite"

<!--
Kann config.yaml automatisiert aktualisiert werden?
-->

---
layout: default
---

# CLI vs. Slash-Command

Die CLI ist der Motor, Slash-Commands und Skills sind das Lenkrad.

- **CLI** = Motor und State-Machine: kennt Ordner, Abhängigkeiten, Delta-Merge — überall gleich
- **Slash-Command / Skill** = Playbook für den Agenten, pro Tool im passenden Format

Auszug aus `.claude/commands/opsx/propose.md`:

```text
4. Create the change directory
   → openspec new change "<name>"

5. Get the artifact build order
   → openspec status --change "<name>" --json
   Parse the JSON to get applyRequires and artifacts ...
```

Der Agent ruft also durchgehend `openspec`-Befehle auf.

<!--
Motor und Lenkrad: das Bild stammt aus docs/how-commands-work.md. Der Motor ist
bei jedem Tool derselbe, das Lenkrad sieht in Claude Code, Cursor oder Codex
anders aus — openspec init schreibt für jedes gewählte Tool das passende.

Deshalb funktioniert derselbe Workflow mit 30+ Tools.
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
1. Run openspec status and confirm all tasks complete
2. Compare each delta spec with its main spec ...  ← KI tut das manuell
3. mkdir -p openspec/changes/archive               ← KI tut das manuell
4. mv openspec/changes/<name> openspec/changes/archive/YYYY-MM-DD-<name>
```

Das Issue dazu ([#863](https://github.com/Fission-AI/OpenSpec/issues/863)) ist nicht gelöst, sondern in eine [Diskussion](https://github.com/Fission-AI/OpenSpec/discussions/1574) verschoben — der Skill vergleicht und verschiebt weiterhin selbst.

**Empfehlung:** immer `openspec archive` statt `/opsx:archive`.

<!--
#863 wurde im August 2026 als „not planned" geschlossen und dabei nach
Discussion #1574 verschoben. Geschlossen heißt hier also nicht behoben.

Früher sprach noch etwas für den Agenten: Delta-Specs einer neuen Capability
hatten keinen Purpose, und openspec archive schrieb nur einen
TBD-Platzhalter. Das ist erledigt:
- seit 1.7.0 übernimmt archive den ## Purpose der Delta-Spec, und die
  specs-Instruction, das Template und der sync-Skill verlangen ihn — CLI und
  Agent erzeugen dieselbe Haupt-Spec
- seit 1.11.0 meldet openspec validate einen ungeschriebenen Purpose
  (Warnung, mit --strict ein Fehler)
-->

---
layout: default
---

# Faustregel

Hat die CLI einen Befehl dafür → Skill ruft ihn auf, erledigt die Arbeit nicht selbst.

```sh
# gut
openspec archive <change>

# schlecht
# KI vergleicht Specs manuell, verschiebt Verzeichnisse, schreibt History selbst
```

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
-->

---
layout: default
---

# Profile: core vs. custom

OpenSpec kennt genau zwei Workflow-Profile — **core** ist der Default.

| Profil | Slash-Commands |
|---|---|
| **core** | `propose` · `explore` · `apply` · `update` · `sync` · `archive` |
| **custom** | frei wählbar, auch `new` · `continue` · `ff` · `verify` · `bulk-archive` · `onboard` |

```sh
$ openspec config profile        # interaktiv zusammenstellen
$ openspec config profile core   # zurück auf core (einziges Preset)
```

Für den Workshop reicht **core**.

<!--
custom ist für Teams, die einzelne Schritte getrennt steuern wollen: frei
zusammengestellt aus allen zwölf Workflows.
-->
