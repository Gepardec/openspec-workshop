## Context

The animal list (`AnimalListComponent`) renders `animalStore.entities()` in a Material table. The store loads all animals once via `GET /animals`, so every species is already available in the browser. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Filter the displayed rows by species without a new API call
- Derive the filter options from the loaded animals, so no hard-coded species list exists

**Non-Goals:**
- Server-side filtering or a query parameter on `GET /animals`
- Filtering by other fields, free-text search, or persisting the filter in the URL
- Keeping the selected filter across page navigations

## Decisions

### Keep the filter state local to the list component

**Decision**: The selected species lives in a `signal<string | null>` of `AnimalListComponent`; `speciesOptions` and `filteredAnimals` are `computed()` signals derived from `animalStore.entities()`.

**Rationale**: The filter is pure view state used by one component, and signals update the table immediately. This follows the project convention of signals over RxJS.

**Alternative considered**: Put the filter into `AnimalStore`. Rejected - nothing else needs it, and it would widen the store for no benefit.

### Use a Material select with a reset button

**Decision**: A `mat-select` in a `mat-form-field` lists the distinct species (sorted); an active selection is shown in the field, and a button next to it resets the filter (visible only while a filter is active).

**Rationale**: Uses Angular Material as required by the conventions; the form field makes the active filter visible, and a dedicated reset button satisfies the one-click reset.

**Alternative considered**: Free-text input. Rejected - the user story asks for selecting a species, and a dropdown avoids typos.

### Translate all new strings

**Decision**: Add Transloco keys (German default and English) for the filter label and the reset action.

## Risks / Trade-offs

- **[Risk] Selected species disappears after a deletion** → Mitigation: reset the effective filter when the selected species is no longer among the options (compute the filtered list so that an unknown species shows all animals).
- **[Trade-off] Client-side filtering does not scale to very large data sets** → Accepted; the user story explicitly allows it.
