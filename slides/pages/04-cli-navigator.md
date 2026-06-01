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

# Hands-on: Quiz-Runde 1

Beantworte die Quiz-Fragen **1–12** mit nur diesen drei Befehlen.

```sh
openspec list
openspec show <change>
openspec status --change <change>
```

**5 Minuten** – los!
