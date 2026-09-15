---
layout: section
---

# Was ist Spec-driven Development und wozu?

---
layout: default
---

# Wo es heute hakt

- KI-Agenten generieren Code schneller, als wir Anforderungen klären können
- Anforderungen driften zwischen Ticket, Design und Implementierung auseinander
- Was wir mit dem Agenten besprochen haben, lebt nur im Chat-Fenster
- Limitierte Kontextfenster

---
layout: default
---

# Was ist OpenSpec?

Ein **Workflow-Layer**, der im Repo neben dem Code lebt.

- Changes werden vorgeschlagen, nicht einfach gebaut
- Jeder Change trägt seinen vollständigen Kontext: proposal, specs, design, tasks
- Volle Kontrolle über jedes Artefakt
- Keine Implementierung, bevor die Artefakte aus *deiner* Sicht vollständig sind
- Die CLI macht diesen Kontext navigierbar – für Menschen *und* KI-Agenten

---
layout: two-cols-header
---

# Guardrails statt Vibe-Coding

KI-Agenten halluzinieren, wenn sie raten müssen, was zu tun ist.

::left::

### Ohne Spec

- Agent erfindet Anforderungen, Constraints, Edge Cases
- Das Besprochene lebt nur im Chat-Fenster
- Jede neue Session fängt bei null an

::right::

### Mit Spec

- Agent liest, was bereits entschieden ist – und arbeitet darin
- Entscheidungen sind über Sessions hinweg persistiert
- Die Spec ist die Leitplanke – nicht das Schienennetz

---
layout: quadrants
---

# Specs im Repo, nicht im Wiki

::one::

### Versionierung gratis

Jede Spec-Änderung ist ein Commit.

::two::

### Reviewbar wie Code

Pull Request, Diff, Approval.

::three::

### Single Source of Truth

Kein „*welche Version meinst du?*"

::four::

### Synchron mit dem Branch

Die Spec eines Features lebt im Feature-Branch.

---
layout: default
---

# Wächst mit dem Code

OpenSpec ist **brownfield-first** – designed für Code, der bereits existiert.

- Neue Changes beschreiben Deltas: `ADDED` · `MODIFIED` · `REMOVED`
- Beim Archivieren werden Deltas in die Haupt-Specs eingearbeitet
- Die Spec-Sammlung wächst organisch mit jedem gemergten Change

> Selbstverständlich kann man aber auch auf der grünen Wiese starten 😉

---
layout: default
---

# Nicht an ein Tool gebunden

OpenSpec ist nicht an einen KI-Agenten gekoppelt.

- Claude Code, Codex, Copilot, OpenCode … 30+ Tools werden bei `init` verdrahtet
- Skills + Slash-Commands werden tool-spezifisch generiert
- Die Spec selbst ist plain Markdown – jeder Agent (und jeder Mensch) kann sie lesen
- Projektkonventionen werden zentral in der OpenSpec-Konfiguration definiert
