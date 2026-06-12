---
layout: section
---

# Phasen & Dokumente

---

# Ablauf

<div class="flex items-center justify-between mt-12 gap-1">
  <div v-click="1" class="flex-1 border border-white/30 rounded-xl p-5 text-center">
    <div class="font-bold text-base mb-2 text-white">explore</div>
    <div class="text-xs text-white/60">Anforderungen zerlegen, Domäne erkunden</div>
  </div>

  <div v-click="2" class="text-white/40 text-2xl flex-shrink-0 px-1">→</div>

  <div v-click="2" class="flex-1 border border-white/30 rounded-xl p-5 text-center">
    <div class="font-bold text-base mb-2 text-white">propose</div>
    <div class="text-xs text-white/60">Change ausformulieren (proposal, spec, design, tasks)</div>
  </div>

  <div v-click="3" class="text-white/40 text-2xl flex-shrink-0 px-1">→</div>

  <div v-click="3" class="flex-1 border border-white/30 rounded-xl p-5 text-center">
    <div class="font-bold text-base mb-2 text-white">apply</div>
    <div class="text-xs text-white/60">implementieren</div>
  </div>

  <div v-click="4" class="text-white/40 text-2xl flex-shrink-0 px-1">→</div>

  <div v-click="4" class="flex-1 border border-white/30 rounded-xl p-5 text-center">
    <div class="font-bold text-base mb-2 text-white">sync</div>
    <div class="text-xs text-white/60">in main-specs synchronisieren</div>
  </div>

  <div v-click="5" class="text-white/40 text-2xl flex-shrink-0 px-1">→</div>

  <div v-click="5" class="flex-1 border border-white/30 rounded-xl p-5 text-center">
    <div class="font-bold text-base mb-2 text-white">archive</div>
    <div class="text-xs text-white/60">archivieren</div>
  </div>
</div>

<!--
Es gibt auch noch das extend profile. nicht näher drauf eingehen, kann nachgelesen werden.
-->

---

# Szenario: Abfrage Abrechnungsmonat

Neues Feature im Zoo-Management-System — zwei Sichten auf denselben Datensatz:

<div class="grid grid-cols-2 gap-6 mt-6">
  <div class="border border-white/30 rounded-xl p-5">
    <div class="font-bold text-sm mb-3 text-blue-300">Mitarbeiter</div>
    <div class="text-xs text-white/70">Laufender Monat — sind alle Tasks des Abrechnungsmonats (= Vormonat) bereits erledigt?</div>
  </div>
  <div class="border border-white/30 rounded-xl p-5">
    <div class="font-bold text-sm mb-3 text-green-300">Projektleiter</div>
    <div class="text-xs text-white/70">Immer Abrechnungsmonat (= Vormonat) — Überblick über den abzuschließenden Monat</div>
  </div>
</div>

<div class="mt-10 text-center text-white/50 text-sm">
  Wir begleiten diesen Change von <code>explore</code> bis <code>archive</code>
</div>

---

# `opsx:explore` – der optionale Vorschritt

`explore` ist kein Pflichtschritt. Es ist ein Denkpartner, bevor Artefakte entstehen.

**Wann lohnt es sich?**

- Anforderung ist vage: _"Irgendwie sollen Nutzer Tiere filtern können"_
- Domäne ist neu: du weißt noch nicht, wie viele Capabilities das betrifft
- Scope ist unklar: Feature oder mehrere Changes?
- Du willst Edge Cases durchdenken, bevor sie in der Spec landen

<v-click>

**Was passiert dabei?**

Ein Gesprächs-Loop mit dem Agenten: Fragen stellen, Annahmen aufdecken, Szenarien durchspielen – aber **noch kein `propose`, noch kein Artefakt**.

```
/opsx:explore   →   Frage-Antwort-Runden   →   "Jetzt sind wir bereit für propose"
```

</v-click>

<v-click>

**Wann überspringen?** Wenn die Anforderung klar ist – einfach direkt mit `/opsx:propose` starten.

</v-click>

---

# `opsx:explore` — Praxisbeispiel

<div class="border-2 border-dashed border-white/30 rounded-xl flex flex-col items-center justify-center h-72 text-white/40 text-sm gap-3">
  <div class="text-3xl">📸</div>
  <div>Screenshot: Explore-Konversation einfügen</div>
  <code class="text-xs opacity-70">slides/public/screenshots/explore-chat.png</code>
</div>

<!--
Zeige hier den Gesprächsverlauf, in dem die zwei Sichten (Mitarbeiter vs. Projektleiter)
und der Begriff "Abrechnungsmonat" herausgearbeitet wurden.
-->

---

# `opsx:propose` – alle vier Artefakte in einem Schritt

```sh
/opsx:propose   # interaktiv, oder direkt: /opsx:propose add-filter
```

<div class="flex justify-center">

```mermaid
flowchart TD
    proposal --> specs
    proposal --> design
    specs --> tasks
    design --> tasks

    style proposal fill:#1e40af,stroke:#3b82f6,color:#eff6ff
    style specs   fill:#1e293b,stroke:#94a3b8,color:#f1f5f9
    style tasks   fill:#1e293b,stroke:#94a3b8,color:#f1f5f9
    style design  fill:#1e293b,stroke:#94a3b8,color:#f1f5f9
```

</div>

Alle vier Artefakte sind Pflicht — tasks ist blockiert, bis specs und design vorliegen

<!--
Die folgenden Slides schauen auf jedes Dokument einzeln.
-->

---

# `opsx:propose` — Praxisbeispiel

<div class="border-2 border-dashed border-white/30 rounded-xl flex flex-col items-center justify-center h-72 text-white/40 text-sm gap-3">
  <div class="text-3xl">📸</div>
  <div>Screenshot: Propose-Konversation einfügen</div>
  <code class="text-xs opacity-70">slides/public/screenshots/propose-chat.png</code>
</div>

<!--
Zeige hier, wie der Agent alle vier Artefakte in einem Schritt erzeugt hat —
der "aha"-Moment, wenn proposal, spec, design und tasks in einem Rutsch entstehen.
-->

---

# `proposal.md` – Das WARUM

- Welches Problem wird gelöst – und warum jetzt?
- Vier Abschnitte: Why, What Changes, Capabilities, Impact
- Capabilities: „Vertrag" zur spec.md – pro Capability eine Spec-Datei
- Breaking Changes immer explizit als BREAKING markieren

---

# `proposal.md` — Praxisbeispiel

<div class="grid grid-cols-5 gap-4 h-full">
  <div class="col-span-2 text-xs text-white/50 flex flex-col gap-2 pt-1">
    <div><span class="text-white/80 font-semibold">Why</span> — was ist der Auslöser?</div>
    <div><span class="text-white/80 font-semibold">What Changes</span> — welche Capabilities?</div>
    <div><span class="text-white/80 font-semibold">Impact</span> — was ist betroffen?</div>
  </div>
  <div class="col-span-3">

```md
<!-- TODO: Ausschnitt aus proposal.md einfügen -->
<!-- Pfad: openspec/changes/<change-name>/proposal.md -->
<!-- Empfehlung: "Why" + "Capabilities"-Abschnitt -->
```

  </div>
</div>

---

# `spec.md` – Das WAS

- Beschreibt, was das System können soll, nicht wie es implementiert wird
- Struktur: `### Requirement` → `#### Scenario` (WHEN/THEN)
- Szenarien brauchen exakt 4 Hashtags – sonst Silent Failure
- Normative Sprache: SHALL / MUST – kein „should" oder „may"
- Jedes Szenario ist die direkte Vorlage für einen Akzeptanztest

---

# `spec.md` — Praxisbeispiel

<div class="grid grid-cols-5 gap-4 h-full">
  <div class="col-span-2 text-xs text-white/50 flex flex-col gap-2 pt-1">
    <div><span class="text-white/80 font-semibold">Requirement</span> — was soll das System können?</div>
    <div><span class="text-white/80 font-semibold">Scenario</span> — WHEN / THEN in normativem SHALL</div>
    <div class="text-white/30 italic">zwei Sichten → zwei Requirements</div>
  </div>
  <div class="col-span-3">

```md
<!-- TODO: Ausschnitt aus spec.md einfügen -->
<!-- Pfad: openspec/changes/<change-name>/specs/<capability>.md -->
<!-- Empfehlung: 1 Requirement mit 2 Szenarien (Mitarbeiter + Projektleiter) -->
```

  </div>
</div>

---

# `design.md` – Das WIE

- Architektur und technische Entscheidungen – keine Implementierungsanleitung
- Klare Abgrenzung von Zielen und Nicht-Zielen
- Jede Entscheidung mit Begründung und verworfenen Alternativen – warum X statt Y?
- Risiken im Format `[Risk]` → Mitigation
- „Open Questions" – vor Implementierung klären

---

# `design.md` — Praxisbeispiel

<div class="grid grid-cols-5 gap-4 h-full">
  <div class="col-span-2 text-xs text-white/50 flex flex-col gap-2 pt-1">
    <div><span class="text-white/80 font-semibold">Decision</span> — Entscheidung + Begründung</div>
    <div><span class="text-white/80 font-semibold">Alternatives</span> — warum verworfen?</div>
    <div><span class="text-white/80 font-semibold">Risks</span> → Mitigation</div>
  </div>
  <div class="col-span-3">

```md
<!-- TODO: Ausschnitt aus design.md einfügen -->
<!-- Pfad: openspec/changes/<change-name>/design.md -->
<!-- Empfehlung: eine Decision mit Alternative und Begründung -->
```

  </div>
</div>

---

# `tasks.md` – Die TODO-Liste

- Bricht die Umsetzung in konkrete, verifizierbare Schritte herunter
- Pflichtformat: `- [ ] X.Y Task` – andere Formate werden nicht getrackt
- Tasks mit nummerierten Überschriften gruppieren
- Reihenfolge nach Abhängigkeiten – was muss zuerst passieren?

---

# `tasks.md` — Praxisbeispiel

<div class="grid grid-cols-5 gap-4 h-full">
  <div class="col-span-2 text-xs text-white/50 flex flex-col gap-2 pt-1">
    <div><span class="text-white/80 font-semibold">Gruppe</span> — nummerierte Überschrift</div>
    <div><span class="text-white/80 font-semibold">Task</span> — <code>- [ ] X.Y</code> Format</div>
    <div class="text-white/30 italic">was wird zuerst gebaut?</div>
  </div>
  <div class="col-span-3">

```md
<!-- TODO: Ausschnitt aus tasks.md einfügen -->
<!-- Pfad: openspec/changes/<change-name>/tasks.md -->
<!-- Empfehlung: erste Gruppe vollständig + 1-2 Tasks der zweiten Gruppe -->
```

  </div>
</div>

---

# Delta-Specs: das brownfield-Konzept

Im `changes/`-Ordner steht **nicht die ganze Spec** – nur was sich ändert.

```md
## ADDED Requirements
### Requirement: System SHALL allow deleting an animal
#### Scenario: Tierpfleger löscht ein freies Tier
- **WHEN** ein Tier nicht in einem Gehege ist
- **THEN** lässt sich das Tier löschen

## MODIFIED Requirements
### Requirement: …

## REMOVED Requirements
### Requirement: …
```

- **Drei Sektionen** – ADDED, MODIFIED, REMOVED
- Verhindert Konflikte, wenn mehrere Changes denselben Bereich berühren
- Beim `archive` werden Deltas in die Haupt-Specs unter `openspec/specs/` eingearbeitet
- Bis dahin gilt: `openspec/specs/` ist der abgenommene Stand, `openspec/changes/*/specs/` sind offene Vorschläge

---

# Review-Time

Die Artefakte sind fertig. Nun gilt es, die Artefakte gründlich in dieser Reihenfolge zu lesen:

1. `proposal.md`
2. `spec.md` (1 - n)
3. `design.md`
4. `tasks.md`

<span v-click>Abweichung bemerkt? Neue Runde drehen: "Bei Decision 1 im Design-Artefakt steht X, obwohl Y stehen sollte."</span>

<span v-click>Dieses Spiel wird so lange gespielt, bis alle Artefakte genau das beschreiben, was die Anforderung ist.</span>

<span v-click>WICHTIG: Keine **Open Questions** in der `design.md`!</span>

---

# Nach propose: apply und archive

Die Artefakte sind fertig. Zwei Phasen schließen den Loop:

**apply** — Agent implementiert Task für Task, gesteuert über `opsx:apply`

**archive** — Change abschließen und Delta-Specs einarbeiten
