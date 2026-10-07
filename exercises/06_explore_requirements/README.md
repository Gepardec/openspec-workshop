# Übung 6 – Exploration einer unklaren Anforderung

## Kontext

In `REQUIREMENT.md` liegt eine vage Anforderung — noch nicht reif für ein Proposal.

## Ziel

Führt die Anforderung durch den vollständigen Loop:

1. **Explore:** Schärft die Anforderung mit eurem AI-Assistenten (`/opsx:explore` bzw. der Skill `openspec-explore`). Lasst euch Rückfragen stellen und trefft die Entscheidungen selbst.
2. **Propose:** Erstellt aus dem Ergebnis ein Proposal (`/opsx:propose`). `openspec validate <change-name> --strict` muss durchlaufen.
3. **Apply:** Wendet den Change an (`/opsx:apply`) und prüft das Ergebnis: Tests (`./mvnw test`), Build und Lint im Frontend (`ng build` und `ng lint` in `app/zoo-management/src/main/webui`) und ein Blick in die App.
4. **Sync:** Übernehmt die Delta-Specs in die Haupt-Specs (`/opsx:sync` bzw. der Skill `openspec-sync-specs`), bevor ihr archiviert. Für sync gibt es keinen eigenen CLI-Befehl.
5. **Archive:** Archiviert mit der CLI: `openspec archive <change-name>`. Die bereits gesyncten Specs erkennt die CLI („Specs already in sync“).

## Erfolgskriterium

Ein Proposal existiert, das aus der Exploration hervorgegangen ist und die Anforderung klar beschreibt. Am Ende ist der Change archiviert, `openspec list` zeigt keine aktiven Changes und `openspec validate --all --strict` meldet keine Fehler.
