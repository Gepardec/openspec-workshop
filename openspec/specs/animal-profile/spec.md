## Purpose

Provides the ability to view the full profile of a single registered animal. Includes a REST API endpoint for retrieving a single animal by ID and a UI view accessible from the animal list.

## Requirements

### Requirement: Retrieve single animal via REST API
The system SHALL expose a `GET /animals/{id}` endpoint that returns the full record for the animal with the given ID, including `id`, `name`, `species`, `age`, `enclosure`, and `notes` fields as a JSON object.

#### Scenario: Animal exists
- **WHEN** a client sends `GET /animals/{id}` for an existing animal ID
- **THEN** the response status is `200 OK` and the body is a JSON object with all animal fields including `notes`

#### Scenario: Animal not found
- **WHEN** a client sends `GET /animals/{id}` for an ID that does not exist
- **THEN** the response status is `404 Not Found`

### Requirement: Animal profile view in the UI
The system SHALL provide an Angular route at `/animals/:id` that displays the full profile of a single animal, including `name`, `species`, `age`, `enclosure`, and the `notes` free-text field. The profile view SHALL include an "Edit" action that navigates to the animal edit form. The profile view SHALL include a "Delete" action that opens a confirmation dialog; on confirmation, the animal is deleted and the user is navigated to `/animals`.

#### Scenario: Navigating to an existing animal profile
- **WHEN** a zoo manager navigates to `/animals/:id` for an existing animal
- **THEN** the page displays all of the animal's details including the `notes` field

#### Scenario: Navigating to a non-existent animal profile
- **WHEN** a zoo manager navigates to `/animals/:id` for an ID that does not exist
- **THEN** the page displays a user-friendly error message indicating the animal was not found

#### Scenario: Edit action present
- **WHEN** a zoo manager views an animal profile
- **THEN** an "Edit" action (e.g., button or icon button) is visible and navigates to `/animals/:id/edit` when activated

#### Scenario: Delete action present
- **WHEN** a zoo manager views an animal profile
- **THEN** a "Delete" action (e.g., button or icon button) is visible and opens the confirmation dialog when activated

### Requirement: Back navigation from animal profile
The system SHALL provide a control on the animal profile page that navigates back to the animal list.

#### Scenario: Back link present
- **WHEN** a zoo manager views an animal profile
- **THEN** a back navigation control is visible and navigates to `/animals` when activated
