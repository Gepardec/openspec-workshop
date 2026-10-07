## 1. Filter logic

- [ ] 1.1 In `animal-list.ts`, add a `selectedSpecies` signal, a computed list of distinct sorted species derived from `animalStore.entities()`, and a computed `filteredAnimals` that returns all animals when no (or an unknown) species is selected; verify with `ng build`

## 2. Filter UI

- [ ] 2.1 In `animal-list.html`, add a `mat-select` species filter (with Material form field) above the table and render `filteredAnimals()` in the table; verify in the running app that selecting a species immediately narrows the list
- [ ] 2.2 Add a reset button that is only visible while a filter is active and clears the selection; verify in the running app that one click shows all animals again
- [ ] 2.3 Adjust `animal-list.scss` for the filter layout; verify visually in the running app

## 3. i18n

- [ ] 3.1 Add the filter label and reset action keys under `animalList` to `public/i18n/de.json` and `public/i18n/en.json`; verify the texts show in both languages in the running app

## 4. Verification

- [ ] 4.1 Run `./mvnw test` in `app/zoo-management`, and `ng build`, `ng lint` and `npx prettier --check` for touched files in `app/zoo-management/src/main/webui`; verify all are green
