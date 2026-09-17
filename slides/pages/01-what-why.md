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
- Jeder Change trägt seinen vollständigen Kontext — vom Warum bis zur Aufgabenliste
- Volle Kontrolle über jedes Dokument
- Keine Implementierung, bevor der Plan aus *deiner* Sicht vollständig ist
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

Jede Spec-Änderung ist ein Commit — mit Pull Request, Diff und Approval.

::two::

### In Griffweite des Agenten

Der Agent liest die Spec direkt aus dem Repo — kein Copy-Paste aus dem Wiki.

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

- Ein Change beschreibt nur, was sich ändert — nicht das ganze System
- Ist der Change abgeschlossen, fließt die Änderung in die Specs ein
- Die Spec-Sammlung wächst organisch mit jedem abgeschlossenen Change

> Selbstverständlich kann man aber auch auf der grünen Wiese starten 😉

---
layout: default
---

# Nicht an ein Tool gebunden

OpenSpec ist nicht an einen KI-Agenten gekoppelt.

- Claude Code, Codex, Copilot, OpenCode … rund 50 Tools werden bei `init` verdrahtet
- Skills + Slash-Commands werden tool-spezifisch generiert
- Die Spec selbst ist plain Markdown – jeder Agent (und jeder Mensch) kann sie lesen
- Projektkonventionen werden zentral in der OpenSpec-Konfiguration definiert

---
layout: quadrants
---

# Lohnt sich der Mehraufwand?

::one::

### Fehler früh abfangen

Ein Missverständnis im Proposal zu korrigieren kostet nichts. Nach 400 Zeilen generiertem Code schon.

::two::

### Das Warum bleibt

Sechs Monate später erklärt der archivierte Change, warum das System so funktioniert — dir und der nächsten Agenten-Session.

::three::

### Review ohne Chat-Archäologie

Plan lesen, Änderungen an den Specs überfliegen, Aufgaben prüfen. Ein Ordner, ein Change.

::four::

### Kein Big-Bang-Dokumentieren

Ein Change beschreibt nur die Änderung — auch in einer Anwendung mit 50.000 Zeilen.

<!--
OpenSpec kostet einen Schritt: erst ein kurzer Plan, dann Code. Diese Folie
beantwortet die Frage, die skeptische Teams an dieser Stelle stellen.

Quelle: docs/overview.md, „Why this is worth the small overhead".
-->

---
layout: statement
---

# Für den Ein-Zeilen-Fix lohnt es sich meist nicht — überall, wo **Einigkeit zählt**, schon.

<!--
Upstream sagt das selbst: für einen wirklich trivialen Fix zahlt sich die
Zeremonie womöglich nicht aus. Einigkeit zählt aber fast immer, sobald ein Agent
selbstbewusst baut, was man ihm vage aufgetragen hat.

Rückgriff in der Diskussion: „Wo stößt Spec-driven Development an seine Grenzen?"
-->
