## Purpose

Provides the ability to create a new animal in the zoo, via both a REST API endpoint and an Angular UI form.

## Requirements

### Requirement: Create animal via REST API
The system SHALL expose a `POST /animals` endpoint that accepts a JSON body with `name`, `species`, `age`, `enclosure`, and `notes` fields, persists the new animal, and returns the created record.

#### Scenario: Valid animal data submitted
- **WHEN** a client sends `POST /animals` with a valid JSON body containing `name` and `species`
- **THEN** the response status is `201 Created`, the `Location` header contains the URL of the new resource, and the body is a JSON object with the created animal including its generated `id`

#### Scenario: Required fields missing
- **WHEN** a client sends `POST /animals` with a JSON body that omits `name` or `species`
- **THEN** the response status is `400 Bad Request`

### Requirement: Animal create form in the UI
The system SHALL provide an Angular route at `/animals/new` that renders a form allowing a zoo manager to enter the details of a new animal (`name`, `species`, `age`, `enclosure`, `notes`) and submit them.

#### Scenario: Navigating to the create form
- **WHEN** a zoo manager navigates to `/animals/new`
- **THEN** the page displays a form with input fields for name, species, age, enclosure, and notes

#### Scenario: Submitting a valid form
- **WHEN** a zoo manager fills in the required fields and submits the form
- **THEN** the new animal is sent to the API, the animal is added to the list, and the application navigates back to `/animals`

#### Scenario: Submitting an incomplete form
- **WHEN** a zoo manager submits the form without filling in required fields
- **THEN** validation errors are displayed inline and the form is not submitted

### Requirement: Cancel create and return to list
The system SHALL provide a cancel control on the create form that navigates back to the animal list without saving.

#### Scenario: Cancelling the create form
- **WHEN** a zoo manager activates the cancel control on the create form
- **THEN** the application navigates back to `/animals` and no new animal is created
