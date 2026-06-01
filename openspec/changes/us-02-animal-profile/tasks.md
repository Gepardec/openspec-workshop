## 1. Backend — REST endpoint

- [x] 1.1 Add `GET /animals/{id}` handler to the existing `AnimalResource` returning the animal by ID (200) or 404 when not found
- [x] 1.2 Write a RestAssured `@QuarkusTest` covering the 200 OK scenario with all fields including `notes`
- [x] 1.3 Write a RestAssured `@QuarkusTest` covering the 404 Not Found scenario for a non-existent ID

## 2. Frontend — state

- [x] 2.1 Extend the animals NgRx Signal Store with a `selectedAnimal` signal and a `loadById(id)` method that fetches `GET /animals/{id}`
- [x] 2.2 Handle loading and error states in the store for the single-animal fetch

## 3. Frontend — animal profile component

- [x] 3.1 Create `AnimalProfileComponent` at `src/app/domains/animals/animal-profile/` (`.ts`, `.html`, `.scss`)
- [x] 3.2 Read the `:id` route param via `inject(ActivatedRoute)` and trigger `loadById` on init
- [x] 3.3 Display all animal fields (`name`, `species`, `age`, `enclosure`, `notes`) using Angular Material components
- [x] 3.4 Show a user-friendly error message when the animal is not found (404 case)
- [x] 3.5 Add a back-navigation control (button or link) that routes to `/animals`
- [x] 3.6 Add Transloco keys for all user-visible labels (German `de` and English `en` translation files)

## 4. Frontend — routing

- [x] 4.1 Register the `/animals/:id` route in the animals feature routing, lazy-loading `AnimalProfileComponent`
- [x] 4.2 Add `[routerLink]="['/animals', animal.id]"` to each row in `AnimalListComponent` so rows link to their profile

## 5. Verification

- [x] 5.1 Run ESLint (`pnpm lint`) and fix any violations
- [x] 5.2 Run the Quarkus backend tests (`mvn test`) and confirm all pass
