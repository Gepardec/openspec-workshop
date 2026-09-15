# Migration auf `@gepardec/slidev-theme-gepardec` – Plan

Stand: 15.09.2026. Grundlage ist ein PNG-Export aller 67 Folien mit dem npm-Theme 2.1.0
(unverändertes Deck). Folien-Nummern unten sind Deck-Reihenfolge, wie Slidev sie zählt.

## 1. Bereits erledigt (uncommitted im Working Tree)

| Schritt | Ergebnis |
|---|---|
| Lokales Theme `slides/gepardec-slidev/` entfernt | `git rm`, 20 Dateien |
| `slides.md` → `theme: '@gepardec/slidev-theme-gepardec'` | Theme 2.1.0 (heute veröffentlicht) |
| `@slidev/cli` 52.15.2 → 52.19.1, `vue` 3.5.34 → 3.5.42 | `pnpm update --latest`, `pnpm outdated` leer |
| `@slidev/theme-default`, `@slidev/theme-seriph` entfernt | waren nirgends referenziert |
| `playwright-chromium` als devDependency | `pnpm export` / PNG-Export funktioniert damit |
| `pnpm-workspace.yaml`: `allowBuilds` + `minimumReleaseAgeExclude` | siehe Hinweis |
| `pnpm build` grün, Export aller Folien grün | |

Hinweis pnpm 12: neu veröffentlichte Versionen werden standardmäßig eine Weile zurückgehalten
(`minimumReleaseAge`). Ohne die Ausnahme für das Theme löst `pnpm add` auf 2.0.0 auf statt 2.1.0.
Die Ausnahme bleibt sinnvoll, weil das Theme im Haus gepflegt wird und Fixes sofort ankommen sollen.

## 2. Befund: was das Theme mit dem Ist-Deck macht

Das Deck baut und läuft. Rund 30 der 67 Folien brauchen aber Hand:

| Kategorie | Folien | Ursache |
|---|---|---|
| A – Überlauf über Logo/unteren Rand | 15, 17, 20, 22, 24, 26, 27, 28, 36, 37, 38, 40, 47 (46 grenzwertig) | größere Body-Schrift (22 px) und größere Headline (55 px, uppercase); nichts skaliert mit |
| B – handgebaute HTML-Boxen mit Rahmen | 2, 4, 13, 14 | Theme-Regel: keine umrandeten Content-Boxen; Folie 13 fällt komplett auseinander |
| C – iframes in Browser-Standardgröße (300×150) | 16, 18, 32 | `w-full h-99` greift nicht; die Chat-Exports sind außerdem weißer Fremd-Look im schwarzen Deck |
| D – Inline-Code in Headlines | 22 Folien (15–26, 31, 32, 35, 38, 40, 42, 45–48, 52, 54) | wird zum großen Mono-Chip in Uppercase: `OPSX:EXPLORE`, `PROPOSAL.MD`, `OPENSPEC SHOW <CHANGE>` – der Befehl selbst ist aber lowercase |
| E – globaler `<style>`-Leak | 20, 22, 24, 26 | `.slidev-code code { white-space: pre-wrap }` ohne `scoped` wirkt auf jeden Codeblock im Deck |
| F – Mermaid in Fremdfarben | 17, 53, 54 | hartkodiertes Blau/Slate aus dem alten Deck |
| G – Deck endet ohne Abschlussfolie | 67 | Skill: mit `contact` (oder `statement`) schließen |
| H – Cover | 1 | Name und Datum in einem Absatz; Datum 18.06.2026 liegt in der Vergangenheit |

## 3. Globale Regeln für den Umbau

Aus dem Skill `gepardec-slidev-authoring` bzw. dem Theme-Vertrag abgeleitet. Sie gelten für jede Folie unten.

1. **Headline** ist die erste Überschrift im Markdown, kein Frontmatter-`title`. Kein Inline-Code in Headlines.
   Ziel: einzeilig, das sind bei 55 px Uppercase etwa 30–32 Zeichen. Zweizeilig nur, wenn der Body kurz ist.
2. **Budget:** fünf Bullets komfortabel, acht Limit. Was nicht passt, wird gesplittet oder in ein Zwei-Spalten-Layout gelegt.
   `class: gepardec-text-sm` nur dort, wo eine Folie wirklich dicht sein muss (unten markiert). `gepardec-text-lg` für die dünnen Übungsfolien.
3. **Keine Boxen.** Trennung über `//`-Listen, `two-cols-header`, `quadrants` oder Blockquote (gelber Balken links).
4. **`<span v-click>`** für Schlusssätze wird zu einem `<v-click>`-Block mit Blockquote. Der Span ist inline und bekommt keine Absatz-Typografie.
5. **Codeblock-Wrap** für die Artefakt-Snippets: eine Regel `.wrap-code .slidev-code code { white-space: pre-wrap }` in `slides/style.css`
   (offizieller Slidev-Hook), aktiviert per `class: wrap-code` im Frontmatter der vier Folien. Die `<style>`-Blöcke fliegen raus.
6. **Mermaid** bekommt Brand-Farben zentral in `slides/setup/mermaid.ts` (`defineMermaidSetup`, `theme: 'base'`, `themeVariables`
   mit Schwarz/Gelb/Weiß). Die `style`-Zeilen in den Diagrammen entfallen.
7. **Timer-Komponenten** (`Countdown`, `Stopwatch`) bleiben – es gibt kein Theme-Pendant. Die grauen, abgerundeten Buttons werden
   auf Brand-Look gebracht (gelbe Outline, kein Grau-Wash). Optional, kleiner Eingriff.
8. **Verifikation** nach jedem Block: `pnpm exec slidev export slides.md --format png` und auf Überlauf sichten.
   Sobald `conversation`-Folien drin sind, für PDF `--with-clicks`.

## 4. Gegenüberstellung: aktuelles Layout → Ziel-Layout

Legende: ✓ bleibt · ✎ anpassen (Text/Frontmatter) · ⟲ umbauen (anderes Layout oder Struktur) · ＋ neue Folie

### `slides.md` und `00-warmup.md`

| # | Folie | Ist | Ziel | Maßnahme | |
|---|---|---|---|---|---|
| 1 | Cover | `cover` (implizit) | `cover` | Titel kürzen auf: `# Spec-driven Development mit OpenSpec`. `Oliver Tod` und `Wien, dd.MM.yyyy` als zwei Absätze → Name/Datum-Block. Datum aktualisieren. | ✎ |
| 2 | Warm-Up | `default` + HTML-Fragen-Boxen + `<style>` + Countdown | `default` | Vier Fragen als nummerierte Liste (Ziffern gelb) ohne `<v-clicks>`; Boxen und Style raus; Lead-Zeile bleibt; Countdown darunter bleibt. | ⟲ |
| 3 | Runde · Warm-Up | `default` + Stopwatch | `default` | Bleibt. Optional `gepardec-text-lg`. | ✓ |
| 4 | Agenda | `default` + HTML-Grid (Zeiten, Pausen, Durchgestrichen) | `agenda` | Sieben Einträge = die sieben Blöcke des Tages (Warm-Up-Zeile entfällt, sie ist beim Zeigen vorbei). Ab sieben Einträgen zweispaltig (1–6 links, 7 rechts), daher kurze Einträge ohne Uhrzeit. Zeiten weg, Pausen nur in Speaker Notes nach max. 1,5 Stunden | ⟲ |

### `01-what-why.md`

| # | Folie | Ist | Ziel | Maßnahme | |
|---|---|---|---|---|---|
| 5 | Section | `section` | `section` | Bleibt. Optional im Deck abwechselnd `variant: ascii`. | ✓ |
| 6 | Wo es heute hakt | `default`, 4 Bullets | `default` | Bleibt. | ✓ |
| 7 | Was ist OpenSpec? | `default`, Lead + 5 Bullets | `default` | Bleibt. | ✓ |
| 8 | Guardrails statt Vibe-Coding | `default` + `<span v-click>` | `two-cols-header` | Schlusssatz streichen. Mit/Ohne Spec gegenüberstellen. Andere Seite sinnvoll ergänzen. Bei Unsicherheit: TBD einfügen | ✎ |
| 9 | Specs im Repo, nicht im Wiki | `default` + `<span v-click>` | `default` | Schlusssatz streichen. | ✎ |
| 10 | Wächst mit dem Code | `default` + `<span v-click>` | `default` | Schlusssatz als Blockquote ohne `<v-click>`. | ✎ |
| 11 | Nicht an ein Tool gebunden | `default` | `default` | Bleibt. | ✓ |

### `02-phases-documents.md`

| # | Folie | Ist | Ziel | Maßnahme | |
|---|---|---|---|---|---|
| 12 | Section | `section` | `section` | Bleibt. | ✓ |
| 13 | Ablauf | `default` + Flex-Boxen mit Rahmen + Pfeile (bricht komplett) | `default` | Inspiration aus /Users/olivertod/dev/repos/openspec-keynote-mega/slides/04-handwerk.md holen| ⟲ |
| 14 | Szenario: Abrechnungsmonat | `default` + zwei Boxen (blau/grün) | `two-cols-header` | Headline `Szenario: Abrechnungsmonat`, Lead im Header-Slot, `::left::` `### Mitarbeiter` + Text, `::right::` `### Projektleiter` + Text, `::bottom::` „Wir begleiten diesen Change von explore bis archive“. | ⟲ |
| 15 | opsx:explore – der Pionier | `default`, überläuft | `two-cols-header` | Headline ohne Chip. `::left::` `### Wann lohnt es sich?` + 4 Bullets, `::right::` `### Was passiert dabei?` + Absatz + Loop-Zeile (in `<v-click>`), `::bottom::` „Wann überspringen? …“. | ⟲ |
| 16 | opsx:explore – Praxisbeispiel | `default` + iframe `chats/explore.html` | `conversation` | 12 Nachrichten (5 User, 7 Agent) → 6–10 `<ChatTurn>`; `session: explore · mega-backend`. Quelle und Vorgehen: aus HTML umwandeln. Nur dann kürzen, wenn es sinnvoll ist! | ⟲ |
| 17 | opsx:propose – alle vier Artefakte | `default` + Mermaid TD (Schlusssatz fällt raus) | `default` | Headline `opsx:propose` einzeilig, Untertitel in die Lead-Zeile. Mermaid `LR` statt `TD` (spart Höhe), Brand-Farben zentral. | ✎ |
| 18 | opsx:propose – Praxisbeispiel | iframe `chats/propose.html` | `conversation` | 28 Nachrichten (1 User, 27 Agent, 18 Tools) → redaktionell ~8 Turns: Auftrag, `instructions`-Aufrufe, die vier Artefakte entstehen, Abschluss. | ⟲ |
| 19 | proposal.md – Das WARUM | `default`, 4 Bullets | `default` | Headline ohne Chip. | ✎ |
| 20 | proposal.md – Praxisbeispiel | `default` + `<<<` Snippet `maxHeight 400` + globaler `<style>` | `default` | Headline ohne Chip, `maxHeight` ≈ 330 px, `class: wrap-code`, `<style>` raus. | ✎ |
| 21 | spec.md – Das WAS | `default`, 5 Bullets | `default` | Headline ohne Chip. | ✎ |
| 22 | spec.md – Praxisbeispiel | `default` + Grid mit zwei Snippets | `two-cols-header` | `::left::`/`::right::` je Dateipfad als `####` + Snippet (`maxHeight` ≈ 300 px), `class: wrap-code gepardec-text-sm`. | ⟲ |
| 23 | design.md – Das WIE | `default`, 5 Bullets | `default` | Headline ohne Chip. | ✎ |
| 24 | design.md – Praxisbeispiel | wie 20 | `default` | wie 20 | ✎ |
| 25 | tasks.md – Die TODO-Liste | `default`, 4 Bullets | `default` | Headline ohne Chip. | ✎ |
| 26 | tasks.md – Praxisbeispiel | wie 20 | `default` | wie 20 | ✎ |
| 27 | Delta-Specs | `default`, 12-Zeilen-Code + 4 Bullets, überläuft | `two-cols-header` | Headline `Delta-Specs`, Lead im Header. `::left::` Codebeispiel, `::right::` die 4 Bullets, `class: gepardec-text-sm`. | ⟲ |
| 28 | Review-Time | `default`, ol + 3 Spans, überläuft | `two-cols-header` | `::left::` Lesereihenfolge (ol), `::right::` die drei Sätze als `<v-clicks>`-Absätze, der letzte fett. | ⟲ |
| 29 | Worauf achte ich beim Review? | `default`, 5 Bullets | `default` | Bleibt. | ✓ |
| 30 | Nach propose: apply und archive | `default`, dünn | `default` | `class: gepardec-text-lg`. | ✎ |
| 31 | opsx:apply – Praxisbeispiel | `default` + `<img max-h-99>` (unten abgeschnitten) | `default` | Headline ohne Chip, Bildhöhe auf ~340 px (`max-h-85`), `object-contain`. | ✎ |
| 32 | opsx:archive – Praxisbeispiel | iframe `chats/archive.html` | `conversation` | 26 Nachrichten (1 User, 25 Agent, 16 Tools) → ~8 Turns. | ⟲ |
| 33 | Best practices | `default`, 4 lange Bullets | `default` | Bleibt (passt gerade). Alternative: `quadrants`, wenn klare Header definiert werden können. | ✓ |

### `03-setup-config.md`

| # | Folie | Ist | Ziel | Maßnahme | |
|---|---|---|---|---|---|
| 34 | Section | `section` + Absatz | `section` | Zweiten Absatz streichen | ✓ |
| 35 | openspec init | `default` | `default` | Headline ohne Chip. | ✎ |
| 36 | Was wird angelegt? | `default` + magic-move (14 Zeilen) + 3 Captions, überläuft | `default` | Lead-Zeile streichen (Inhalt geht in Caption 1 auf), Captions in `<div class="gepardec-text-sm">`. Nach Umbau Export prüfen. | ✎ |
| 37 | Tipp: CLAUDE.md / AGENTS.md | `default`, zweizeilige Headline, überläuft | `default` | Headline einzeilig: `CLAUDE.md zeigt auf OpenSpec`. Rest passt dann. | ✎ |
| 38 | config.yaml – die eine Datei | `default`, grenzwertig | `default` | Headline `config.yaml` einzeilig ohne Chip, Rest in die Lead-Zeile. | ✎ |
| 39 | CLI vs. Slash-Command | `default` | `default` | Die zwei Definitionszeilen sind ein Absatz geworden → zwei Bullets. Headline kürzen. | ✎ |
| 40 | Ausnahme: archive braucht keinen Agenten | `default`, zweiter Codeblock + Issue-Link fallen raus | 2 × `default` | Split: 40a `archive braucht keinen Agenten` (Befehl + was er tut), 40b `Das Problem: opsx:archive per LLM` (Skill-Auszug + Issue #863). | ⟲ |
| 41 | Faustregel: Skills rufen die CLI auf | `default`, zweizeilige Headline | `default` | Headline `Faustregel`, Satz als Lead-Zeile, gut/schlecht-Block bleibt. | ✎ |
| 42 | openspec validate | `default` | `default` | Headline `openspec validate` ohne Chip. | ✎ |
| 43 | Profile: core vs. expanded | `default` + Tabelle | `default` | Bleibt; Tabelle ist Theme-gestylt. | ✓ |

### `04-cli-navigator.md`

| # | Folie | Ist | Ziel | Maßnahme | |
|---|---|---|---|---|---|
| 44 | Section | `section` | `section` | Bleibt. | ✓ |
| 45 | openspec list | `default` | `default` | Headline ohne Chip. | ✎ |
| 46 | openspec show | `default`, grenzwertig | `default` | Headline `openspec show` ohne Chip → einzeilig, Überlauf weg. | ✎ |
| 47 | openspec status | `default`, zweizeilig, überläuft | `default` | Headline `openspec status` ohne Chip → einzeilig, passt. | ✎ |
| 48 | openspec view | `default`, dünn | `default` | Headline ohne Chip, `gepardec-text-lg`. | ✎ |
| 49 | Hands-on: Quiz-Runde | `default` | `default` | Bleibt. | ✓ |

### `05-cli-agent-bridge.md`

| # | Folie | Ist | Ziel | Maßnahme | |
|---|---|---|---|---|---|
| 50 | Section | `section` | `section` | Bleibt. | ✓ |
| 51 | Die Lücke | `default`, dünn | `default` | `gepardec-text-lg`. | ✎ |
| 52 | openspec instructions | `default` | `default` | Headline ohne Chip. | ✎ |
| 53 | Was steckt in den Instructions? | `default` + Mermaid (Schlusssatz kollidiert mit Logo) | `default` | Brand-Farben zentral, Diagramm etwas kompakter (kürzere Labels), Schlusssatz bleibt. | ✎ |
| 54 | Der Agent-Loop | `default` + Mermaid | `default` | Headline `Der Agent-Loop` ohne Chip, Brand-Farben. | ✎ |
| 55 | Live-Demo | `default` | `default` | Bleibt. | ✓ |

### `06-hands-on.md`

| # | Folie | Ist | Ziel | Maßnahme | |
|---|---|---|---|---|---|
| 56 | Section | `section` | `section` | Bleibt. | ✓ |
| 57 | Empfehlungen/Best Practices | `default`, verschachtelt | `default` | Headline kürzen: `Best Practices für die Übungen`. | ✎ |
| 58–64 | Übung 1 … Übung 6 (7 Folien) | `default`, je 1–3 Zeilen | `default` | `class: gepardec-text-lg`; Pfad-Chip bleibt als Lead-Zeile. Headlines 60–64 zweizeilig, bei dem Body ok. | ✎ |

### `07-discussion.md`

| # | Folie | Ist | Ziel | Maßnahme | |
|---|---|---|---|---|---|
| 65 | Section | `section` | `section` | Bleibt. | ✓ |
| 66 | Reflexion | `default`, 4 Bullets | `default` | Bleibt. Die Notiz „Timer hinzufügen“ lässt sich mit `<Countdown>` wie auf Folie 2 einlösen. | ✓ |
| 67 | Fragen zum Nachdenken | `default`, 4 Bullets | `default` | Bleibt. | ✓ |
| 68 | *neu:* Kontakt | – | `contact` | `name: Oliver Tod`, `email: oliver.tod@gepardec.com`, `role`, `phone`, `photo: /contact.jpg`. Daten: TBDs einfügen. | ＋ |

### Layout-Bilanz nach der Migration

| Layout | Folien |
|---|---|
| `cover` | 1 |
| `section` | 7 |
| `agenda` | 1 |
| `default` | 48 |
| `two-cols-header` | 5 (14, 15, 22, 27, 28) |
| `conversation` | 3 (16, 18, 32) |
| `statement` | 1 (8a) |
| `contact` | 1 (68) |

`two-cols` und `quadrants` kommen nicht vor. `quadrants` war für Folie 14 der zweite Kandidat und verliert
nur, weil `two-cols-header` den Schlusssatz im `::bottom::` trägt.

## 6. Vorgehen nach dem Review

1. Globales: `style.css` (wrap-code), `setup/mermaid.ts`, Headlines ohne Inline-Code (Kategorie D), Spans → Blockquotes.
2. Umbauten ⟲: 2, 4, 13, 14, 15, 22, 27, 28, 40; danach `conversation` 16, 18, 32.
3. Neue Folien ＋: 8a, 68.
4. Feinschliff ✎ (Überlauf-Kandidaten zuerst: 17, 20, 24, 26, 36, 37, 38, 46, 47), Timer-Buttons.
5. Verifikation: PNG-Export aller Folien sichten, PDF mit `--with-clicks`. Dann Commit in zwei Schritten:
   `chore(slides): switch to @gepardec/slidev-theme-gepardec` und `feat(slides): migrate deck to theme layouts`.
