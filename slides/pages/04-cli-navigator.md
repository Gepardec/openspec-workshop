---
layout: section
---

# Moment 1: CLI als Datei-Navigator

`list` · `show` · `status` — 5 min

---

# `openspec list`

Alle vorgeschlagenen Changes auf einen Blick.

```sh
$ openspec list
```

Zeigt jeden Change mit Taskanzahl und Artefakt-Status – das Backlog des Projekts.

---

# `openspec show <change>`

Den vollständigen Kontext eines Change lesen.

```sh
$ openspec show us-05-delete-animal
```

Gibt proposal, specs, design und tasks in einem lesbaren Output aus – alles, worauf sich das Team geeinigt hat.

---

# `openspec status --change <change>`

Welche Artefakte sind vollständig?

```sh
$ openspec status --change us-01-animal-list
```

Das `spec-driven`-Schema erfordert vier Artefakte: proposal → specs → design → tasks.

Ein Change ist erst implementierungsbereit, wenn alle vier vorhanden sind.

---

# Hands-on: Quiz-Runde

Beantworte die [Quiz-Fragen](https://forms.gle/SfRRSALoeZnPtegq7) mit openspec CLI Befehlen.

```sh
Commands:
  init [options] [path]              Initialize OpenSpec in your project
  update [options] [path]            Update OpenSpec instruction files
  list [options]                     List items (changes by default). Use --specs to list specs.
  view                               Display an interactive dashboard of specs and changes
  change                             Manage OpenSpec change proposals
  archive [options] [change-name]    Archive a completed change and update main specs
  spec                               Manage and view OpenSpec specifications
  config [options]                   View and modify global OpenSpec configuration
  schema                             Manage workflow schemas [experimental]
  validate [options] [item-name]     Validate changes and specs
  show [options] [item-name]         Show a change or spec
  feedback [options] <message>       Submit feedback about OpenSpec
  completion                         Manage shell completions for OpenSpec CLI
  status [options]                   Display artifact completion status for a change
  instructions [options] [artifact]  Output enriched instructions for creating an artifact or applying tasks
  templates [options]                Show resolved template paths for all artifacts in a schema
  schemas [options]                  List available workflow schemas with descriptions
  new                                Create new items
  help [command]                     display help for command
```
