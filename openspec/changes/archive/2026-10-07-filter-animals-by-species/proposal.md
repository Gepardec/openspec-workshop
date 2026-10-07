# Proposal

## Why

In large zoos the animal list grows long, and zoo managers have to scroll through every row to find all animals of one species. A species filter lets them narrow the list in one step.

## What Changes

- Add a species filter (dropdown) to the animal list view at `/animals`
- The list updates immediately when a species is selected
- An active filter is clearly visible and can be reset with one click
- Without an active filter, all animals are shown
- Filtering happens in the browser; no API change

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `animal-list`: Add a requirement for filtering the animal list view by species

## Impact

- **Frontend**: `animal-list` component (template, class, styles) in `src/app/domains/animals/feature/animal-list/`; new Transloco keys in `de.json` and `en.json`
- **Backend**: none; `GET /animals` already returns every animal with its `species`
- **Tests**: no new backend tests (no API change); no frontend tests in this project, verification via `ng build`, `ng lint` and a manual check in the running app
