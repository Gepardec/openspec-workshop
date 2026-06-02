## Why

Zoo managers need to remove animals from the registry when they leave the zoo — whether transferred, released, or deceased — so the list stays accurate and only reflects currently registered animals.

## What Changes

- Add a `DELETE /animals/{id}` REST endpoint that removes an animal record permanently
- Introduce a "Delete" action on the animal profile page with a confirmation dialog to prevent accidental deletions
- After successful deletion, navigate the user back to the animal list and reflect the removal immediately

## Capabilities

### New Capabilities

- `animal-delete`: Deletion workflow for removing an existing animal from the registry. Covers the backend `DELETE /animals/{id}` endpoint and the Angular confirmation dialog and post-delete navigation.

### Modified Capabilities

- `animal-profile`: Add a "Delete" action that triggers the confirmation dialog; on confirmation, deletes the animal and navigates back to the list.
- `animal-list`: Reflect the deletion immediately after the user is redirected back — removed animal must no longer appear in the list.

## Impact

- **Backend**: New `DELETE /animals/{id}` endpoint; RestAssured tests covering 204 No Content and 404 Not Found responses
- **Frontend**: `AnimalProfileComponent` extended with a delete trigger; confirmation dialog (Angular Material); animal store extended with a `delete` action that dispatches the DELETE request and removes the animal from local state; routing navigates to `/animals` on success
- **Database**: Reuses existing `animals` table — no schema changes required; deletes the row by ID
