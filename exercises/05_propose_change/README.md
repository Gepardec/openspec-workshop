# Übung 5 – Proposal aus einer User Story

## Kontext

In `USER_STORY.md` liegt eine fertige User Story.

## Ziel

1. Erstellt daraus mit eurem AI-Assistenten einen vollständigen Change – Proposal, Specs, Design, Tasks (in Codex: `$openspec-propose`) – und gebt ihm die User Story als Eingabe.
2. Reviewt die Artefakte und lasst sie bei Bedarf nachschärfen. `openspec validate <change-name> --strict` muss durchlaufen.
3. Wendet den Change an (`$openspec-apply-change`) und prüft das Ergebnis: Tests (`./mvnw test`), Build und Lint im Frontend (`ng build` und `ng lint` in `app/zoo-management/src/main/webui`) und ein Blick in die App. Frontend-Tests gibt es im Projekt bewusst keine.
4. Archiviert mit der CLI: `openspec archive <change-name>`.

## Erfolgskriterium

Vor dem Apply: `openspec status --change <change-name>` zeigt alle Artefakte als erledigt, `openspec show <change-name>` zeigt das Proposal. Am Ende: Die Tierliste lässt sich nach Tierart filtern, `openspec list` zeigt keine aktiven Changes und die neuen bzw. geänderten Requirements stehen in `openspec/specs/`.
