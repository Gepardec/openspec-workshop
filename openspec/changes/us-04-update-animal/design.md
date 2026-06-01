## Context

The animal list (US-01), profile (US-02), and create form (US-03) are in place. Zoo managers can view and add animals but cannot correct existing records. The backend exposes `GET /animals`, `GET /animals/{id}`, and `POST /animals`; a `PUT /animals/{id}` endpoint is missing. The Angular frontend has no edit form or route.

## Goals / Non-Goals

**Goals:**
- Add `PUT /animals/{id}` REST endpoint that updates an existing animal and returns `200 OK`
- Add Angular route `/animals/:id/edit` with a reactive edit form pre-populated with the animal's current data
- Add an "Edit" action on the animal profile page that navigates to the edit form
- Extend the animal NgRx Signal Store with an `update` method that calls the API and refreshes the in-store animal
- Cover the new endpoint with RestAssured acceptance tests (200, 400, and 404 cases)

**Non-Goals:**
- Partial updates / PATCH semantics
- Optimistic locking or conflict detection
- Image or media upload
- Deleting animals (US-05)
- Access control / authentication

## Decisions

### Backend: add `PUT /animals/{id}` to the existing resource class

Accept a JSON body with `name`, `species`, `age`, `enclosure`, and `notes`. Load the entity by ID (return `404 Not Found` if absent), update its fields, persist via Panache, and return `200 OK` with the updated entity as the response body. Return `400 Bad Request` when required fields are missing.

**Alternative considered**: PATCH for partial updates. Rejected — the animal model is small and flat; PUT keeps the contract simple and consistent with how US-03 treats the full entity. PATCH can be introduced later if selective field updates become necessary.

### Frontend: dedicated route `/animals/:id/edit` (not a dialog)

A routed page stays consistent with the create form pattern from US-03, gives the edit form a bookmarkable URL, and keeps navigation history clean. A `MatDialog` would avoid an extra route but introduces lifecycle complexity (dialog reference, passing current animal data) for no UX gain here.

The `AnimalEditComponent` lives at `src/app/domains/animals/animal-edit/` alongside the existing feature folders.

### State: `update` method on the animals NgRx Signal Store

The `update(id, data)` method calls the API, receives the updated animal, and replaces the matching entry in the `animals` signal array (and refreshes `selectedAnimal` if it matches). Keeping mutation in the store avoids scattering HTTP logic in the component and stays consistent with US-03's `create` pattern.

**Alternative considered**: navigate back without updating the store, let the profile re-fetch. Rejected for the same reason as US-03 — the store already holds the data; an in-place update is cheaper and avoids a redundant GET.

### Pre-populating the form: load from store, not a fresh GET

The edit route receives the animal `id` from the URL. If the animal is already in the store (the user arrived via the profile page), the store value is used to pre-populate the form immediately. If the store is empty (direct navigation), a `GET /animals/{id}` is triggered first.

**Alternative considered**: always fetch from the API on route entry for freshness. Rejected — adds latency on the common path (arriving from the profile page) and introduces an extra network call for data the store likely already holds.

## Risks / Trade-offs

- **Stale data in the store** → if another user edited the same animal between load and submit, the PUT overwrites their changes silently. Acceptable for a single-user workshop app; optimistic locking is out of scope.
- **Validation drift between frontend and backend** → both layers validate required fields, but keeping them in sync takes effort. The RestAssured test pins the backend contract; frontend validation is a UX nicety.
- **Direct navigation to `/animals/:id/edit`** → triggers a store fetch before the form can render, causing a brief loading state. This is the correct fallback behaviour; no additional mitigation needed.
