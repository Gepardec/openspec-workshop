## 1. Backend — Data Model

- [ ] 1.1 Add nullable `fun_fact` column to the `Animal` entity and map it as a field
- [ ] 1.2 Update `import.sql` seed data to set a fun fact for the featured animal (e.g., the cheetah)
- [ ] 1.3 Add `dashboard.spotlight.animal-id` config property to `application.properties`

## 2. Backend — Spotlight Endpoint

- [ ] 2.1 Create `SpotlightResponse` DTO with fields: `id`, `name`, `species`, `age`, `enclosure`, `funFact`
- [ ] 2.2 Implement `DashboardResource` with `GET /api/dashboard/spotlight` — reads configured animal ID, fetches entity, returns DTO or 404
- [ ] 2.3 Write `@QuarkusTest` RestAssured test covering the 200 response and the 404 (misconfigured ID) case

## 3. Frontend — Dashboard Domain

- [ ] 3.1 Create domain directory `src/app/domains/dashboard/spotlight/`
- [ ] 3.2 Create `SpotlightStore` (NgRx Signal Store) that loads `GET /api/dashboard/spotlight` and exposes `spotlight`, `loading`, and `error` signals
- [ ] 3.3 Create `SpotlightService` that calls the endpoint and returns an `Observable<SpotlightResponse>`

## 4. Frontend — Dashboard Component

- [ ] 4.1 Create `DashboardPageComponent` (`app-dashboard-page`) with `ChangeDetectionStrategy.OnPush`; inject `SpotlightStore` and trigger load on init
- [ ] 4.2 Create template and styles: show spotlight card (name, species, age, enclosure, fun fact) using Angular Material `mat-card`; show loading spinner and error state
- [ ] 4.3 Add "View profile" button/link on the card that routes to `/animals/:id`
- [ ] 4.4 Add Transloco translation keys for all visible labels (German `de` + English `en`)

## 5. Frontend — Routing & Navigation

- [ ] 5.1 Add `/dashboard` lazy route to the app router pointing to `DashboardPageComponent`
- [ ] 5.2 Set the root redirect (`/`) to `/dashboard`
- [ ] 5.3 Add a "Dashboard" nav link to the shell navigation component with the correct Transloco label
