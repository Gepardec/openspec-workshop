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

**Wo platzieren?** Direkt nach dem Warm-Up, nicht davor. Frage 4 im Warm-Up sammelt Erwartungen ans Whiteboard — die Agenda direkt danach erzeugt den natürlichen Rückbezug: „Ihr habt gesammelt, was ihr erwartet, hier ist was geplant ist." Erst Beziehung/Aktivierung, dann Struktur.
### Lösungsvorschlag
Neue Slide am Ende von `00-warmup.md` oder als eigene Datei `00b-agenda.md` einfügen. Vorschlag für den Inhalt:

```md
---
layout: default
---

# Agenda

| Zeit | Block |
|---|---|
| ✓ 09:00 – 09:30 | Warm-Up + Erwartungen |
| 09:30 – 10:15 | 1 · Warum Spec-driven? Warum jetzt? |
| 10:15 – 10:30 | Kaffeepause |
| 10:30 – 11:30 | 2 · Phasen & Dokumente |
| 11:30 – 12:00 | 3 · Setup & Konfiguration |
| 12:00 – 12:30 | 4 · CLI als Datei-Navigator + Quiz |
| 12:30 – 13:30 | Mittagspause |
| 13:30 – 14:15 | 5 · CLI als Agent-Bridge + Live-Demo |
| 14:15 – 16:45 | 6 · Hands-on Übungen (mit Kaffeepause) |
| 16:45 – 17:30 | 7 · Diskussion & Wrap-up |

<!--
Pausen sind Richtwerte — Kaffeepause am Nachmittag flexibel
nach Fortschritt der Hands-on-Übungen einlegen.
Punkte vom Whiteboard (Erwartungen aus Warm-Up) im Lauf
des Tages abhaken.
-->
```

**Rationale Zeitverteilung:**

- **Vormittag (3h Theorie + Quiz):** Block 1 bekommt 45 min, damit die Why-Diskussion atmen kann. Block 2 (Phasen, das inhaltliche Schwergewicht) bekommt 60 min. Block 3+4 sind komprimierter — beim Quiz reicht 30 min für die Mentimeter/Forms-Runde inkl. kurzer Auflösung.
- **Quiz vor der Mittagspause** ist ein guter Übergang: Theorie wird durch Interaktion verfestigt, danach Pause zum Setzen lassen.
- **Nachmittag (~3h Praxis + 45 min Wrap-up):** Block 5 als „Bridge"-Theorie + Live-Demo bekommt 45 min. Die Hands-on-Phase hat 2.5h netto — das ist realistisch für 4-5 Übungen pro Teilnehmer, nicht zwingend alle 6.
- **Wrap-up bewusst 45 min:** Diskussion + Sammeln der Erkenntnisse + ggf. Verlängerung bei lebhafter Runde.

**Alternative:** Als Mermaid-Timeline visualisieren — macht die Zeitanteile sichtbarer und den Tagesablauf auf einen Blick lesbar.

---

# slides.md (Titelfolie)

## OpenSpec Workshop / Spec-driven development mit KI-Unterstützung
### Regel C (generischer Titel)
Der aktuelle Titel sagt nicht, warum man in diesem Workshop sitzen sollte. „Spec-driven development mit KI-Unterstützung" ist eine Kategorisierung, kein Versprechen.
### Lösungsvorschlag
Titel auf **„OpenSpec — Specs, die mit dem Code leben"** ändern, Untertitel **„Spec-driven Workflow für KI-gestützte Entwicklung"**. Greift den Brownfield- und Repo-Aspekt direkt auf.

---

# 01-what-why.md

## Section-Titel: „Warum Spec-driven? Warum jetzt?"
### Regel D (Marketing)
Das doppelte „Warum?" ist klassische Konferenz-Keynote-Rhetorik. Der „Warum jetzt?"-Teil suggeriert künstliche Dringlichkeit — passt zum Pitch-Stil, den auch die einzelnen Slides des Kapitels haben, aber nicht zu einem Workshop.
### Lösungsvorschlag
Auf **„Was ist Spec-driven Development und wozu?"** ändern. Deckt beides ab, was das Kapitel tatsächlich macht (was ist es + warum), ohne künstliche Dringlichkeit.

## Header-Pattern „Eigenschaft 1/2/3: …"
### Regel C (Lehrbuch-Sprache)
„Eigenschaft" klingt nach Lehrbuch, nicht nach Vortrag. Außerdem verstecken die Header die eigentliche Aussage hinter dem Präfix.
### Lösungsvorschlag
Präfix komplett weglassen und als plakative Aussage formulieren:
- „Eigenschaft 1: Die Spec lebt im Repo" → **„Specs im Repo, nicht im Wiki"**
- „Eigenschaft 2: Wächst mit der Codebase" → **„Wächst mit dem Code"**
- „Eigenschaft 3: Tool-agnostic" → **„Nicht an ein Tool gebunden"**

Optional in der Ecke ein kleiner Counter `1/3`, `2/3`, `3/3` zur Wiedererkennung der Reihe.

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
Titel zu „Ablauf" ändern.

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

## Section-Titel: „Moment 1: CLI als Datei-Navigator"
### Regel C (unmenschliche Formulierung)
„Moment" passt nicht; klingt wie eine schief gegangene Übersetzung aus dem Englischen.
### Lösungsvorschlag
Präfix komplett weglassen: **„Die CLI als Datei-Navigator"**. Lässt den Inhalt sprechen, kein künstlicher Nummerierungs-Overhead.

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

## Section-Titel: „Moment 2: CLI als Agent-Bridge"
### Regel C (unmenschliche Formulierung)
Wie in 04: „Moment" wirkt wie eine Fehlübersetzung.
### Lösungsvorschlag
Präfix weglassen: **„Die CLI als Agent-Bridge"**.

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
