---
layout: section
---

# Setup & Konfiguration

<!--
Frage-Pause, bevor das Kapitel beginnt: Was ist zu „Workflow & Artefakte“ offen?
Dann wirklich warten – rund zehn Sekunden Stille aushalten.
-->

---
layout: default
---

# openspec init

Ein Befehl macht euer Projekt OpenSpec-fähig.

```sh
$ openspec init
```

Interaktiv: OpenSpec fragt, welche AI-Tools ihr im Projekt nutzt – und verdrahtet sie automatisch.

- Claude Code, Codex, Copilot, OpenCode, … – rund 50 Optionen
- Mehrfachauswahl möglich – ein Projekt, mehrere Agenten
- Erneut ausführbar: nachträglich Tools hinzufügen oder updaten

---
layout: default
---

# Was wird angelegt?

````md magic-move {lines: true}
```text
openspec/
├── config.yaml          ← Workflow und Constraints für Artefakte
├── specs/               ← die Wahrheit (leer beim Start)
└── changes/             ← aktive Vorschläge
```

```text
openspec/
├── config.yaml          ← Workflow und Constraints für Artefakte
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

**`AGENTS.md` / `CLAUDE.md`** werden nicht angelegt – vorhandene bleiben unverändert.

</div>

---
layout: default
---

# config.yaml

Steuert den Workflow – und gibt jedem Artefakt die Constraints mit.

```yaml
schema: spec-driven         # welcher Workflow gilt
context: |                  # erscheint bei Erstellung JEDES Artefakts
  Nur RestAssured-Tests (@QuarkusTest), keine Unit-Tests.
  Jeder sichtbare Text in Deutsch und Englisch.
  Bestehende REST-Endpunkte ändern sich nicht inkompatibel.
```

- **`context`** = Constraints, die der Agent **nicht aus dem Code ablesen** kann
- Optional pro Artefakt-Typ: **`rules`** – z.B. "Proposals enthalten immer einen Rollback-Plan"
- Optional pro Operation: **`operations`** – z.B. für `apply`: "Fokussierte Tests vor der vollen Suite"

<!--
Kein Tech-Stack im context: Quarkus-Version, Angular, Panache stehen in
pom.xml und package.json – der Agent findet sie selbst. Seit 1.14.0 sagt das
auch der Kommentar, den openspec init in die config.yaml schreibt: „Keep
general project documentation and discoverable codebase facts out."

Kann config.yaml automatisiert aktualisiert werden?
-->

---
layout: default
---

# AGENTS.md und config.yaml – wer weiß was?

Zwei Dateien, zwei Leser. Jede Aussage hat genau **einen** Ort.

| | `AGENTS.md` | `context` in `config.yaml` |
|---|---|---|
| **Wer liest** | jede Agent-Session, beim Start | OpenSpec, bei jedem Artefakt |
| **Was hineingehört** | Projekt-Doku: Layout, Tech-Stack, Befehle, Konventionen | Constraints für Specs, Design und Tasks |
| **Beispiel** | „Angular-Befehle über `ng`, nicht `pnpm`“ | „Nur RestAssured-Tests, keine Unit-Tests“ |

**Faustregel:** Findet der Agent es im Code, in `pom.xml` oder `package.json`? Dann gehört es nicht in `context`.

<!--
context landet in jeder Artefakt-Instruction – jede Zeile dort kostet bei
jedem Artefakt Tokens. Und abgeschriebene Fakten veralten: Die
Quarkus-Version in config.yaml stimmt nach dem nächsten Upgrade nicht mehr,
die in pom.xml schon.

Bis 1.13 empfahl der init-Kommentar das Gegenteil („Add your tech stack,
conventions, style guides, domain knowledge"). Deshalb steckt im Übungs-Repo
noch der ganze Tech-Stack in config.yaml, und AGENTS.md verweist darauf. Funktioniert – ist aber nicht mehr die Empfehlung.

Konventionen, die für den Code gelten, gehören in AGENTS.md: Der Agent
braucht sie bei apply genauso wie beim Schreiben der Artefakte. In context
nur, was die Artefakte selbst prägt.

Warum AGENTS.md: Es ist der tool-neutrale Standard, den Codex, Copilot, OpenCode
und andere lesen. Claude Code liest AGENTS.md seit v2.1.277 direkt – eine
CLAUDE.md braucht es dafür nicht mehr. Achtung: Gibt es beide, liest Claude
Code standardmäßig nur CLAUDE.md. Beide zusammen per /config, „Project
instructions" = claude-md-and-agents-md. Das Übungs-Repo hat deshalb nur
AGENTS.md.
-->

---
layout: default
---

# CLI vs. Slash-Command

Die CLI ist der Motor, Slash-Commands und Skills sind das Lenkrad.

- **CLI** = Motor und State-Machine: kennt Ordner, Abhängigkeiten, Delta-Merge – überall gleich
- **Slash-Command / Skill** = Playbook für den Agenten, pro Tool im passenden Format

Auszug aus `.claude/commands/opsx/propose.md`:

```text
4. Create the change directory
   → openspec new change "<name>"

5. Get the artifact build order
   → openspec status --change "<name>" --json
   Parse the JSON to get applyRequires and artifacts ...
```

Der Agent ruft durchgehend `openspec`-Befehle auf.

<!--
Das Bild „Motor und Lenkrad“ stammt aus docs/how-commands-work.md. Der Motor ist
bei jedem Tool derselbe, das Lenkrad sieht in Claude Code, Cursor oder Codex
anders aus – openspec init schreibt für jedes gewählte Tool das passende.

Deshalb funktioniert derselbe Workflow mit rund 50 Tools.
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

# Profile: core vs. custom

OpenSpec kennt genau zwei Workflow-Profile – **core** ist der Default.

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
