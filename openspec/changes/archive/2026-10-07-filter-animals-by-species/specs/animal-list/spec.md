## ADDED Requirements

### Requirement: Filter animal list by species
The system SHALL let a zoo manager filter the animal list view at `/animals` by species using a filter control that offers every species present in the list. The list SHALL update immediately when a species is selected. An active filter SHALL be clearly visible and SHALL be resettable with a single click. Without an active filter, all animals SHALL be shown.

#### Scenario: No filter active
- **WHEN** a zoo manager navigates to `/animals`
- **THEN** no species filter is active and all animals are displayed

#### Scenario: Filtering by species
- **WHEN** a zoo manager selects a species in the filter control
- **THEN** the list immediately shows only animals of that species, and the selected species is visible as the active filter

#### Scenario: Resetting the filter
- **WHEN** a zoo manager activates the reset action while a species filter is active
- **THEN** the filter is cleared and all animals are displayed again

#### Scenario: Filter options
- **WHEN** a zoo manager opens the filter control
- **THEN** it offers each distinct species of the registered animals exactly once
