---
layout: section
---

# Warum Spec-driven? Warum jetzt?

---

# Code ist nicht mehr der Engpass

KI schreibt Code in Sekunden. **Den richtigen Code zu schreiben** – das bleibt das Problem.

- Anforderungen driften zwischen Ticket, Design und Implementierung
- KI-Assistenten sind mächtig – aber kontextblind
- Entscheidungen leben im Chat-Verlauf – und sterben dort

---

# Was ist OpenSpec?

Ein **Workflow-Layer**, der im Repo neben dem Code lebt.

- Changes werden vorgeschlagen, nicht einfach gebaut
- Jeder Change trägt seinen vollständigen Kontext: proposal, specs, design, tasks
- Die CLI macht diesen Kontext navigierbar – für Menschen *und* KI-Agenten

---

# Guardrails statt Vibe-Coding

KI-Agenten halluzinieren, wenn sie raten müssen, was zu tun ist.

- **Ohne Spec:** Agent erfindet Anforderungen, Constraints, Edge Cases
- **Mit Spec:** Agent liest, was bereits entschieden ist – und arbeitet darin
- Die Spec ist die Leitplanke – nicht das Schienennetz

Halluzinationen verschwinden nicht, weil das Modell besser wird – sondern weil ihm der Spielraum genommen wird.

---

# Eigenschaft 1: Die Spec lebt im Repo

Specs sind Markdown-Dateien neben dem Code, nicht im Confluence-Friedhof.

- **Versionierung gratis** – jede Spec-Änderung ist ein Commit
- **Reviewbar wie Code** – Pull Request, Diff, Approval
- **Single Source of Truth** – kein „welche Version meinst du?"
- **Synchron mit dem Branch** – die Spec eines Features lebt im Feature-Branch

Was im Repo lebt, kann nicht veralten, ohne dass es jemand merkt.

---

# Eigenschaft 2: Wächst mit der Codebase

OpenSpec ist **brownfield-first** – designed für Code, der bereits existiert.

- Neue Changes beschreiben Deltas: `ADDED` · `MODIFIED` · `REMOVED`
- Beim Archivieren werden Deltas in die Haupt-Specs eingearbeitet
- Die Spec-Sammlung wächst organisch mit jedem gemergten Change
- Theoretisch: Doku am Ende des Tages aktualisiert sich selbst mit

Du baust deine Spec nicht einmal. Du baust sie kontinuierlich.

---

# Eigenschaft 3: Tool-agnostic

OpenSpec ist nicht an einen KI-Assistenten gekoppelt.

- Claude Code, Cursor, Copilot, Cline, Windsurf, Continue … 30+ Tools werden bei `init` verdrahtet
- Skills + Slash-Commands werden tool-spezifisch generiert
- Die Spec selbst ist plain Markdown – jeder Agent (und jeder Mensch) kann sie lesen
- Wechsel des Assistenten = `openspec init` neu laufen lassen, sonst nichts

Kein Vendor-Lock-in. Die Investition steckt in den Specs, nicht im Tooling.

---

# Warum es funktioniert

Die Spec wird zum **gemeinsamen Gedächtnis** des Teams.

```
developer → openspec propose → specs + tasks → KI implementiert → Review
```

Kein „Was wollten wir hier eigentlich bauen?" – die Antwort liegt im Repo.
