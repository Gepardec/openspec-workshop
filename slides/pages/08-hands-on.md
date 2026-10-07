---
layout: section
variant: ascii
---

# Hands-on Übungen

<!--
Frage-Pause, bevor alle selbst loslegen: Was ist noch offen?
Dann wirklich warten – rund zehn Sekunden Stille aushalten.
-->

---
layout: default
---

# Best Practices für die Übungen

- Nach jeder Übung committen – so kommt ihr jederzeit zum vorherigen Stand zurück
- Generell mindestens je ein Commit nach ...
  - ... dem Change Proposal – `feat: propose change "<change-name>"`
  - ... dem Anwenden – `feat: apply change "<change-name>"`
  - ... dem Archivieren des Changes – `feat: archive change "<change-name>"`
- Change final? → alles zwischen _"propose change"_ und _"archive change"_ squashen

<!--
Dieselben drei Commits wie im Team-Kapitel: archivieren nach dem Review,
vor dem Merge.
-->

---
layout: default
class: gepardec-text-lg
---

# Übung 1 – OpenSpec selbst aufsetzen

`exercises/01_init_openspec/README.md`

Setup, CLI-Installation und `openspec init` – ihr seht, was OpenSpec aus einem leeren Repo macht.

<!--
An passender Stelle erwähnen: mindestens Claude Code, Codex und Junie installieren.
-->

---
layout: default
class: gepardec-text-lg
---

# Übung 2 – Workshop-Setup übernehmen

`exercises/02_setup_openspec/README.md`

Kopiert das vorkonfigurierte `openspec/`-Verzeichnis in euer Repo-Root. Ab jetzt arbeitet ihr auf dem vollständigen Workshop-Stand – inkl. aller Changes und Specs.

<!--
CLI-Befehl zum Kopieren funktioniert nicht!
-->

---
layout: default
class: gepardec-text-lg
---

# Übung 3 – Change archivieren

`exercises/03_archive_change/README.md`

Der Change `us-06-dashboard` ist fertig implementiert. Archiviert ihn mit OpenSpec – und schaut euch an, was danach in `openspec/` anders ist.

Was fällt euch sonst noch auf?

<!--
Archivieren mit openspec archive, nicht mit /opsx:archive (Kapitel 3).

Erwartete Beobachtung: specs/dashboard/spec.md bekommt als Purpose den
Platzhalter „TBD - created by archiving change us-06-dashboard“, und
openspec validate --strict meldet ihn. Grund: Die Delta-Spec stammt aus
OpenSpec 1.3.1 und hat noch keinen ## Purpose. Ein aktuelles propose schreibt
ihn direkt in die Delta-Spec – hier also den Purpose von Hand in der
Haupt-Spec nachtragen.
-->

---
layout: default
class: gepardec-text-lg
---

# Übung 4 – Vorbereiteten Change anwenden

`exercises/04_apply_change/README.md`

Ein fertig ausformulierter Change liegt bereit. Kopiert ihn ins `openspec/changes/`-Verzeichnis, wendet ihn an und archiviert ihn.

---
layout: default
class: gepardec-text-lg
---

# Übung 5 – Proposal aus einer User Story

`exercises/05_propose_change/README.md`

Eine User Story liegt bereit. Erstellt daraus mit `/opsx:propose` ein vollständiges Change-Proposal – und bringt den Change danach bis ins Archiv.

---
layout: default
class: gepardec-text-lg
---

# Übung 6 – Unklare Anforderung erkunden

`exercises/06_explore_requirements/README.md`

Eine vage Anforderung liegt bereit. Schärft sie in einer Exploration – und erstellt am Ende ein Proposal.

Lasst euch nach der Explore-Phase einen Click-Dummy erzeugen (Tipp: Skill `frontend-design`).

Danach der vollständige Loop: propose, apply, sync, archive.
