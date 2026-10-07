## Context

The app currently has no landing page — routing drops the user directly onto the animal list. US-06 introduces a dashboard with an animal spotlight as the default entry point. The spotlight features one animal with its key stats and a fun fact.

## Goals / Non-Goals

**Goals:**
- Add `GET /api/dashboard/spotlight` REST endpoint returning the featured animal's stats and a fun fact
- Add a `/dashboard` Angular route rendered as the app's default page (root redirects to `/dashboard`)
- Display the spotlight card with name, species, age, enclosure, and fun fact
- Provide a link from the spotlight card to the full animal profile

**Non-Goals:**
- Configurable spotlight selection via admin UI (first-pass: fixed animal)
- Real-time or auto-refreshing data
- Aggregated operational statistics (that is Exercise C's concern)
- Internationalisation of the fun fact text (stored as-is from backend)

## Decisions

**1. Dedicated spotlight endpoint vs. reusing `/api/animals/{id}`**

Decision: new `GET /api/dashboard/spotlight` endpoint.

The spotlight response includes a `funFact` field that does not belong on a generic animal resource. A dedicated endpoint keeps the two contracts independent and allows the dashboard to evolve (e.g., rotating spotlight, additional dashboard widgets) without polluting the animal API.

**2. Fixed vs. dynamically selected featured animal**

Decision: fixed animal ID stored in `application.properties` as `dashboard.spotlight.animal-id`.

A first-pass implementation per the user story. Storing the ID in config (rather than hardcoding it in Java) makes it easy to change without a code deploy. Dynamic selection (e.g., "most recently added") is left for a future story.

**3. Frontend module placement**

Decision: new domain `src/app/domains/dashboard/` with a single `spotlight` feature.

The dashboard is a first-class page, not a shell-level utility. A dedicated domain keeps Sheriff boundaries clean and gives the feature room to grow.

## Risks / Trade-offs

- [Risk] Featured animal deleted from the registry → `GET /api/dashboard/spotlight` returns 404, dashboard shows an error state. Mitigation: handle 404 gracefully in the Angular store with a user-visible error message.
- [Risk] Fun fact stored as a plain string on the Animal entity is not i18n-aware. Mitigation: acceptable for the first pass; noted as a follow-up.

## Migration Plan

No schema migration required if `funFact` is added as a nullable column with a default. Seed data for the featured animal's fun fact can be added in the existing `import.sql`. No rollback complexity.
