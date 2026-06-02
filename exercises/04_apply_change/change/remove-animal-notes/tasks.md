## 1. Backend — Entity & Seed Data

- [ ] 1.1 Remove the `notes` field from `Animal.java` (`app/zoo-management/src/main/java/com/gepardec/openspecws/Animal.java`)
- [ ] 1.2 Remove the `notes` column from all `INSERT` statements in `import.sql` (`app/zoo-management/src/main/resources/import.sql`)

## 2. Backend — Tests

- [ ] 2.1 Remove all `notes` assertions (`.body("notes", ...)`) from `AnimalResourceTest.java`
- [ ] 2.2 Remove the `notes` parameter from the `persistAnimal` helper method in `AnimalResourceTest.java` and update all call sites

## 3. Frontend — Model

- [ ] 3.1 Remove the `notes` property from the `Animal` interface (`src/app/domains/animals/model/animal.ts`)
- [ ] 3.2 Remove the `notes` property from the `AnimalCreateDto` interface (`src/app/domains/animals/model/animal-create-dto.ts`)

## 4. Frontend — Create Form

- [ ] 4.1 Remove the `notes` form control from the `animal-create` component TypeScript file
- [ ] 4.2 Remove the notes `<mat-form-field>` block from `animal-create.html`

## 5. Frontend — Edit Form

- [ ] 5.1 Remove the `notes` form control from the `animal-edit` component TypeScript file
- [ ] 5.2 Remove the notes `<mat-form-field>` block from `animal-edit.html`

## 6. Frontend — Profile View

- [ ] 6.1 Remove the notes `<mat-list-item>` block from `animal-profile.html`

## 7. Frontend — i18n

- [ ] 7.1 Remove the `notes` translation keys from `public/i18n/de.json` (under `animalCreate.fields`, `animalEdit.fields`, and `animalProfile.fields`)
- [ ] 7.2 Remove the corresponding `notes` keys from `public/i18n/en.json`
