## Purpose

Gives zoo managers an overview of all enclosures with the number of animals and the animals living in each, so they do not have to look at animals one by one.

## ADDED Requirements

### Requirement: List enclosures via REST API
The system SHALL expose a `GET /enclosures` endpoint that returns one entry per distinct enclosure in use as a JSON array, sorted by enclosure name. Each entry SHALL contain the enclosure `name`, the `animalCount`, and an `animals` array with the `id`, `name` and `species` of each animal in that enclosure, sorted by animal name. Animals without an enclosure SHALL NOT be included.

#### Scenario: Animals share enclosures
- **WHEN** a client sends `GET /enclosures` and two animals live in "Savanna" and one in "Polar World"
- **THEN** the response status is `200 OK` and the body contains an entry "Polar World" with `animalCount` 1 and an entry "Savanna" with `animalCount` 2, each listing its animals

#### Scenario: Animal without enclosure
- **WHEN** a client sends `GET /enclosures` and an animal has no enclosure
- **THEN** that animal does not appear in any entry

#### Scenario: No animals registered
- **WHEN** a client sends `GET /enclosures` and no animals are stored
- **THEN** the response status is `200 OK` and the body is an empty JSON array `[]`

### Requirement: Enclosure overview view in the UI
The system SHALL provide an Angular route at `/enclosures` that displays every enclosure with its name, its animal count, and the animals living in it (name and species). Each animal SHALL link to its profile at `/animals/:id`.

#### Scenario: Navigating to the overview
- **WHEN** a zoo manager navigates to `/enclosures`
- **THEN** the page displays each enclosure with its name and animal count, and the animals living in it with name and species

#### Scenario: Navigating to an animal profile from the overview
- **WHEN** a zoo manager clicks an animal in an enclosure
- **THEN** the application navigates to `/animals/:id` for that animal

#### Scenario: No enclosures
- **WHEN** a zoo manager navigates to `/enclosures` and no animal has an enclosure
- **THEN** the page displays an empty state message

### Requirement: Enclosure overview accessible from navigation
The system SHALL include a navigation entry that links to the enclosure overview, so zoo managers can reach it from any page.

#### Scenario: Navigation link present
- **WHEN** a zoo manager views the application shell
- **THEN** a navigation link to the enclosure overview is visible and navigates to `/enclosures` when clicked
