## Why

Zoo managers need to correct or update animal records after they are created — details like age, enclosure assignment, or notes change over time and the registry must stay accurate.

## What Changes

- Add a `PUT /animals/{id}` REST endpoint that accepts updated animal data and persists the changes
- Introduce an "Edit animal" form in the Angular frontend, accessible from the animal profile page
- The animal list and profile reflect updated data after a successful edit without a full page reload

## Capabilities

### New Capabilities

- `animal-edit`: Form-based workflow for updating an existing animal's information (name, species, age, enclosure, notes). Covers the backend `PUT /animals/{id}` endpoint and the Angular edit-form component.

### Modified Capabilities

- `animal-profile`: Add an "Edit" action that navigates to the edit form at `/animals/:id/edit`.

## Impact

- **Backend**: New `PUT /animals/{id}` endpoint accepting JSON body; RestAssured tests covering 200 OK, 400 Bad Request, and 404 Not Found responses
- **Frontend**: New Angular route `/animals/:id/edit` and `AnimalEditComponent` (form pre-populated with existing data); updated `AnimalProfileComponent` with an edit trigger; animal store extended with an `update` action that dispatches the PUT and refreshes the affected animal
- **Database**: Reuses existing `animals` table — no schema changes required
