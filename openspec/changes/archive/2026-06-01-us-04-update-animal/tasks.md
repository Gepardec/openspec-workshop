## 1. Backend — REST endpoint

- [x] 1.1 Add `PUT /animals/{id}` method to the existing `AnimalResource` JAX-RS class
- [x] 1.2 Implement update logic using Panache: find by ID, update fields, persist, return `200 OK` with updated entity
- [x] 1.3 Return `404 Not Found` when the animal ID does not exist
- [x] 1.4 Return `400 Bad Request` when required fields (`name`, `species`) are missing

## 2. Backend — acceptance tests

- [x] 2.1 Write RestAssured test: `PUT /animals/{id}` with valid body returns `200 OK` and updated data
- [x] 2.2 Write RestAssured test: `PUT /animals/{id}` with missing required fields returns `400 Bad Request`
- [x] 2.3 Write RestAssured test: `PUT /animals/{id}` with unknown ID returns `404 Not Found`

## 3. Frontend — NgRx Signal Store

- [x] 3.1 Add `update(id, data)` method to the animals NgRx Signal Store that calls `PUT /animals/{id}`
- [x] 3.2 On success, replace the matching animal in the `animals` signal array with the updated record
- [x] 3.3 If `selectedAnimal` matches the updated ID, refresh it with the new data

## 4. Frontend — edit route and component

- [x] 4.1 Create `AnimalEditComponent` at `src/app/domains/animals/animal-edit/` (`.ts`, `.html`, `.scss`)
- [x] 4.2 Register the `/animals/:id/edit` route in the animals routing configuration
- [x] 4.3 On route entry, load the animal from the store (or fetch via `GET /animals/{id}` if not in store)
- [x] 4.4 Pre-populate the reactive form with the current animal values
- [x] 4.5 On valid submit, call the store `update` method and navigate to `/animals/:id` on success
- [x] 4.6 Add inline validation errors for required fields (`name`, `species`)
- [x] 4.7 Add a cancel control that navigates back to `/animals/:id` without saving

## 5. Frontend — animal profile update

- [x] 5.1 Add an "Edit" action (button or icon button) to `AnimalProfileComponent` that navigates to `/animals/:id/edit`
- [x] 5.2 Add Transloco translation keys for all new user-visible strings (edit button label, form field labels, validation messages)
