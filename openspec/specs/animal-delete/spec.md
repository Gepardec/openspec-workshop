## Purpose

Provides the ability to permanently delete a registered animal. Includes a REST API endpoint for deletion and a UI confirmation flow accessible from the animal profile.

## Requirements

### Requirement: DELETE /animals/{id} endpoint
The system SHALL expose a `DELETE /animals/{id}` REST endpoint. When the animal exists, the endpoint SHALL permanently remove the animal record from the database and return `204 No Content`. When the animal does not exist, the endpoint SHALL return `404 Not Found`.

#### Scenario: Successful deletion
- **WHEN** a client sends `DELETE /animals/{id}` for an existing animal ID
- **THEN** the server returns `204 No Content` and the animal is no longer retrievable via `GET /animals/{id}`

#### Scenario: Delete non-existent animal
- **WHEN** a client sends `DELETE /animals/{id}` for an ID that does not exist
- **THEN** the server returns `404 Not Found`

### Requirement: Confirmation dialog before deletion
The system SHALL display a confirmation dialog when a zoo manager initiates the delete action on an animal profile. The dialog SHALL clearly identify the animal by name and require an explicit confirmation before the deletion request is sent.

#### Scenario: Manager confirms deletion
- **WHEN** a zoo manager activates the delete action on a profile and confirms in the dialog
- **THEN** the system sends `DELETE /animals/{id}`, removes the animal from the local state, and navigates to `/animals`

#### Scenario: Manager cancels deletion
- **WHEN** a zoo manager activates the delete action on a profile and cancels in the dialog
- **THEN** no request is sent and the profile remains displayed

### Requirement: Post-deletion navigation
The system SHALL navigate the user to the animal list at `/animals` after a successful deletion, and the deleted animal SHALL no longer appear in the list.

#### Scenario: Animal removed from list after deletion
- **WHEN** a zoo manager successfully deletes an animal from the profile page
- **THEN** the application navigates to `/animals` and the deleted animal is not present in the list
