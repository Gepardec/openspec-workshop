## Why

Keepers plan their rounds around feeding times, but the app does not know when an animal is fed. Today this lives on paper lists next to the enclosures, so a zoo manager cannot see at a glance which animal is due next.

## What Changes

- Add one or more daily feeding times (time of day) to an animal
- Expose the feeding times through a dedicated REST sub-resource `GET /animals/{id}/feedings`
- Show the feeding times on the animal profile

## Capabilities

### New Capabilities

- `animal-feeding`: Daily feeding times of an animal, readable via REST

### Modified Capabilities

- `animal-profile`: Show the feeding times on the profile view

## Impact

- **Backend**: New `Feeding` entity linked to `Animal`, new sub-resource under `/animals/{id}/feedings`, seed data in `import.sql`
- **Frontend**: Feeding times section on the animal profile, Transloco keys (de + en)
- **Tests**: RestAssured tests for `GET /animals/{id}/feedings`
