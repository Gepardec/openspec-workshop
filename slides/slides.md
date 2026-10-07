---
theme: '@gepardec/slidev-theme-gepardec'
addons:
  - slidev-addon-qrcode
title: OpenSpec Workshop
info: |
  ## OpenSpec Workshop
  Spec-driven Development mit OpenSpec

  Learn more at [gepardec.com](https://www.gepardec.com/leistungen/spec-driven-development-mit-openspec/)
drawings:
  persist: false
transition: slide-left
comark: true
duration: 510min
layout: cover
---

# Spec-driven Development mit OpenSpec

Oliver Tod

Wien, TT.MM.JJJJ

---
layout: agenda
---

# Agenda

- Was ist Spec-driven?
- Workflow & Artefakte
- Setup & Konfiguration
- CLI als Datei-Navigator
- CLI als Agent-Bridge
- Hands-on Übungen
- OpenSpec im Team
- FAQ

<!--
Keine Uhrzeiten auf der Folie – der Tag verschiebt sich ohnehin.

Pausen: spätestens nach 1,5 Stunden eine einlegen, Mittagspause nach Block 4.
Am Nachmittag flexibel nach Fortschritt der Hands-on-Übungen. Team und FAQ
kommen nach den Übungen; die FAQ ist der Puffer – Fragen nach verbleibender
Zeit auswählen.

Blöcke 4 und 5 haben je einen praktischen Teil: Quiz-Runde nach dem
Datei-Navigator, Live-Demo nach der Agent-Bridge.
-->

---
layout: default
class: gepardec-text-lg
---

# Warm-Up

Kurz reihum:

1. **Wer seid ihr** und woran arbeitet ihr?
2. **Wie nutzt ihr KI heute** – ein Beispiel reicht.
3. **Was erwartet ihr euch** von heute?

<!--
Direkt reihum, ohne Vorbereitungszeit und ohne Uhr – ein, zwei Sätze pro Frage reichen.

Erwartungen mitschreiben und im Lauf des Tages aufgreifen.
-->

---
src: ./pages/00-environment.md
---

---
src: ./pages/01-what-why.md
---

---
src: ./pages/02-phases-documents.md
---

---
src: ./pages/03-setup-config.md
---

---
src: ./pages/04-cli-navigator.md
---

---
src: ./pages/05-cli-agent-bridge.md
---

---
src: ./pages/08-hands-on.md
---

---
src: ./pages/06-team.md
---

---
src: ./pages/07-faq.md
---

---
layout: default
class: gepardec-text-lg
---

# Und morgen?

Startet euren ersten echten Change – in eurem eigenen Repo:

1. `openspec init` und die `config.yaml` mit dem füllen, was der Agent nicht aus dem Code liest
2. Eine kleine, echte Anforderung mit `/opsx:explore` schärfen
3. Propose, Plan-Review, Apply, Code-Review, `openspec archive`

Ihr wollt OpenSpec im ganzen Team einführen? Wir begleiten euch dabei – meldet euch bei **Christoph Kofler**: christoph.kofler@gepardec.com

<!--
Der konkrete nächste Schritt ist der Punkt dieser Folie: kein Pilotprojekt,
sondern ein Change in der eigenen Codebase, am besten diese Woche.

Wir arbeiten an einem Angebot, Teams bei der Einführung von OpenSpec zu
begleiten und zu befähigen. Ansprechpartner dafür ist Christoph Kofler.
-->

---
layout: contact
name: Oliver Tod
role: Senior Software Engineer
email: oliver.tod@gepardec.com
phone: +43 664 538 7077
photo: /contact.jpg
---

# Danke!