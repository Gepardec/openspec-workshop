## Context

The animal list (US-01) and profile (US-02) are in place. Zoo managers can view animals but have no way to add new ones. The backend exposes `GET /animals` and `GET /animals/{id}`; a `POST /animals` endpoint is missing. The Angular frontend has no create form or route.

## Goals / Non-Goals

**Goals:**
- Add `POST /animals` REST endpoint that persists a new animal and returns `201 Created`
- Add Angular route `/animals/new` with a reactive create form
- Add an "Add animal" trigger on the animal list that navigates to the create form
- Extend the animal NgRx Signal Store with a `create` method that calls the API and appends the result
- Cover the new endpoint with RestAssured acceptance tests (201 and 400 cases)

**Non-Goals:**
- Bulk / CSV import of animals
- Image or media upload
- Editing or deleting animals (US-04, US-05)
- Access control / authentication

## Decisions

### Backend: add `POST /animals` to the existing resource class

Accept a JSON body with `name`, `species`, `age`, `enclosure`, and `notes`. Persist via Panache `persist()` and return `201 Created` with a `Location: /animals/{id}` header and the created entity as the response body. Return `400 Bad Request` when required fields are missing or invalid.

**Alternative considered**: a dedicated DTO/record for the request body to decouple the API from the entity. Accepted as a desirable improvement but deferred — the entity is still simple and flat; introducing a DTO is incremental scope not needed for the acceptance tests.

### Frontend: dedicated route `/animals/new` (not a dialog)

A routed page keeps the create form bookmarkable, gives it its own browser history entry, and stays consistent with how the list and profile are structured. A `MatDialog` would avoid a route change but adds lifecycle complexity (dialog reference, data passing) for no meaningful UX gain in this app.

The `AnimalCreateComponent` lives at `src/app/domains/animals/animal-create/` alongside the existing feature folders.

### State: `create` method on the animals NgRx Signal Store

The `create(data)` method calls the API, receives the newly created animal, and appends it to the `animals` signal array. On success the store navigates (or emits a signal) back to the list. Keeping the mutation in the store avoids scattering HTTP logic in the component and stays consistent with how the list uses the store.

**Alternative considered**: fire-and-forget — navigate back without updating the store, let the list re-fetch. Rejected: the list already holds the fetched animals in state; appending to the signal is cheaper and avoids a redundant GET on re-entry.

### Form: Angular Reactive Forms with Material inputs

`ReactiveFormsModule` + `MatFormField` / `MatInput` matches existing patterns and provides straightforward validation feedback. Template-driven forms are excluded by project ESLint rules favouring reactive forms.

## Risks / Trade-offs

- **Concurrent creates from multiple tabs** → the appended item in one tab may duplicate a server-side animal already visible after a re-fetch in the other tab. Acceptable for now; deduplication is a future concern.
- **Validation on the backend vs. frontend** → both layers should validate, but keeping them in sync takes effort. The RestAssured test pins the backend contract; frontend validation is a UX nicety not a security gate.
