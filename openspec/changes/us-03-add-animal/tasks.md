## 1. Backend — Acceptance Tests

- [ ] 1.1 Add a RestAssured test for `POST /animals` returning `201 Created` with `Location` header and the created animal body
- [ ] 1.2 Add a RestAssured test for `POST /animals` with missing required fields returning `400 Bad Request`

## 2. Backend — Implementation

- [ ] 2.1 Add `POST /animals` handler to the existing `AnimalResource` class accepting a JSON body and calling `Animal.persist()`
- [ ] 2.2 Return `Response.created(uri).entity(animal).build()` with the `Location` header pointing to `/animals/{id}`
- [ ] 2.3 Add bean validation annotations (`@NotBlank` on `name` and `species`) and ensure `@Valid` is used on the endpoint parameter so `400` is returned for invalid input

## 3. Frontend — Animal Store

- [ ] 3.1 Add a `create(data: AnimalCreateDto)` method to the animals NgRx Signal Store that calls `POST /animals` via `HttpClient`
- [ ] 3.2 On success, append the returned animal to the `animals` signal array and navigate to `/animals`

## 4. Frontend — Create Form Component

- [ ] 4.1 Generate `AnimalCreateComponent` under `src/app/domains/animals/animal-create/` (`.ts`, `.html`, `.scss`)
- [ ] 4.2 Build a reactive form with fields for `name`, `species`, `age`, `enclosure`, and `notes` using `MatFormField` / `MatInput`
- [ ] 4.3 Add required-field validation on `name` and `species`; display inline error messages via `MatError`
- [ ] 4.4 Wire the submit handler to call `store.create(formValue)`
- [ ] 4.5 Add a cancel button that navigates back to `/animals` without saving
- [ ] 4.6 Add Transloco keys for all user-visible labels, placeholders, and error messages (German + English)

## 5. Frontend — Routing

- [ ] 5.1 Register the `/animals/new` route in the animals feature routes, mapped to `AnimalCreateComponent`
- [ ] 5.2 Verify the route is lazy-loaded (or eagerly loaded consistent with the existing animals feature)

## 6. Frontend — Animal List Update

- [ ] 6.1 Add an "Add animal" button or FAB to `AnimalListComponent` with a `routerLink` to `/animals/new`
- [ ] 6.2 Add the corresponding Transloco key for the button label (German + English)
