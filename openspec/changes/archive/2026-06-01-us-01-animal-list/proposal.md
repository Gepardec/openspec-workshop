## Why

The zoo management app needs a starting point for animal management. Without a way to list all registered animals, zoo managers have no overview of the animals in their care — this is the foundational capability that all other animal management features depend on.

## What Changes

- Introduce a new animal list view accessible from the app navigation
- Expose a REST endpoint to retrieve all animals from the database
- Display animals in a tabular or list format with key identifying information (name, species)
- Provide navigation from the list to individual animal profiles (US-02)

## Capabilities

### New Capabilities

- `animal-list`: Displays all registered animals in a list view, allowing zoo managers to get a quick overview of animals in the zoo. Covers the backend `GET /animals` endpoint and the Angular list component.

### Modified Capabilities

<!-- No existing specs to modify — this is the first animal management capability. -->

## Impact

- **Backend**: New `GET /animals` REST endpoint returning a list of animal resources; new `Animal` entity and database table
- **Frontend**: New Angular route and component under `domains/animals`; new NgRx Signal Store for animal state; navigation entry in the shell
- **Database**: `animals` table introduced (schema migration or Hibernate auto-ddl)
