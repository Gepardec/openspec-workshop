---
layout: section
---

# Häufige Fragen

---
layout: agenda
---

# Was wollt ihr wissen?

- Neues Projekt
- Bestandsprojekt
- Monorepo
- Mehrere Repos
- Refactoring
- Merge-Konflikte
- Welches Modell?
- Specs auf Deutsch?
- Eigener Prozess

<div class="mt-6">
  <Countdown :minutes="15" />
</div>

<!--
Die Gruppe wählt per Nummer, was drankommt — der Rest steht im Repo zum
Nachlesen. Richtwert: 15 Minuten für den ganzen Block.

Jede Antwort hat eine eigene Folie, in dieser Reihenfolge:
1–4 Einführen, 5–7 Arbeiten, 8–9 Anpassen.
-->

---
layout: default
---

# Neues Projekt — wie anfangen?

Erst `config.yaml` füllen, dann Change für Change durch den Loop.

- `context`: Ziel, Tech-Stack, Konventionen — bevor der erste Change entsteht
- Zwei Wege: alle Changes vorab ausformulieren und nacheinander anwenden — oder jeden Change einzeln durch den ganzen Loop
- **Meine Empfehlung:** einzeln. Was der erste Change lehrt, ändert sonst Specs, die schon geschrieben sind — und es ist weniger auf einmal zu lesen.

<!--
Der Loop: explore (optional), propose, Review, apply, verify (optional),
archive. Danach der nächste Change auf dem neuen Stand der Specs.

Wer alles vorab ausformuliert, reviewt Specs gegen einen Code, den es noch
nicht gibt. Jede Überraschung beim Bauen wird dann zu Updates in mehreren
Changes.
-->

---
layout: default
---

# Bestand — erst alles spezifizieren?

**Nein** — davon rät OpenSpec ausdrücklich ab.

> Du dokumentierst nicht deine ganze Codebasis, um anzufangen. Du schreibst Specs nur für das, was du gerade ändern willst. […] Dein erster Change dokumentiert den Teil, den er berührt, der nächste seinen — und über Monate füllen sich die Specs ganz natürlich rund um die Arbeit, die du tatsächlich machst.

Der erste Change legt die Spec für genau diesen Teil an. Um den Rest kümmerst du dich vorerst nicht.

<!--
Zitat übersetzt aus docs/existing-projects.md, „Using OpenSpec in an Existing
Project". Im Original: „You'd hate that, and so would we."

Specs für Code, den man gerade nicht ändert, veralten: nichts zwingt sie,
mit dem Code Schritt zu halten.

Vorhandene Anforderungsdokumente (PRD, Pflichtenheft) nicht importieren, sondern
beim jeweiligen Change als Material in explore geben.
-->

---
layout: default
---

# Monorepo — wo aufsetzen?

Im Root — ein `openspec/` für das ganze Repo, Specs nach Domäne oder Modul gegliedert.

```text
openspec/specs/
├── billing/
│   ├── invoice-create/spec.md
│   └── invoice-export/spec.md
└── shop/
    └── cart/spec.md
```

Der Capability-Pfad ist dann `billing/invoice-create` — so steht er auch im Proposal.

<!--
Durchgespielt mit OpenSpec 1.13.0: ein Delta unter
specs/billing/invoice-create/spec.md validiert, archiviert und erscheint in
openspec list --specs als billing/invoice-create.

Domänen erst anlegen, wenn der erste Change dort sie braucht — die Taxonomie
muss nicht vorab stehen.
-->

---
layout: default
---

# Mehrere Repos — geht das?

Ja. Jedes Repo hat sein eigenes `openspec/` — das bleibt der Normalfall.

- Betrifft ein Change nur einen Service, lebt er im Repo dieses Service
- Plant ihr über Repos hinweg — ein Feature, drei Services —, gibt es **Stores**: die Planung liegt in einem eigenen Repo, auf das Code-Repos verweisen
- Stores sind noch nicht stable: Befehle und Dateiformate können sich zwischen Releases ändern. Darum zeigen wir sie heute nicht.

<!--
Quelle: docs/stores-beta/user-guide.md, docs/team-workflow.md „When planning
outgrows one repo". Der Guide nennt sich selbst Beta.
-->

---
layout: default
---

# Refactoring — auch mit OpenSpec?

Ja — der Change bekommt `skip_specs: true`.

```yaml
# openspec/changes/<change>/.openspec.yaml
schema: spec-driven
created: 2026-09-16
skip_specs: true      # ← ergänzen
```

- Ändert sich kein Verhalten, ändert sich keine Spec — ohne das Flag lehnt `validate` einen Change ohne Deltas ab
- Proposal, Design und Tasks bleiben: das Warum landet trotzdem im Archiv

<!--
Mit dem Flag zeigt openspec status specs als „skipped".

Das Schema sagt ausdrücklich: keine Requirement erfinden, nur um validate
zufriedenzustellen.
-->

---
layout: default
---

# Merge-Konflikte in Specs?

Beide Fassungen an ein LLM geben, zusammenführen lassen, Ergebnis übernehmen.

1. git meldet den Konflikt in `openspec/specs/<capability>/spec.md`
2. Die beiden Delta-Requirements aus `changes/archive/` an ein LLM geben: „Führe beide Änderungen zusammen.“
3. Ergebnis in die Haupt-Spec übernehmen, dann `openspec validate --all --strict`

Hängen beide Changes nur ein neues Requirement an, bleiben meist einfach beide.

<!--
Mit unserer Konvention — archivieren vor dem Merge — taucht der Konflikt beim
zweiten Merge als normaler git-Konflikt auf. Siehe Team-Kapitel.

Durchgespielt: zwei ADDED an derselben Spec kollidieren nur textuell (beide
hängen ans Ende an). Zwei MODIFIED am selben Requirement widersprechen sich
inhaltlich — dort lohnt das LLM.

Upstream: den Konflikt lösen wie jeden anderen und die Fassung behalten, die
der Realität entspricht.
-->

---
layout: default
---

# Welches Modell wofür?

Meine Erfahrung: stark denken, wo entschieden wird — schnell, wo umgesetzt wird.

| Aufgabe | Modell |
|---|---|
| `explore` · `propose` · `verify` | hohes Reasoning, höherwertiges Modell |
| `apply` | schnelles Modell, wenig Reasoning |

Das trägt nur, wenn der Plan stimmt: Tasks mit Verifikation, Tests und Linter als Netz.

<!--
Das ist eine persönliche Empfehlung. Die Upstream-FAQ empfiehlt
High-Reasoning-Modelle für Planung UND Umsetzung — die vorsichtigere Variante.

Unabhängig vom Modell: vor apply eine neue Session, sauberes Kontextfenster.
-->

---
layout: default
---

# Specs auf Deutsch?

Ja — eine Anweisung in `context` reicht.

```yaml
# openspec/config.yaml
context: |
  Sprache: Deutsch
  Alle Artefakte müssen auf Deutsch verfasst werden.
  Keep OpenSpec structural headings and SHALL/MUST keywords in English.
```

- Neues Projekt: `openspec init --language Deutsch` schreibt diese Anweisung selbst — auf Englisch
- Die letzte Zeile nicht weglassen: `validate --strict` braucht englische Überschriften und SHALL/MUST

<!--
Die letzte Zeile schreibt openspec init --language wörtlich so. Ohne sie
schreibt der Agent womöglich „SOLL" — das fällt bei --strict durch.

--language ändert keine bestehende config.yaml, es bricht dann mit einem
Hinweis ab. Im bestehenden Projekt: context von Hand ergänzen.
-->

---
layout: default
---

# Eigener Prozess im Team?

Ja — das Standard-Schema forken, erweitern und eintragen.

```sh
openspec schema fork spec-driven my-workflow
# openspec/schemas/my-workflow/: Template ergänzen, Artefakt in schema.yaml eintragen
openspec schema validate my-workflow
```

```yaml
# openspec/config.yaml
schema: my-workflow
```

Die Schema-Befehle sind als experimental markiert. Reicht eine zusätzliche Regel, genügt `rules` in `config.yaml`.

<!--
Durchgespielt mit OpenSpec 1.13.0: ein zusätzliches Artefakt „adr" mit
Template und requires: [design], tasks hängt zusätzlich von adr ab.
schema validate meldet es als gültig, openspec status zeigt es in der
Reihenfolge, openspec instructions adr liefert instruction und template.

Weil die Skills Artefakte und Reihenfolge aus openspec status lesen, kommt ein
neues Artefakt ohne Änderung an den Skills im Ablauf an.

Community-Schemas in docs/customization.md zeigen, was möglich ist — z. B.
eines mit eigenem Review-Schritt vor den Tasks.
-->
