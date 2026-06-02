## Why

The animal profile includes a free-text `notes` field that is unstructured, has no authorship or timestamp, and implicitly pushes the app toward user-management concerns it was never designed to handle. Once structured tracking features (feeding log, vet flags) exist, the field becomes redundant and its open-ended nature actively undermines data quality.

## What Changes

- **REMOVE** the `notes` field from the animal data model (database column)
- **REMOVE** `notes` from all REST API request/response bodies (`POST /animals`, `PUT /animals/{id}`, `GET /animals/{id}`)
- **REMOVE** the notes input from the animal create form (`/animals/new`)
- **REMOVE** the notes input from the animal edit form (`/animals/:id/edit`)
- **REMOVE** the notes display from the animal profile view (`/animals/:id`)

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `animal-profile`: Remove `notes` from the profile view and from the `GET /animals/{id}` response contract
- `animal-create`: Remove `notes` from the create form and from the `POST /animals` request/response contract
- `animal-edit`: Remove `notes` from the edit form and from the `PUT /animals/{id}` request/response contract

## Impact

- **Backend**: Drop the `notes` column from the `Animal` entity and database migration; remove the field from all DTOs/JSON serialisation
- **Frontend**: Remove the `notes` form control from the create and edit forms; remove the `notes` display section from the profile component; update the animal model/type to omit the field
- **Tests**: Update RestAssured tests for `POST /animals`, `PUT /animals/{id}`, and `GET /animals/{id}` to no longer include or assert on `notes`
