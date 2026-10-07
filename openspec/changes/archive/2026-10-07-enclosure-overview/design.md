## Context

`Animal.enclosure` is a plain string; there is no enclosure table. The dashboard feature (`DashboardResource` + `dashboard` frontend domain) is the closest pattern: a dedicated resource, a response record, a signal store and a page component. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Provide the grouping on the server so the HTTP contract, and its RestAssured tests, define the overview
- Reuse the established domain structure (`data`, `model`, `feature`) for a new `enclosures` domain

**Non-Goals:**
- An `Enclosure` entity, capacities, or enclosure management
- Cross-domain imports: the enclosures domain must not import from `domain:animals`; animal links use plain router links to `/animals/:id`

## Decisions

### Group animals by enclosure in the backend

**Decision**: `EnclosureResource` loads all animals with Panache, filters out blank enclosures, and groups them in memory into `EnclosureResponse(name, animalCount, animals)` records, sorted by name.

**Rationale**: Simple, readable, and fine for the data volume of this app. Keeps the frontend free of grouping logic.

**Alternative considered**: Group in the browser from `GET /animals`. Rejected - the aggregation is business behavior that should be covered by the backend acceptance tests.

**Alternative considered**: JPQL `group by`. Rejected - it returns counts but not the animals, requiring a second query.

### Own frontend domain

**Decision**: New domain `src/app/domains/enclosures/` with `model/enclosure.ts`, `data/enclosure.service.ts`, `data/enclosure.store.ts` (signal store using `withCallStatus`) and `feature/enclosure-overview/`.

**Rationale**: Follows the Sheriff domain structure and keeps `animals` and `enclosures` decoupled.

### Layout

**Decision**: One Material expansion panel per enclosure, with name and count in the header and a Material list of animals as content.

**Rationale**: Gives the quick overview (names and counts) while details stay one click away; uses Angular Material only, Tailwind not needed.

## Risks / Trade-offs

- **[Risk] Free-text enclosure names create near-duplicates ("Savanna 1" vs "savanna 1")** → Accepted; the overview exposes the problem and a real enclosure entity can be a later change.
- **[Trade-off] In-memory grouping loads all animals** → Acceptable for this app's data size.
