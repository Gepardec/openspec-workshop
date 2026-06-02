## Purpose

Provides the ability to edit an existing animal's details. Includes a REST API endpoint for updating a single animal by ID and a UI edit form route accessible from the animal profile.

## Requirements

### Requirement: Update animal via REST API
The system SHALL expose a `PUT /animals/{id}` endpoint that accepts a JSON body with `name`, `species`, `age`, `enclosure`, and `notes` fields, persists the changes to the identified animal, and returns the updated record.

#### Scenario: Valid update submitted
- **WHEN** a client sends `PUT /animals/{id}` with a valid JSON body containing `name` and `species`
- **THEN** the response status is `200 OK` and the body is a JSON object with the updated animal data

#### Scenario: Required fields missing
- **WHEN** a client sends `PUT /animals/{id}` with a JSON body that omits `name` or `species`
- **THEN** the response status is `400 Bad Request`

#### Scenario: Animal not found
- **WHEN** a client sends `PUT /animals/{id}` where `{id}` does not correspond to an existing animal
- **THEN** the response status is `404 Not Found`

### Requirement: Animal edit form in the UI
The system SHALL provide an Angular route at `/animals/:id/edit` that renders a form pre-populated with the existing animal data, allowing a zoo manager to update the fields (`name`, `species`, `age`, `enclosure`, `notes`) and submit the changes.

#### Scenario: Navigating to the edit form
- **WHEN** a zoo manager navigates to `/animals/:id/edit`
- **THEN** the page displays a form with all fields pre-populated with the animal's current values

#### Scenario: Submitting a valid form
- **WHEN** a zoo manager modifies one or more fields and submits the form
- **THEN** the changes are sent to the API, the animal record is updated in the list and profile, and the application navigates back to `/animals/:id`

#### Scenario: Submitting an incomplete form
- **WHEN** a zoo manager clears a required field and submits the form
- **THEN** validation errors are displayed inline and the form is not submitted

### Requirement: Cancel edit and return to profile
The system SHALL provide a cancel control on the edit form that navigates back to the animal profile without saving.

#### Scenario: Cancelling the edit form
- **WHEN** a zoo manager activates the cancel control on the edit form
- **THEN** the application navigates back to `/animals/:id` and no changes are saved
