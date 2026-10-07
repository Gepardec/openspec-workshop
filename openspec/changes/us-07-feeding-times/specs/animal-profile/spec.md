## ADDED Requirements

### Requirement: Feeding times on the animal profile
The system SHALL show the animal's daily feeding times on the profile view at `/animals/:id`, sorted by time of day.

#### Scenario: Animal has feeding times
- **WHEN** a zoo manager views the profile of an animal with feeding times
- **THEN** the page lists all feeding times in ascending order

#### Scenario: Animal has no feeding times
- **WHEN** a zoo manager views the profile of an animal without feeding times
- **THEN** the page shows a hint that no feeding times are planned
