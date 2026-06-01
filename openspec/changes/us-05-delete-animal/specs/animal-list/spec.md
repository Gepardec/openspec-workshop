## MODIFIED Requirements

### Requirement: Animal list view in the UI
The system SHALL provide an Angular route at `/animals` that displays all registered animals in a list or table. Each row SHALL show at minimum the animal's name and species. Each row SHALL be a navigable link to the animal's profile at `/animals/:id`. The list view SHALL include an "Add animal" action that navigates to `/animals/new`. When navigated to after a deletion, the list SHALL not show the deleted animal.

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

#### Scenario: Deleted animal not shown after redirect
- **WHEN** a zoo manager is redirected to `/animals` after successfully deleting an animal
- **THEN** the deleted animal does not appear in the list
