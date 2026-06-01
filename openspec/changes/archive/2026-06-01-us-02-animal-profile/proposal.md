## Why

Zoo managers need to view the full details of a specific animal without scanning the entire list. A dedicated animal profile page gives quick access to all registered attributes and supports the free-text notes field for informal observations.

## What Changes

- Introduce a new animal profile view, accessible by clicking an animal in the list
- Expose a `GET /animals/{id}` REST endpoint returning the full animal record including its `notes` field
- Add a dedicated Angular route and component that fetches and displays the animal's details

## Capabilities

### New Capabilities

- `animal-profile`: Read-only detail view for a single animal, showing all fields (name, species, age, enclosure, notes) and a back-navigation control

### Modified Capabilities

- `animal-list`: Update list items to link to the animal profile route

## Impact

- **Backend**: New `GET /animals/{id}` endpoint; new RestAssured test covering 200 and 404 responses
- **Frontend**: New route `/animals/:id`, new `AnimalProfileComponent`, updated `AnimalListComponent` to emit or link to the detail route
- **State**: Animal store extended with a `loadById` action / resource to fetch a single animal
