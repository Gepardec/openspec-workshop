## 1. Backend — Entity & Database

- [ ] 1.1 Create `Animal` Panache entity with fields `id` (auto), `name`, and `species`
- [ ] 1.2 Verify the `animals` table is created on startup (Hibernate auto-ddl in dev mode)

## 2. Backend — REST Endpoint

- [ ] 2.1 Create `AnimalResource` JAX-RS class with `GET /animals` returning `Animal.listAll()`
- [ ] 2.2 Confirm the endpoint returns `200 OK` with a JSON array (manual smoke test or logs)

## 3. Backend — Acceptance Test

- [ ] 3.1 Write a `@QuarkusTest` RestAssured test: `GET /animals` returns `200` with a JSON array
- [ ] 3.2 Write a RestAssured test: empty database returns `200` with `[]`
- [ ] 3.3 Run `./mvnw test` and confirm all tests pass

## 4. Frontend — Animal Model & Service

- [ ] 4.1 Create `Animal` TypeScript interface (id, name, species) in `src/app/domains/animals/`
- [ ] 4.2 Create `AnimalService` that calls `GET /animals` and returns an `Observable<Animal[]>`

## 5. Frontend — NgRx Signal Store

- [ ] 5.1 Create `AnimalStore` in `src/app/domains/animals/animal-list/` using `withEntities<Animal>()` and `withCallStatus()`
- [ ] 5.2 Add a `loadAnimals` method that calls `AnimalService` and sets entities on success

## 6. Frontend — List Component

- [ ] 6.1 Create `AnimalListComponent` (`.ts`, `.html`, `.scss`) in `src/app/domains/animals/animal-list/`
- [ ] 6.2 Inject `AnimalStore`; trigger `loadAnimals` on init using an `effect()`
- [ ] 6.3 Render animals in an `<mat-table>` or `<mat-list>` showing name and species columns
- [ ] 6.4 Add an empty-state message when the animals array is empty
- [ ] 6.5 Add Transloco translations for all visible strings (`de` and `en`)

## 7. Frontend — Routing & Navigation

- [ ] 7.1 Register the `/animals` lazy route in the shell router pointing to `AnimalListComponent`
- [ ] 7.2 Add a navigation link to the app shell (sidenav or toolbar) that routes to `/animals`
- [ ] 7.3 Verify navigation works end-to-end in the running app
