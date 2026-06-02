---
layout: section
---

# Die CLI als Datei-Navigator

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

Das `spec-driven`-Schema kennt vier Artefakt-Typen: proposal, specs, design, tasks.

`status` zeigt, welche davon für den aktuellen Change bereits vorhanden sind — design ist optional, die anderen drei sind Pflicht.

---

# Hands-on: Quiz-Runde

Beantworte die [Quiz-Fragen](https://forms.gle/SfRRSALoeZnPtegq7) mit openspec CLI Befehlen.

```sh
openspec list                           # alle aktiven Changes
openspec show <change>                  # vollständiger Kontext
openspec status --change <change>       # welche Artefakte sind vorhanden?
openspec view                           # interaktives Dashboard
```

<img src="./qr-code-cli-quiz.png" class="h-48 mx-auto mt-6" />