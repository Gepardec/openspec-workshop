## Context

The zoo management app currently has no animal management functionality. US-01 establishes the foundation: a `GET /animals` endpoint and an Angular list view. This is the first domain feature, so structural choices made here (entity shape, store layout, routing) will set the pattern for US-02 through US-05.

## Goals / Non-Goals

**Goals:**
- Expose `GET /animals` returning all animals as a JSON array
- Render the list in an Angular component using NgRx Signal Store
- Wire the route into the shell navigation
- Write a RestAssured acceptance test that validates the HTTP contract

**Non-Goals:**
- Pagination, filtering, or sorting (US-01 is a simple full list)
- Animal detail view (US-02)
- Create / edit / delete operations (US-03–05)
- Enclosure or staff domains

## Decisions

### 1. Animal entity fields for the list view

**Decision**: Include `id`, `name`, and `species` in the list response. Additional fields (age, health status, notes) are deferred to the profile view (US-02).

**Rationale**: The user story asks only for a "quick overview". A minimal payload keeps the list fast and avoids over-fetching before the full data model is defined.

**Alternative considered**: Return all fields in the list; rejected because it ties the list contract to the profile model too early.

### 2. Backend: Panache active-record vs. repository pattern

**Decision**: Use Panache active-record (`Animal extends PanacheEntity`). `Animal.listAll()` is sufficient for US-01.

**Rationale**: Project conventions prefer active-record for simple CRUD. A dedicated repository class would be added only if query logic grows complex.

### 3. Frontend state: NgRx Signal Store

**Decision**: Create an `AnimalStore` in `src/app/domains/animals/animal-list/` using `withEntities<Animal>()` and `withCallStatus()`.

**Rationale**: Project conventions require state in NgRx Signal Store feature stores co-located with the feature folder. Using `withEntities` avoids manual array management and aligns with how US-02–05 will extend the store.

### 4. Routing

**Decision**: Register `/animals` as a lazy-loaded route in the shell router. The list component is the default view for this path.

**Rationale**: Lazy loading keeps the initial bundle small. The shell owns top-level routes per project structure conventions.

## Risks / Trade-offs

- **Schema migration risk** → Using Hibernate `quarkus.hibernate-orm.database.generation=update` in dev keeps iteration fast; production deployments should use Flyway migrations (out of scope here).
- **No loading/error state in US-01** → The store will expose `callStatus` but the template may only render the happy path for now. This is acceptable for a baseline; error handling can be layered on in a follow-up.
