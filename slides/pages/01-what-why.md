---
layout: section
---

# Was ist Spec-driven Development und wozu?

---
layout: default
---

# Wo es heute hakt

- KI-Agenten schreiben Code schneller, als wir Anforderungen klären
- Anforderungen driften zwischen Ticket, Design und Implementierung auseinander
- Absprachen mit dem Agenten leben nur im Chat-Fenster
- Kontextfenster sind begrenzt

---
layout: two-cols-header
---

# Guardrails statt Vibe-Coding

Müssen KI-Agenten raten, halluzinieren sie.

::left::

### Ohne Spec

- Der Agent erfindet Anforderungen, Constraints, Edge Cases
- Jede Session beginnt bei null

::right::

### Mit Spec

- Der Agent liest, was entschieden ist – und arbeitet darin
- Entscheidungen überdauern jede Session
- Die Spec ist die Leitplanke – nicht das Schienennetz

---
layout: quadrants
---

# Specs im Repo, nicht im Wiki

::one::

### Versionierung gratis

Jede Spec-Änderung ist ein Commit – mit Pull Request, Diff und Approval.

::two::

### In Griffweite des Agenten

Der Agent liest die Spec direkt aus dem Repo – kein Copy-Paste aus dem Wiki.

::three::

### Single Source of Truth

Kein „*welche Version meinst du?*“

::four::

### Synchron mit dem Branch

Die Spec eines Features lebt im Feature-Branch.

---
layout: default
---

# Was ist OpenSpec?

Ein **Workflow-Layer**, der im Repo neben dem Code lebt.

- Erst vorschlagen, dann bauen
- Jeder Change trägt seinen vollständigen Kontext – vom Warum bis zur Aufgabenliste
- Volle Kontrolle über jedes Dokument
- Keine Implementierung, bevor der Plan aus *eurer* Sicht vollständig ist
- Die CLI macht diesen Kontext navigierbar – für Menschen *und* KI-Agenten

---
layout: default
---

# Wächst mit dem Code

OpenSpec ist **brownfield-first** – gebaut für Code, der bereits existiert.

- Ein Change beschreibt nur, was sich ändert – nicht das ganze System
- Nach Abschluss fließt die Änderung in die Specs ein
- Die Spec-Sammlung wächst mit jedem abgeschlossenen Change

> Auf der grünen Wiese starten geht natürlich auch.

---
layout: default
---

# Nicht an ein Tool gebunden

Kein Lock-in auf einen KI-Agenten.

- `init` verdrahtet rund 50 Tools: Claude Code, Codex, Copilot, OpenCode …
- OpenSpec generiert Skills + Slash-Commands pro Tool
- Die Spec selbst ist plain Markdown – jeder Agent (und jeder Mensch) kann sie lesen
- Projektkonventionen stehen tool-neutral in `AGENTS.md`, Constraints für die Artefakte in der OpenSpec-Konfiguration

---
layout: quadrants
---

# Lohnt sich der Mehraufwand?

::one::

### Fehler früh abfangen

Im Proposal kostet ein Missverständnis nichts. Nach 400 Zeilen generiertem Code schon.

::two::

### Das Warum bleibt

Sechs Monate später erklärt der archivierte Change, warum das System so funktioniert – euch und der nächsten Agenten-Session.

::three::

### Review ohne Chat-Archäologie

Plan lesen, Änderungen an den Specs überfliegen, Tasks prüfen. Ein Ordner, ein Change.

::four::

### Kein Big-Bang-Dokumentieren

Kein Vorab-Dokumentieren des Bestands – ihr startet mit dem nächsten Change, auch in einer Anwendung mit 50.000 Zeilen.

<!--
OpenSpec kostet einen Schritt: erst ein kurzer Plan, dann Code. Die Folie
beantwortet die Frage, die skeptische Teams hier stellen.

Quelle: docs/overview.md, „Why this is worth the small overhead“.
-->

---
layout: statement
---

# Für den Ein-Zeilen-Fix lohnt es sich meist nicht – überall, wo **Einigkeit zählt**, schon.

<!--
Upstream sagt das selbst: Bei einem wirklich trivialen Fix zahlt sich die
Zeremonie womöglich nicht aus. Einigkeit zählt aber fast immer, sobald ein Agent
selbstbewusst baut, was ihr ihm vage aufgetragen habt.
-->
