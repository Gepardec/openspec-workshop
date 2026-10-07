---
layout: section
variant: ascii
---

# Hands-on Übungen

<!--
Frage-Pause, bevor alle selbst loslegen: Was ist noch offen?
Dann wirklich warten – rund zehn Sekunden Stille aushalten.
-->

---
layout: default
---

# Best Practices für die Übungen

- In Codex ruft ihr die Skills mit `$` auf: `$openspec-propose` statt `/opsx:propose`
- Nach jeder Übung committen – so kommt ihr jederzeit zum vorherigen Stand zurück
- Generell mindestens je ein Commit nach ...
  - ... dem Proposal – `feat: propose change "<change-name>"`
  - ... dem Anwenden – `feat: apply change "<change-name>"`
  - ... dem Archivieren des Changes – `feat: archive change "<change-name>"`
- Change final? → alles zwischen _"propose change"_ und _"archive change"_ squashen

<!--
Codex kennt keine Slash-Commands. openspec init legt für Codex nur Skills in
.agents/skills/ an, Codex ruft sie mit $<skill-name> auf. Die Zuordnung:
/opsx:explore → $openspec-explore, /opsx:propose → $openspec-propose,
/opsx:apply → $openspec-apply-change, /opsx:update → $openspec-update-change.

Dieselben drei Commits wie im Team-Kapitel: archivieren nach dem Review,
vor dem Merge.
-->

---
layout: default
class: gepardec-text-lg
---

# Übung 1 – OpenSpec selbst aufsetzen

`exercises/01_init_openspec/README.md`

Setup, CLI-Installation und `openspec init` – ihr seht, was OpenSpec aus einem leeren Repo macht.

<!--
Wir arbeiten heute mit Codex. Bei openspec init deshalb mindestens Codex
auswählen – sonst fehlen die Skills in .agents/skills/. Wer Claude Code oder
Copilot dazunimmt, bekommt exakt den Stand von vorher.
-->

---
layout: default
class: gepardec-text-lg
---

# Übung 2 – Workshop-Setup übernehmen

`exercises/02_setup_openspec/README.md`

Kopiert das vorkonfigurierte `openspec/`-Verzeichnis in euer Repo-Root. Ab jetzt arbeitet ihr auf dem vollständigen Workshop-Stand – inkl. aller Changes und Specs.

<!--
Kopierbefehl ohne Slash am Quellpfad: cp -R exercises/02_setup_openspec/openspec .
Mit Slash kopiert macOS (BSD cp) nur den Inhalt ins Repo-Root.
-->

---
layout: default
class: gepardec-text-lg
---

# Übung 3 – Change archivieren

`exercises/03_archive_change/README.md`

Der Change `us-06-dashboard` ist fertig implementiert. Archiviert ihn mit OpenSpec – und schaut euch an, was danach in `openspec/` anders ist.

Was fällt euch sonst noch auf?

<!--
Archivieren mit openspec archive, nicht mit /opsx:archive (Kapitel 4).

Erwartete Beobachtungen: Die CLI zeigt vor dem Bestätigen, welche Specs sie
anlegt (dashboard: create). Danach gibt es specs/dashboard/spec.md – mit dem
## Purpose aus der Delta-Spec, nicht mit einem TBD-Platzhalter. Der Change
liegt mit dem heutigen Datum unter changes/archive/, die anderen fünf tragen
ihr eigenes Archivdatum.
-->

---
layout: default
class: gepardec-text-lg
---

# Übung 4 – Vorbereiteten Change anwenden

`exercises/04_apply_change/README.md`

Ein fertig ausformulierter Change liegt bereit. Kopiert ihn ins `openspec/changes/`-Verzeichnis, wendet ihn an und archiviert ihn.

<!--
Richtwert: 30 Minuten.

Erwartete Beobachtungen: openspec status zeigt alle Artefakte erledigt,
openspec list den Change mit 0/14 Tasks. Codex hakt die Tasks in tasks.md
der Reihe nach ab. Danach ist das Feld „Notizen“ aus Anlegen, Bearbeiten
und Profil verschwunden. archive meldet drei Specs mit je „~ 2 modified“:
Das Entfernen eines Felds ist ein MODIFIED, kein REMOVED – die Requirement
bleibt, nur ihr Inhalt ändert sich.

Stolpersteine:
- cp vergessen oder in den falschen Ordner: openspec list zeigt dann nichts.
- /opsx:apply statt $openspec-apply-change getippt: Codex kennt den Befehl nicht.
- Archivieren vor dem Apply: archive warnt „14 incomplete task(s)“ und fragt
  nach. Nicht bestätigen.
- Tests rot wegen notes in DashboardResourceTest: Task 2.3 übersprungen.

Referenzlösung: Branch workshop/solution, Commits zu „remove-animal-notes“.
-->

---
layout: default
class: gepardec-text-lg
---

# Übung 5 – Proposal aus einer User Story

`exercises/05_propose_change/README.md`

Eine User Story liegt bereit. Erstellt daraus mit `$openspec-propose` einen vollständigen Change – Proposal, Specs, Design, Tasks – und bringt ihn danach bis ins Archiv.

<!--
Richtwert: 45 Minuten.

Erwartete Beobachtungen: Codex legt den Change mit openspec new change an
und schreibt die Artefakte in Build-Reihenfolge. Die Filterung bleibt
clientseitig. Der Change ergänzt die bestehende Spec animal-list um eine
Requirement (ADDED), eine neue Capability entsteht nicht. In der Referenzlösung sind es sechs Tasks.

Stolpersteine:
- User Story nicht mitgegeben: Codex rät die Anforderung. Pfad
  exercises/05_propose_change/USER_STORY.md im Prompt nennen.
- Artefakte nicht gelesen, direkt apply: Das Plan-Review ist der Kern der
  Übung. Nachfragen, wer das Design gelesen hat.
- validate --strict schlägt fehl: meist fehlendes Scenario oder kein
  SHALL/MUST. Codex die Meldung zurückgeben, nicht selbst editieren.

Referenzlösung: Branch workshop/solution, Commits zu
„filter-animals-by-species“.
-->

---
layout: default
class: gepardec-text-lg
---

# Übung 6 – Unklare Anforderung erkunden

`exercises/06_explore_requirements/README.md`

Eine vage Anforderung liegt bereit. Schärft sie in einer Exploration – und erstellt am Ende ein Proposal.

Lasst euch nach der Explore-Phase einen Click-Dummy erzeugen (Tipp: Skill `frontend-design`).

Danach der vollständige Loop: propose, apply, archive.

<!--
Richtwert: 60 Minuten, davon gut ein Drittel Explore.

Erwartete Beobachtungen: Codex stellt Rückfragen statt loszuschreiben.
Die zentrale Entscheidung: Bleibt das Gehege ein Freitext-Attribut am Tier,
oder wird es eine eigene Entität? Die Referenzlösung bleibt beim Freitext –
neue Seite /enclosures, neuer Endpoint GET /enclosures, eine neue Capability
enclosure-overview, keine geänderten Specs.

Kein eigener sync-Schritt: openspec archive mergt die Delta-Specs selbst,
wie in Übung 3.

Stolpersteine:
- Explore übersprungen, direkt propose: Dann trifft Codex die Entscheidungen.
  Fragen, welche Entscheidungen im Proposal stehen und wer sie getroffen hat.
- Click-Dummy wird zum echten Code: Er gehört in die Explore-Phase und wird
  vor dem Propose verworfen.
- Scope wächst (Gehege anlegen, Kapazitäten): als Out of scope ins Proposal.

Referenzlösung: Branch workshop/solution, Commits zu „enclosure-overview“.
-->

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
