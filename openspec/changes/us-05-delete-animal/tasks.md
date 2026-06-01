## 1. Backend — REST Endpoint

- [ ] 1.1 Add `deleteAnimal(@PathParam("id") Long id)` method to `AnimalResource` returning `Response` with 204 on success and 404 when the animal is not found
- [ ] 1.2 Implement deletion logic using Panache (e.g., `Animal.deleteById(id)` or entity `delete()`)

## 2. Backend — Tests

- [ ] 2.1 Write a RestAssured test for `DELETE /animals/{id}` returning 204 when the animal exists
- [ ] 2.2 Write a RestAssured test for `DELETE /animals/{id}` returning 404 when the ID does not exist

## 3. Frontend — Animal Store

- [ ] 3.1 Add a `delete(id: number)` method to the animals NgRx Signal Store that calls `DELETE /animals/{id}` via the HTTP service
- [ ] 3.2 On success, remove the deleted animal from the in-memory signal collection
- [ ] 3.3 Add Transloco translation keys for the delete dialog (title, confirmation message, confirm/cancel button labels) in `de.json` and `en.json`

## 4. Frontend — Confirmation Dialog Component

- [ ] 4.1 Create `AnimalDeleteDialogComponent` with `.ts`, `.html`, and `.scss` files under the animals domain feature folder
- [ ] 4.2 Pass the animal name into the dialog via `MatDialogData` and display it in the confirmation message
- [ ] 4.3 Implement confirm and cancel actions that close the dialog with `true` / `false` result respectively

## 5. Frontend — Profile Page Integration

- [ ] 5.1 Add a "Delete" button to `AnimalProfileComponent` that opens `AnimalDeleteDialogComponent` via `MatDialog`
- [ ] 5.2 On dialog confirm (`true`), call the store `delete` method and navigate to `/animals` using `Router`
- [ ] 5.3 On dialog cancel (`false`), do nothing and keep the profile displayed
