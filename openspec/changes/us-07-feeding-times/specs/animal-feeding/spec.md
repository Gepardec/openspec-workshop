## ADDED Requirements

### Requirement: List feeding times via REST API
The system SHALL expose a `GET /animals/{id}/feedings` endpoint that returns the daily feeding times of the animal as a JSON array, sorted by time of day. Each item SHALL include the `time` in `HH:mm` format.

#### Scenario: Animal has feeding times
- **WHEN** a client sends `GET /animals/{id}/feedings` for an animal with feeding times
- **THEN** the response status is `200 OK` and the body is a JSON array of feeding times sorted by `time`

#### Scenario: Animal not found
- **WHEN** a client sends `GET /animals/{id}/feedings` for an ID that does not exist
- **THEN** the response status is `404 Not Found`

### Requirement: Feeding time per animal is unique
The system SHALL reject a feeding time that already exists for the same animal.
