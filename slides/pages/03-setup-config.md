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

.agents/skills/                    ← Skills für Codex (pro Agent)
├── openspec-propose/SKILL.md
├── openspec-apply-change/SKILL.md
└── openspec-archive-change/SKILL.md
.claude/commands/opsx/             ← Slash-Commands, z. B. Claude Code
├── propose.md
├── apply.md
└── archive.md
```
````

<div v-click.hide="1" class="gepardec-text-sm mt-3">

Tool-unabhängig. Lebt im Repo, gehört in `git`.

</div>

<div v-click="1" class="gepardec-text-sm mt-3">

Pro Agent eigene Skills. Commands nur, wo das Tool sie kennt – Codex ruft Skills per `$` auf.

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

Automatisch aktualisiert wird die config.yaml nicht: openspec init legt sie
nur an, wenn sie fehlt, openspec update fasst sie nicht an. Ihr pflegt sie
von Hand, wie AGENTS.md.
-->

---
layout: default
class: gepardec-text-sm
---

# AGENTS.md vs. config.yaml

Wer weiß was? Zwei Dateien, zwei Leser – jede Aussage hat genau **einen** Ort.

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
conventions, style guides, domain knowledge"). Das Übungs-Repo folgt der neuen
Empfehlung: Projekt-Doku in AGENTS.md, im context der config.yaml aus Übung 2
nur die Constraints für die Artefakte.

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

Auszug aus `.agents/skills/openspec-propose/SKILL.md`:

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
