---
layout: section
---

# Setup & Konfiguration

Wie OpenSpec ins Projekt kommt — und was du danach drehen kannst.

---

# `openspec init`

Ein Befehl, der das Projekt OpenSpec-fähig macht.

```sh
$ openspec init
```

Interaktiv: OpenSpec fragt nach den AI-Tools, die in diesem Projekt benutzt werden – und verdrahtet sie automatisch.

- Claude Code, Codex, Copilot, OpenCode, ... 30+ Optionen
- Mehrfachauswahl möglich – ein Projekt, mehrere Assistenten
- Erneut ausführbar: nachträglich Tools hinzufügen oder updaten

---

# Was wird angelegt?

Zuerst die tool-unabhängige Schicht – dann pro ausgewähltem Agent.

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

.claude/skills/                          ← Skills (primär, pro Agent)
├── openspec-propose/SKILL.md
├── openspec-apply-change/SKILL.md
└── openspec-archive-change/SKILL.md

.claude/commands/opsx/                   ← Slash-Commands (wo unterstützt)
├── propose.md
├── apply.md
└── archive.md
```
````

<div v-click.hide="1" class="text-sm text-white/60 mt-3">
Tool-unabhängig. Lebt im Repo, gehört in <code>git</code>.
</div>

<div v-click="1" class="text-sm text-white/60 mt-3">
Pro ausgewähltem Agent eigene Skills. Commands/Workflows nur dort, wo das Tool sie unterstützt (Claude Code, Cursor, Copilot, …).
</div>

---

# Tipp: CLAUDE.md / AGENTS.md auf OpenSpec verweisen

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

# `config.yaml` – das eine wichtige File

Zwei Dinge, die jedes Team früh definiert:

```yaml
schema: spec-driven         # welcher Workflow gilt

context: |                  # erscheint in JEDEM Artefakt
  ## Tech Stack
  - Quarkus 3.35 + Hibernate Panache + PostgreSQL
  - Angular 21, zoneless, NgRx Signal Store
  ## Konventionen
  - Nur RestAssured-Tests, keine Unit-Tests
  - Sheriff-Modulgrenzen, kein domain→domain Import
```

- **`context`** = was der Agent immer wissen muss (Tech-Stack, Konventionen)
- Optional pro Artefakt-Typ: **`rules`** – z.B. "Proposals enthalten immer einen Rollback-Plan"

---

# CLI vs. Slash-Command — wer macht was?

**Slash-Command** = Playbook für den Agenten
**CLI** = State-Machine, die der Agent abfragt

Auszug aus `.claude/commands/opsx/propose.md`:

```md
2. **Create the change directory**
   ```bash
   openspec new change "<name>"

3. **Get the artifact build order**
   ```bash
   openspec status --change "<name>" --json
   Parse the JSON to get `applyRequires` and `artifacts` ...
```

Der Agent ruft also durchgehend `openspec`-Befehle auf. Wer die CLI kennt, kann jederzeit eingreifen.

---

# `openspec validate` – das Qualitätsgate

Findet Silent Failures, bevor der Agent damit weiterarbeitet.

```sh
$ openspec validate --all --strict
```

- Prüft alle Changes und Specs auf Strukturfehler
- Falsche Hash-Tiefe (`### Scenario` statt `#### Scenario`) → Fail
- Fehlende Sektionen, kaputte Querverweise → Fail
- `--strict` für CI, normal lokal

**Faustregel:** rotes `validate` ⇒ kein `apply`.

---

# Profile: core vs. expanded

OpenSpec liefert mehrere Workflow-Profile.

| Profil | Slash-Commands |
|---|---|
| **core** (default) | `propose` · `apply` · `sync` · `archive` · `explore` |
| **expanded** | + `new` · `continue` · `ff` · `verify` · `bulk-archive` … |

```sh
$ openspec config profile        # interaktiv wechseln
```

Für den Workshop reicht **core**. Expanded lohnt sich erst, wenn ihr parallel an mehreren Changes arbeitet.
