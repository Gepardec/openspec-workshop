## 1. Backend — Entity & Seed Data

- [x] 1.1 Remove the `notes` field from `Animal.java` (`app/zoo-management/src/main/java/com/gepardec/openspecws/Animal.java`)
- [x] 1.2 Stop copying `notes` in `updateAnimal` of `AnimalResource.java` (`animal.notes = updatedAnimal.notes;`)
- [x] 1.3 Remove the `notes` column and its value from all `INSERT` statements in `import.sql` (`app/zoo-management/src/main/resources/import.sql`); keep `fun_fact` where present

## 2. Backend — Tests

- [x] 2.1 Remove all `notes` assertions (`.body("notes", ...)`) from `AnimalResourceTest.java`
- [x] 2.2 Remove the `notes` parameter from the `persistAnimal` helper method in `AnimalResourceTest.java` and update all call sites
- [x] 2.3 Remove `notes` from the `insert into animals` statement in `DashboardResourceTest.java`
- [x] 2.4 Assert that `POST /animals`, `PUT /animals/{id}` and `GET /animals/{id}` responses contain no `notes` field (`.body("$", not(hasKey("notes")))`)

## 3. Frontend — Model

- [x] 3.1 Remove the `notes` property from the `Animal` interface (`src/app/domains/animals/model/animal.ts`)
- [x] 3.2 Remove the `notes` property from the `AnimalCreateDto` type and from `initialAnimal` (`src/app/domains/animals/model/animal-create-dto.ts`); the signal forms are built from this model, so the components need no further change

## 4. Frontend — Create Form

- [x] 4.1 Remove the notes `<mat-form-field>` block from `animal-create.html`

## 5. Frontend — Edit Form

- [x] 5.1 Remove the notes `<mat-form-field>` block from `animal-edit.html`

## 6. Frontend — Profile View

- [x] 6.1 Remove the notes `<mat-list-item>` block from `animal-profile.html`

## 7. Frontend — i18n

- [x] 7.1 Remove the `notes` translation keys from `public/i18n/de.json` (under `animalCreate.fields`, `animalEdit.fields`, and `animalProfile.fields`)
- [x] 7.2 Remove the corresponding `notes` keys from `public/i18n/en.json`
