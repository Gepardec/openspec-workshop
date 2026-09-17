# P1 – Konzept: Angebotslücken im Deck schließen

**Ziel:** die vier Inhalte, die das Angebot verspricht und das Deck heute nicht liefert.
Kein Umbau des bestehenden Decks — drei additive Blöcke plus eine Textkorrektur an den Übungen.

| # | Block | Angebotsversprechen, das offen ist | Aufwand |
|---|---|---|---|
| A | Qualitätsnetz (neues Kapitel) | „Erzeugten Code reviewen — Analysetools und Tests als Qualitätsnetz" | groß |
| B | Sync (3 Slides in Kapitel 02) | „Änderungen in die Spezifikationen überführen (Sync & Archive)" | klein |
| C | Übungstexte | „einen Change eigenständig durch alle Phasen führen" | klein |
| D | Konventions-Übung | „Projektkonventionen manifestieren und automatisch einfließen lassen" | klein |

**Empfohlene Reihenfolge:** B → D → A → C.
B und D sind schnell und schließen je einen ganzen Bullet. A ist der größte Brocken.
C zuletzt, weil nur noch der Review- und Sync-Schritt in Übung 4 offen ist —
der hängt an A und B. Übung 5 und 6 sind bereits nachgezogen.

---

## Block A — Neues Kapitel „Qualitätsnetz"

**Platzierung:** neue Datei `slides/pages/06-quality-net.md`, eingehängt zwischen
`05-cli-agent-bridge` und dem Hands-on-Kapitel (`06-hands-on` → `07`, `07-discussion` → `08`).
Bewusst direkt vor den Hands-on-Teil: die Teilnehmer nehmen die Review-Checkliste
in die Nachmittagsübungen mit.

> **Teilweise vorgezogen (2026-09-17):** Kapitel 2 hat jetzt „Architekturvorgaben“,
> „Das Sicherheitsnetz“ (entspricht Slide 6, Konvention vs. Regel) und „Wo braucht es
> den Menschen?“. Beim Umsetzen dieses Blocks darauf aufbauen, nicht doppeln.

**Kernbotschaft:** Die Spec sagt dem Agenten, *was* zu bauen ist. Sie hindert ihn nicht
daran, es auf eine Art zu bauen, die dein Team nicht will. Dafür braucht es drei Netze,
und zwei davon prüfen ohne dich.

### Slide-Folge

1. **Section** — „Qualitätsnetz: was den Agenten auffängt"
2. **Die Spec ist keine Garantie** — drei Fehlertypen, die spec-konform durchrutschen:
   Inline-Komponente statt eigener Datei, `domain:animals` importiert aus `domain:staff`,
   hartkodierter deutscher String statt Transloco. Alle drei stehen als Konvention in
   `openspec/config.yaml` — und sind trotzdem möglich.
3. **Drei Netze** (`quadrants` oder `two-cols-header`) —
   *Tests* = ausführbare Akzeptanzkriterien · *statische Analyse* = nicht verhandelbare
   Konventionen · *Mensch* = alles, was keine Maschine prüfen kann (erfüllt der Diff das WARUM?)
4. **Vom Scenario zum Test** (`two-cols-header`) — der stärkste Slide des Blocks.
   Links ein WHEN/THEN-Scenario, rechts der RestAssured-Test, der es prüft.
   Material liegt fertig im Repo: `openspec/changes/archive/2026-06-01-us-04-update-animal/`
   (Tasks 2.1–2.3 decken 200 / 400 / 404 ab, dazu die passende `spec.md`).
5. **Warum RestAssured und keine Unit-Tests** — Begründung direkt aus `config.yaml`:
   pinnt den HTTP-Contract, ist vor der Implementierung schreibbar, überlebt Refactorings
   des Agenten, weil er nicht an Implementierungsdetails hängt.
6. **Konvention vs. Regel** — `config.yaml` senkt die Fehlerrate, ESLint/`angular-eslint`/
   Sheriff machen den Fehler unmöglich. Eine Konvention im Kontext ist eine Bitte,
   eine Lint-Regel ist ein Fehler. Beides brauchen, nicht eins statt des anderen.
7. **Code-Review-Checkliste** (Pendant zu „Worauf achte ich beim Review?") —
   - Hat der Agent Tests mitgeliefert oder nur so lange angepasst, bis sie grün waren?
   - Wurden Assertions **gelöscht**, statt den Code zu reparieren?
   - Deckt sich der Diff mit `tasks.md` — oder ist Code außerhalb des Change-Scopes dabei?
   - Wurde eine Konvention verletzt, die keine Lint-Regel abdeckt?
8. **Das Netz im Team: CI** — `openspec validate --all --strict` + Build + Lint als PR-Gate,
   Spec-Änderungen im PR-Diff mitreviewen. (Das ist der ursprüngliche P2-Punkt 13; er gehört
   inhaltlich hierher und nicht in ein eigenes Kapitel.)

### Übungsanbindung

Der Change in Übung 4 (`remove-animal-notes`) entfernt laut `tasks.md` 2.1/2.2 selbst
Test-Assertions — perfekter Aufhänger für Slide 7. Übung 4 bekommt einen expliziten
Review-Schritt (siehe Block C).

### Zu erledigen

- [ ] `slides/pages/06-quality-net.md` anlegen (Layouts des Gepardec-Themes verwenden)
- [ ] `slides/slides.md` — neue `src:`-Einbindung, Reihenfolge anpassen
- [ ] Agenda-Slide in `slides/pages/00-warmup.md` um den Punkt ergänzen
- [ ] Bestehende Dateien umbenennen (`06-hands-on` → `07-hands-on`, `07-discussion` → `08-discussion`)

---

## Block B — Sync bekommt eigene Slides

**Platzierung:** in `slides/pages/02-phases-documents.md`, direkt **nach** dem
Delta-Specs-Slide und **vor** dem `opsx:archive`-Praxisbeispiel. Dort ist der Begriff
gerade eingeführt, und das archive-Beispiel zeigt danach den Sync-Rückfrage-Turn —
der dann verstanden wird statt nur vorzukommen.

### Slide-Folge

1. **sync: aus Delta wird Wahrheit** — mechanisch: `changes/<c>/specs/*` → `openspec/specs/*`.
   ADDED wird angehängt, MODIFIED ersetzt, REMOVED entfernt. Danach ist `openspec/specs/`
   der neue abgenommene Stand.
2. **sync ≠ archive** — wann sync allein sinnvoll ist: ein langlaufender Change, dessen
   erster Teil schon gemerged ist; mehrere Changes am selben Capability; die Spec soll
   im PR-Review bereits den Zielzustand zeigen. Und: `archive` synct implizit — aber
   mit Rückfrage, nicht automatisch.
3. **Warum sync die gefährlichste Stelle ist** — Erfahrungsbericht: ein Sync-Subagent hat
   eine Requirement verworfen, die im Delta gar nicht erwähnt war. Merksatz für die Folie:
   *ein Delta sagt nur, was sich ändert — alles Nicht-Erwähnte muss unverändert überleben.*
   Daraus die Regel: nach jedem sync `git diff openspec/specs/` lesen, nicht nur das Ergebnis.

Slide 3 ist der Inhalt, der diesen Block über die Doku hinaushebt — er kommt aus einem
echten Vorfall und erklärt zugleich, warum OpenSpec vor dem Sync überhaupt nachfragt.

### Zu erledigen

- [ ] Drei Slides in `02-phases-documents.md` einfügen
- [ ] Speaker-Note am Phasen-Strip (`sync sieht nach nichts aus …`) auf die neuen Slides verweisen

---

## Block C — Übungstexte auf den tatsächlichen Ablauf ziehen

**Problem heute:** Übung 5 und 6 stellen apply/archive als optional dar. In der Durchführung
läuft Übung 6 aber jedes Mal vollständig von explore bis archive durch. Der Übungstext
untertreibt also, was geliefert wird — mit dem Effekt, dass Teilnehmer, die den Text ernst
nehmen, nach dem Proposal stehenbleiben.

**Es geht also nicht um eine Umverteilung der Phasen, sondern nur darum, die Texte
ehrlich zu machen.**

| Übung | Phasen | Status |
|---|---|---|
| 4 – Vorbereiteter Change | apply → **Review** → **sync** → archive | verpflichtend, vollständig |
| 4.b – Eigene Konvention (neu) | config.yaml → instructions → propose | verpflichtend, kurz |
| 5 – Proposal aus User Story | propose → apply → sync → archive | verpflichtend, vollständig |
| 6 – Unklare Anforderung | explore → propose → apply → sync → archive | verpflichtend, vollständig |

Übung 6 erfüllt damit das Angebotsversprechen wörtlich: *ein* Change von der Exploration
bis zur archivierten Spezifikation. Die offene Frage zur Angebotsformulierung entfällt —
Lernziel 4 bleibt unverändert.

Neu gegenüber heute ist in diesem Block nur der explizite **Review- und Sync-Schritt in
Übung 4** (hängt an Block A und B). Übung 5 und 6 ändern sich ausschließlich im Text.

**Puffer-Hinweis für die Durchführung:** wenn der Tag kippt, ist Übung 5 der Kandidat zum
Kürzen, nicht Übung 6 — Übung 5 ist der kleinere Change und deckt keine Phase exklusiv ab.
Das ist eine Entscheidung am Tag, nicht im Übungstext.

### Zu erledigen

- [x] `exercises/05_propose_change/README.md` — Bedingung entfernt, Loop bis archive
- [x] `exercises/06_explore_requirements/README.md` — Bedingung entfernt, Loop bis archive
- [x] Hands-on-Slides in `06-hands-on.md` nachgezogen
- [ ] `exercises/04_apply_change/README.md` um Review- und Sync-Schritt erweitern
      (nach Block A und B umsetzen)

---

## Block D — Übung 4.b: eigene Konvention verankern

**Warum:** Das Versprechen „Projektkonventionen manifestieren und automatisch in jeden
Change einfließen lassen" steht zweimal im Angebot und hat heute einen Slide und keine Übung.
Der Beweis dauert 15 Minuten.

**Platzierung:** neue Übung `exercises/04b_project_conventions/`, direkt vor Übung 5 —
damit die eigene Regel in Übung 5 messbar wirkt.

**Ablauf:**
1. Eine Regel in `openspec/config.yaml` ergänzen, z.B.
   *„Jede neue Listenansicht spezifiziert einen Empty State."*
   (Bewusst inhaltlich statt formal — der Effekt ist in der `spec.md` sofort sichtbar.)
2. `openspec instructions specs --change <change>` ausführen und die eigene Regel im
   Prompt wiederfinden. **Das ist der didaktische Kern:** die Teilnehmer *sehen*, warum
   die Konvention wirkt, statt es geglaubt zu bekommen — und es schlägt die Brücke
   zurück zu Kapitel 05.
3. Proposal erzeugen und prüfen, ob das zusätzliche Scenario tatsächlich auftaucht.

**Begleitend:** der `config.yaml`-Slide in `03-setup-config.md` behandelt `rules` heute als
Einzeiler. Ein eigener Slide dazu (Regeln pro Artefakt-Typ, Beispiel Rollback-Abschnitt im
Proposal) macht die Übung anschlussfähig.

### Zu erledigen

- [ ] `exercises/04b_project_conventions/README.md` anlegen
- [ ] Hands-on-Slide für Übung 4.b
- [ ] `rules`-Slide in `03-setup-config.md`

---

## Zeitbudget

P1 fügt netto **60–75 Minuten** hinzu (Block A ≈ 30–40 min, Block B ≈ 10–15 min,
Block D ≈ 20 min inkl. Übung). Der Tag ist heute schon voll — Gegenfinanzierung:

- **Warm-up straffen:** Runde von 90 auf 60 Sekunden pro Person (−8 min)
- **Übung 3.b als Live-Demo statt Übung** — das gemeinsame agentische Archivieren inkl.
  `git reset --hard` kostet bei zehn Leuten mehr Zeit, als es lehrt (−15 min)
- **kein Spielraum bei den Übungen** — Übung 5 und 6 laufen beide vollständig durch;
  hier zu kürzen hieße, eine Phase hands-on zu verlieren

Damit sind rund 23 Minuten gegenfinanziert — der Rest muss aus Block A selbst kommen:
ein Teil der Review-Checkliste lässt sich in die Besprechung von Übung 4 verlegen,
statt ihn vorab zu dozieren. Ein echter Zeitplan entsteht erst beim Dry-Run auf der
Schulungsumgebung (siehe `docs/TODO-P0.md`); erst danach lässt sich entscheiden, ob
zusätzlich noch Inhalte in den Anhang wandern müssen.

---

## Umsetzungshinweise

- Neue Slides mit den Layouts des Gepardec-Themes bauen (`section`, `default`,
  `two-cols-header`, `quadrants`) — nicht mit eigenem Markup.
- Für Code-/Tree-Zustandswechsel `shiki-magic-move` statt verketteter `v-click`.
  Slide A4 (Scenario ↔ Test) ist bewusst ein Nebeneinander-Vergleich, kein magic-move.
- `conversation`-Slides beim Export `--with-clicks` nicht vergessen.
- Nach den Slide-Umbenennungen `slides.md` und den Agenda-Slide gegenprüfen.
