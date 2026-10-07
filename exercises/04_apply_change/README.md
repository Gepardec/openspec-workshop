# Übung 4 – Einen vorbereiteten Change anwenden

## Kontext

Im Unterordner `change/` liegt ein fertig ausformulierter Change. Kopiert ihn in `openspec/changes/`:

```sh
cp -R exercises/04_apply_change/change/remove-animal-notes openspec/changes/
```

## Ziel

Den Change vollständig implementieren und archivieren:

1. Lest Proposal, Design, Specs und Tasks (`openspec show remove-animal-notes`, `openspec status --change remove-animal-notes`).
2. Lasst euren AI-Assistenten den Change anwenden (in Codex: `$openspec-apply-change remove-animal-notes`).
3. Prüft das Ergebnis selbst: Code-Review, Tests (`./mvnw test` in `app/zoo-management`), Build und Lint im Frontend (`ng build` und `ng lint` in `app/zoo-management/src/main/webui`) und ein Blick in die App.
4. Archiviert mit der CLI: `openspec archive remove-animal-notes`.

## Erfolgskriterium

Alle Tasks sind abgehakt, Tests, Build und Lint sind grün. `openspec list` zeigt keine aktiven Changes. Die geänderten Requirements sind in `openspec/specs/` eingeflossen.
