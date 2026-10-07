## Why

The zoo registry currently has no way to add new animals — zoo managers can only view existing records. As animals are acquired, staff need to register them immediately so the registry stays current.

## What Changes

- Add a `POST /animals` REST endpoint that accepts animal data and persists a new record
- Introduce an "Add animal" form in the Angular frontend, accessible from the animal list
- The animal list gains an action to open the create form and reflects the newly added animal without a full page reload

## Capabilities

### New Capabilities

- `animal-create`: Form-based workflow for registering a new animal (name, species, age, enclosure). Covers the backend `POST /animals` endpoint and the Angular create-form component.

### Modified Capabilities

- `animal-list`: Add an "Add animal" action (button/FAB) that opens the create form; reflect newly created animals in the list after successful submission.

## Impact

- **Backend**: New `POST /animals` endpoint accepting JSON body; RestAssured test covering 201 Created and 400 Bad Request responses
- **Frontend**: New Angular component `AnimalCreateComponent` (form); updated `AnimalListComponent` with a create trigger; animal store extended with a `create` action that dispatches the POST and appends the result
- **Database**: Reuses existing `animals` table — no schema changes required
