## Context

The `notes` field was added to the animal entity as part of the initial animal profile (US-02). It exists in the Panache entity, all REST endpoints, the create/edit forms, and the profile view. The database schema is managed with Hibernate's `drop-and-create` strategy, so there is no migration script to write.

## Goals / Non-Goals

**Goals:**
- Remove `notes` from the `Animal` entity and all JSON contracts
- Remove the notes input from the create and edit forms
- Remove the notes display from the profile view
- Update all RestAssured tests to stop asserting on `notes`

**Non-Goals:**
- Introducing any replacement for free-text notes (a structured tracking feature is a separate ADD change)
- Preserving or migrating existing notes data

## Decisions

### Remove the field hard — no deprecation period

**Decision**: Delete `notes` outright. No soft-remove (nullable column kept, field hidden in UI).

**Rationale**: The schema is `drop-and-create` so there is no prod data at risk. Keeping a dead column would create noise in the entity and mislead future contributors.

**Alternative considered**: Mark the field `@Column(insertable=false, updatable=false)` and hide it in the UI. Rejected — pointless complexity with no benefit in a workshop app that recreates its schema on every start.

### No API versioning

**Decision**: Change the API contract directly on `POST /animals`, `PUT /animals/{id}`, and `GET /animals/{id}`.

**Rationale**: There are no external consumers of this API beyond the bundled Angular frontend. Breaking-change versioning would add overhead with no benefit.

## Risks / Trade-offs

- **[Risk] Existing `import.sql` seed data includes notes values** → Mitigation: Remove the `notes` column from any `INSERT` statements in `import.sql`.
- **[Risk] Frontend model type still has a `notes` property** → Mitigation: Remove the property from the TypeScript animal model; the compiler will surface all remaining usages.

## Migration Plan

1. Remove `public String notes;` from `Animal.java`
2. Update `import.sql` — strip `notes` from all seed inserts
3. Remove `notes` from the Angular `Animal` interface/type
4. Remove the notes form control from create and edit forms
5. Remove the notes display from the profile component
6. Update RestAssured tests to remove all `notes` assertions and payload inclusions
