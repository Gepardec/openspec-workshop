# Slide Review

Bewertung aller Slides in `slides/pages/` nach den Kriterien:

- **A**: Sind einzelne Slide-Files in sich logisch abgeschlossen?
- **B**: Ergibt die Storyline/der Aufbau als Ganzes logisch Sinn? Roter Faden?
- **C**: Gibt es Formulierungen, die ein Mensch nicht so sagen würde — speziell nicht in einem Workshop?
- **D**: Enthält die Präsentation Marketingaussagen? (Diese haben dort keinen Platz!)
- **E**: Gibt es Text/Stellen, die durch eine Grafik (z.B. Mermaid) ersetzt/erweitert werden könnten?

---

# Neuer Vorschlag: Agenda nach dem Warm-Up

## Fehlt komplett: Tagesüberblick für Teilnehmer
### Regel B (roter Faden)
Nach dem Warm-Up (`00-warmup.md`) springt der Foliensatz direkt in das Why-Kapitel. Teilnehmer haben keinen Überblick, was sie an diesem Tag erwartet, wie lange welcher Block dauert und wann die Hands-on-Phase beginnt. Eine kurze Agenda-Slide würde den Erwartungshorizont setzen und die Verbindung zu den im Warm-Up gesammelten Erwartungen schaffen.
### Lösungsvorschlag
Neue Slide am Ende von `00-warmup.md` oder als eigene Datei `00b-agenda.md` einfügen. Vorschlag für den Inhalt:

```md
---
layout: default
---

# Agenda

| Block | Inhalt | Zeit |
|---|---|---|
| 1 | Warum Spec-driven? Warum jetzt? | 20 min |
| 2 | Phasen & Dokumente | 30 min |
| 3 | Setup & Konfiguration | 20 min |
| 4 | CLI als Datei-Navigator (+ Quiz) | 15 min |
| 5 | CLI als Agent-Bridge (+ Live-Demo) | 25 min |
| 6 | Hands-on Übungen | 90 min |
| 7 | Diskussion & Wrap-up | 20 min |

<!--
Pausen zwischendurch nach Bedarf. Punkte vom Whiteboard
(Erwartungen aus dem Warm-Up) im Lauf des Tages abhaken.
-->
```

Alternativ als Mermaid-Timeline-Diagramm visualisieren — das macht die Zeitanteile sichtbarer. Zeiten an den tatsächlich geplanten Tagesablauf anpassen.

---

# 01-what-why.md

## Code ist nicht mehr der Engpass
### Regel D (Marketing)
Die Slide ist im Pitch-Stil verfasst — „Code ist nicht mehr der Engpass" und „Entscheidungen leben im Chat-Verlauf – und sterben dort" sind rhetorische Behauptungen, keine technischen Aussagen. Für einen Entwickler-Workshop wirkt das mehr wie ein Sales-Deck einer Beratung als wie eine fachliche Einleitung.
### Lösungsvorschlag
Titel zu etwas Konkreterem ändern, z.B. „Wo es heute hakt", und die Bullets nüchterner formulieren:
- KI-Assistenten generieren Code schneller, als wir Anforderungen klären können
- Anforderungen driften zwischen Ticket, Design und Implementierung auseinander
- Was wir mit dem Agenten besprochen haben, lebt nur im Chat-Fenster

## Eigenschaft 1: Die Spec lebt im Repo
### Regel C (unmenschliche Formulierung) + D (Marketing)
„Confluence-Friedhof" ist polemisch und wirkt eingeübt, kein Workshop-Tonfall. Der Abschlusssatz „Was im Repo lebt, kann nicht veralten, ohne dass es jemand merkt." ist sachlich falsch (Code-Kommentare veralten ständig unbemerkt) und eine reine Marketingaussage.
### Lösungsvorschlag
„Confluence-Friedhof" → „statt in einem separaten Wiki". Schlussatz streichen oder ersetzen mit: „Spec-Änderungen tauchen im Diff auf — wer den Code reviewt, sieht auch die Anforderungsänderung."

## Eigenschaft 2: Wächst mit der Codebase
### Regel D (Marketing)
„Theoretisch: Doku am Ende des Tages aktualisiert sich selbst mit" — das „theoretisch" entlarvt die Aussage selbst; sie sollte raus. Der Schlusssatz „Du baust deine Spec nicht einmal. Du baust sie kontinuierlich." ist eine klassische Marketingfloskel.
### Lösungsvorschlag
Beide Sätze ersatzlos streichen. Die drei Bullets davor tragen die Aussage schon.

## Eigenschaft 3: Tool-agnostic
### Regel D (Marketing)
„Kein Vendor-Lock-in. Die Investition steckt in den Specs, nicht im Tooling." ist eine reine Werbeaussage.
### Lösungsvorschlag
Streichen. Die vier Bullets darüber sagen das gleiche bereits konkret.

## Warum es funktioniert
### Regel A (Abschluss) + D (Marketing)
„Die Spec wird zum gemeinsamen Gedächtnis des Teams" und „Kein „Was wollten wir hier eigentlich bauen?"" sind beide Pitch-Sätze. Außerdem wiederholt die Slide die Kernbotschaft, die bereits über drei vorherige Slides ausgebreitet wurde — sie schließt das Kapitel nicht ab, sie wärmt es nochmal auf.
### Lösungsvorschlag
Slide entweder streichen oder als echten Übergang nutzen: ein einziger Sequence- oder Flowchart-Mermaid, der den Loop developer → propose → specs+tasks → KI → Review visualisiert (Regel E), ohne erneuten Textblock.

---

# 02-phases-documents.md

## Ablauf (core profil)
### Regel C (Tippfehler/Casing)
Im Titel steht „core profil" — sollte „core profile" oder besser „core-Profil" sein.
### Lösungsvorschlag
Titel zu „Ablauf (core-Profil)" ändern.

## proposal.md – Das WARUM
### Regel A (logischer Abschluss) + C (unklarer Bullet)
„Fundament für alles Weitere" ist als Bullet zu vage und doppelt nicht zu den anderen vier konkreten Aussagen. Wirkt wie Füllmaterial.
### Lösungsvorschlag
Bullet streichen. Stattdessen einen konkreten Hinweis ergänzen, was später passiert, wenn das Why fehlt (z.B. Reviewer-Diskussion verfehlt das Ziel).

## spec.md – Das WAS
### Regel D (Marketing)
„Spec und Test sind dieselbe Quelle" — klingt griffig, ist aber eine Idealisierung und kein Workshop-Fakt; in der Praxis bleibt der Test ein separates Artefakt.
### Lösungsvorschlag
Umformulieren zu: „Jedes Szenario ist die direkte Vorlage für einen Akzeptanztest."

## Delta-Specs: die brownfield-Innovation
### Regel D (Marketing)
„die brownfield-Innovation" im Titel ist Marketingvokabular.
### Lösungsvorschlag
Titel zu „Delta-Specs: nur was sich ändert" oder „Delta-Specs: das brownfield-Konzept" ändern.

## Was folgt nach dem propose
### Regel A (logischer Abschluss) + C (Formulierung)
Der Titel klingt holprig („dem propose" — propose ist im Deutschen kein Nomen). Inhaltlich ist die Slide eine Vorschau auf zwei Kapitel, die direkt danach kommen — sie ist überflüssig.
### Lösungsvorschlag
Slide ersatzlos streichen. Die nächste Section („Moment 1: CLI als Datei-Navigator") schließt direkt an. Falls eine Brücke gewünscht ist: Titel zu „Nach propose: apply und archive" mit nur einem kurzen Satz.

---

# 03-setup-config.md

## Was wird angelegt?
### Regel B (Storyline/roter Faden)
Laut den dokumentierten OpenSpec-Fakten erstellt `init` **kein** `AGENTS.md`. Die nächste Slide („Tipp: CLAUDE.md / AGENTS.md auf OpenSpec verweisen") suggeriert aber, dass diese Dateien existieren oder vom Tool erzeugt werden. Hier fehlt ein expliziter Übergang: „init erzeugt diese Dateien NICHT — wenn ihr sie habt, dann…"
### Lösungsvorschlag
Auf der Folie „Was wird angelegt?" einen Hinweis ergänzen: „`AGENTS.md` / `CLAUDE.md` werden bewusst nicht angelegt — wenn vorhanden, bleiben sie unverändert."

## config.yaml – das eine wichtige File
### Regel C (denglische Formulierung)
„das eine wichtige File" ist Denglisch — im Deutschen sagt man „die eine wichtige Datei" oder gar „die Datei, die zählt".
### Lösungsvorschlag
Titel zu „`config.yaml` – die eine Datei, die zählt" ändern.

## CLI vs. Slash-Command — wer macht was?
### Regel A (Code-Block kaputt)
Der Code-Block ist Markdown mit eingebettetem Bash-Block:

````
```md
2. **Create the change directory**
   ```bash
   openspec new change "<name>"
````

Die inneren Triple-Backticks werden nicht escapt — der Slidev/Shiki-Renderer wird das vermutlich falsch parsen oder vorzeitig schließen.
### Lösungsvorschlag
Inneren Block mit vier Backticks umschließen oder als reinen Text-Block (ohne Sprachhinweis) darstellen. Alternativ: nur den interessanten Teil als kommentierten Pseudo-Auszug zeigen, nicht den geschachtelten Markdown.

## Ausnahme: `archive` braucht keinen Agenten
### Regel A (zu viel Inhalt für eine Slide)
Die Slide kombiniert drei Punkte: (1) was archive tut, (2) der Bug im mitgelieferten Skill, (3) die Faustregel. Mit v-click wird das gestaffelt, aber inhaltlich sind das eigentlich zwei Slides. Außerdem führt sie ein Issue als Detail ein, das vom Hauptthema (Setup) ablenkt.
### Lösungsvorschlag
Teil 2+3 (Skill-Bug + Faustregel) auf eine eigene Slide auslagern mit Titel „Faustregel: Skills rufen die CLI auf, sie denken nicht selbst". Verlinkt das Issue dort.

---

# 04-cli-navigator.md

## `openspec status --change <change>`
### Regel B (Widerspruch zum vorigen Abschnitt!)
Die Slide sagt: „Das `spec-driven`-Schema erfordert vier Artefakte: proposal → specs → design → tasks. Ein Change ist erst implementierungsbereit, wenn alle vier vorhanden sind."

Das **widerspricht direkt** Slide `02-phases-documents.md` / „opsx:propose – alle vier Artefakte in einem Schritt", wo das Mermaid `design` als optional markiert und der Untertitel sagt: „Design entfällt, wenn keine technischen Entscheidungen getroffen werden müssen".
### Lösungsvorschlag
Formulierung anpassen: „Das `spec-driven`-Schema kennt vier Artefakt-Typen (proposal, specs, design, tasks). `status` zeigt, welche davon für den aktuellen Change bereits vorhanden sind — design ist optional, die anderen drei sind Pflicht."

## Hands-on: Quiz-Runde
### Regel A (zu viel Rohinput) + E (Visualisierung)
Die Slide wirft den kompletten `openspec --help`-Output auf den Screen — Teilnehmer können das aus dem Terminal selbst lesen. Im Workshop nimmt das nur Aufmerksamkeit weg vom eigentlichen Quiz-Link.
### Lösungsvorschlag
Help-Output entfernen oder auf drei bis vier relevante Befehle reduzieren (`list`, `show`, `status`, `view`). Stattdessen großen QR-Code zum Quiz-Link einfügen — Teilnehmer können direkt vom Handy joinen.

---

# 05-cli-agent-bridge.md

## Die Lücke
### Regel B (Wiederholung) + D (Marketing)
Die Inhalte („Agenten sind kontextblind", „halluzinieren wenn sie raten") wurden in `01-what-why.md` / „Guardrails statt Vibe-Coding" bereits gesagt. Hier ohne neue Information wiederholt — der rote Faden stockt.
### Lösungsvorschlag
Diese Slide kürzen auf einen Satz oder weglassen. Direkt mit „openspec instructions" einsteigen, da der Kontext bereits etabliert ist. Falls Wiederholung gewünscht: explizit als Rückbezug formulieren („Erinnert ihr euch: der Agent ist standardmäßig kontextblind. Hier ist das Werkzeug dagegen.").

## Was steckt in den Instructions?
### Regel E (Visualisierung)
Die fünf nummerierten Bullets („1. Change-Zusammenfassung … 5. Projekt-Konventionen") sind eine perfekte Gelegenheit für eine Mermaid-Grafik, die zeigt: aus welcher Quelldatei (proposal.md, tasks.md, specs/, design.md, config.yaml) der jeweilige Block in den Prompt gemergt wird. Aktuell muss der Teilnehmer das selbst im Kopf verknüpfen.
### Lösungsvorschlag
Mermaid-Flowchart: Fünf Quelldateien links → Pfeile → ein „instructions-Prompt"-Block rechts. Macht die Bridge-Metapher visuell.

## Warum das wichtig ist
### Regel B (Wiederholung) + D (Marketing)
„Die Spec ist keine Dokumentation. **Sie ist das Arbeitsgedächtnis des Teams.**" — das war fast wortgleich schon Schlussatz in `01-what-why.md` („gemeinsames Gedächtnis des Teams"). Außerdem wieder rein rhetorischer Pitch-Stil.
### Lösungsvorschlag
Slide streichen, oder durch eine konkrete Beobachtung ersetzen, die in der Live-Demo bestätigt wird (z.B. „Achtet bei der Demo darauf, dass der Agent nie nachfragt, was die Akzeptanzkriterien sind").

---

# 06-hands-on.md

## Übersicht aller Übungen
### Regel A (Abschluss/Orientierung) + E (Visualisierung)
Die Sektion besteht aus sechs sehr ähnlich aufgebauten Slides ohne Übersicht vorab. Teilnehmer wissen nicht, was sie erwartet — und vor allem nicht, **welche Übungen aufeinander aufbauen** (z.B. baut 02 auf 01 auf? Können 04, 05, 06 parallel oder muss man der Reihe nach?).
### Lösungsvorschlag
Eine zusätzliche Übersichts-Slide direkt nach der Section-Folie einfügen — am besten als Mermaid-Flowchart, das die Abhängigkeiten zeigt:

```
01 init  →  02 setup  →  03 archive
                        ↘ 04 apply
                        ↘ 05 propose
                        ↘ 06 explore
```

So sehen Teilnehmer auf einen Blick, was Pflicht ist und was als Token-Bonus drangehängt werden kann.

---

# 07-discussion.md

## Danke
### Regel C (kaputter/unklarer Link)
„Repo · Docs · Issues: `openspec-workshop`" — das ist kein klickbarer Link und kein vollständiger URL. Teilnehmer wissen nicht, wo sie das Repo finden.
### Lösungsvorschlag
Konkreten URL angeben (z.B. `github.com/<org>/openspec-workshop`) und idealerweise einen QR-Code daneben — der Workshop endet, Teilnehmer wollen das Material mitnehmen können.

---

# Zusammenfassung der wichtigsten Punkte

1. **Echter inhaltlicher Widerspruch** zwischen `02-phases-documents.md` und `04-cli-navigator.md` zur Pflicht von `design.md` — das sollte zuerst gefixt werden.
2. **Marketingaussagen** häufen sich im ersten Kapitel (`01-what-why.md`) — fast jede Slide endet mit einem Pitch-Satz, der gestrichen werden kann ohne Informationsverlust.
3. **Wiederholungen** in Kapitel 5 von Inhalten aus Kapitel 1 — gut für einen Vortrag, aber spürt zäh in einem Workshop, wo der rote Faden eher zur konkreten apply-Phase laufen sollte.
4. **Mermaid-Potenzial** vor allem in 05 („Was steckt in den Instructions?") und 06 (Übungs-Abhängigkeitskarte).
5. **Sprachliche Glättung** an wenigen Stellen: „das eine wichtige File", „core profil", „dem propose".
6. **Agenda-Slide fehlt** komplett zwischen Warm-Up und erstem Kapitel — Teilnehmer haben keinen Tagesüberblick.
