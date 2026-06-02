---
layout: section
---

# Was ist Spec-driven Development und wozu?

---

# Wo es heute hakt

- KI-Agenten generieren Code schneller, als wir Anforderungen klären können
- Anforderungen driften zwischen Ticket, Design und Implementierung auseinander
- Was wir mit dem Agenten besprochen haben, lebt nur im Chat-Fenster

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

# Specs im Repo, nicht im Wiki

Specs sind Markdown-Dateien neben dem Code, statt in einem separaten Wiki.

- **Versionierung gratis** – jede Spec-Änderung ist ein Commit
- **Reviewbar wie Code** – Pull Request, Diff, Approval
- **Single Source of Truth** – kein „welche Version meinst du?"
- **Synchron mit dem Branch** – die Spec eines Features lebt im Feature-Branch

Spec-Änderungen tauchen im Diff auf — wer den Code reviewt, sieht auch die Anforderungsänderung.

---

# Wächst mit dem Code

OpenSpec ist **brownfield-first** – designed für Code, der bereits existiert.

- Neue Changes beschreiben Deltas: `ADDED` · `MODIFIED` · `REMOVED`
- Beim Archivieren werden Deltas in die Haupt-Specs eingearbeitet
- Die Spec-Sammlung wächst organisch mit jedem gemergten Change

---

# Nicht an ein Tool gebunden

OpenSpec ist nicht an einen KI-Agenten gekoppelt.

- Claude Code, Cursor, Copilot, Cline, Windsurf, Continue … 30+ Tools werden bei `init` verdrahtet
- Skills + Slash-Commands werden tool-spezifisch generiert
- Die Spec selbst ist plain Markdown – jeder Agent (und jeder Mensch) kann sie lesen
