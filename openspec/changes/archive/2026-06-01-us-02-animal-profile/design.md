## Context

The animal list (US-01) is already in place, but clicking an animal goes nowhere. Zoo managers need a drill-down view to see full animal details including the free-text `notes` field. The backend currently only exposes `GET /animals`; there is no single-resource endpoint.

## Goals / Non-Goals

**Goals:**
- Add `GET /animals/{id}` REST endpoint returning the full animal record
- Add Angular route `/animals/:id` with a read-only profile component
- Make each animal in the list a clickable link to its profile
- Cover the new endpoint with RestAssured acceptance tests (200 and 404 cases)

**Non-Goals:**
- Editing or deleting animals (separate user stories US-04, US-05)
- Image upload or media attachments
- Access control / authentication

## Decisions

### Backend: add `GET /animals/{id}` to the existing resource class

Return the same `Animal` entity Jackson already serialises for the list endpoint. No new DTO needed at this stage — the full entity already includes `notes`. A missing ID returns 404 via `findByIdOptional`.

**Alternative considered**: a dedicated DTO to control the response shape. Rejected: the entity is simple and flat; a DTO adds ceremony with no current benefit.

### Frontend: lazy-loaded detail route under the animals feature

Add `/animals/:id` as a child route inside the existing animals domain feature. The profile component is co-located under `src/app/domains/animals/animal-profile/`.

**State**: extend the existing animals NgRx Signal Store with a `rxResource` (or `httpClient` call) that loads a single animal by ID. The `AnimalProfileComponent` reads from this store slice via a signal computed from the route param.

**Alternative considered**: a standalone resolver. Rejected: signal-based resource loading in the store keeps data-fetching consistent with the list feature and avoids the resolver lifecycle complexity.

### Linking from the list: routerLink on each row

Each list row (or card) gets a `[routerLink]="['/animals', animal.id]"` binding. No new output event or service needed.

## Risks / Trade-offs

- **Stale animal data in store** → if the user navigates back to the list after viewing a profile, the list may be re-fetched or show cached data. Acceptable for now; the list already re-fetches on route entry.
- **Missing ID on `GET /animals/{id}`** → returns 404; the profile component should show a user-friendly error message, not a blank page. The spec covers this scenario.
