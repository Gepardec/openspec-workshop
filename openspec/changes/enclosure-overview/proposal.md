# Proposal

## Why

Zoo managers can see which enclosure a single animal lives in, but not which animals share an enclosure or how many animals an enclosure holds. An overview of all enclosures answers both questions at a glance.

## What Changes

- Add a REST endpoint `GET /enclosures` that returns every enclosure in use, with its animal count and its animals
- Add an enclosure overview page at `/enclosures` that lists each enclosure with the number of animals and the animals living there; each animal links to its profile
- Add a navigation entry to the overview in the application shell
- Enclosures remain the free-text `enclosure` attribute of an animal; there is no enclosure entity, and animals without an enclosure do not appear in the overview

## Capabilities

### New Capabilities

- `enclosure-overview`: Overview of all enclosures with animal counts and the animals housed in each, via REST API and UI

### Modified Capabilities

_(none - existing animal specs do not change)_

## Impact

- **Backend**: New `EnclosureResource` serving `GET /enclosures` (grouping `Animal` by `enclosure`), plus a response record; RestAssured tests (`@QuarkusTest`) for the endpoint
- **Frontend**: New `enclosures` domain (`src/app/domains/enclosures/`) with model, service, signal store and a page component; new route `/enclosures`; navigation link in `app.html`; Transloco keys in `de.json` and `en.json`
- **Out of scope**: managing enclosures (create/edit/delete), capacities, assigning animals to enclosures
