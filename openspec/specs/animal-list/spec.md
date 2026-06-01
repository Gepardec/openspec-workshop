## Purpose

Provides the ability to view all registered animals in the zoo. Includes a REST API endpoint for retrieving animals and a UI view accessible via navigation.

## Requirements

### Requirement: List all animals via REST API
The system SHALL expose a `GET /animals` endpoint that returns all registered animals as a JSON array. Each item SHALL include at minimum the animal's `id`, `name`, and `species`.

#### Scenario: Animals exist in the database
- **WHEN** a client sends `GET /animals`
- **THEN** the response status is `200 OK` and the body is a JSON array containing one object per registered animal, each with `id`, `name`, and `species` fields

#### Scenario: No animals registered
- **WHEN** a client sends `GET /animals` and no animals are stored
- **THEN** the response status is `200 OK` and the body is an empty JSON array `[]`

### Requirement: Animal list view in the UI
The system SHALL provide an Angular route at `/animals` that displays all registered animals in a list or table. Each row SHALL show at minimum the animal's name and species. Each row SHALL be a navigable link to the animal's profile at `/animals/:id`. The list view SHALL include an "Add animal" action that navigates to `/animals/new`.

#### Scenario: Navigating to the animal list
- **WHEN** a zoo manager navigates to `/animals`
- **THEN** the page displays a list of all animals, with each animal's name and species visible

#### Scenario: Empty list
- **WHEN** a zoo manager navigates to `/animals` and no animals are registered
- **THEN** the page displays an empty state (e.g., a message indicating no animals are registered)

#### Scenario: Navigating to an animal profile from the list
- **WHEN** a zoo manager clicks on an animal row in the list
- **THEN** the application navigates to `/animals/:id` for that animal

#### Scenario: Add animal action present
- **WHEN** a zoo manager views the animal list
- **THEN** an "Add animal" action (e.g., button or FAB) is visible and navigates to `/animals/new` when activated

### Requirement: Animal list accessible from navigation
The system SHALL include a navigation entry that links to the animal list, so zoo managers can reach it from any page.

#### Scenario: Navigation link present
- **WHEN** a zoo manager views the application shell
- **THEN** a navigation link to the animal list is visible and navigates to `/animals` when clicked
