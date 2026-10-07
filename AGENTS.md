# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Goal

A simple zoo management application for managing animals, enclosures, and staff. It is the reference app of an OpenSpec workshop — intentionally kept approachable so changes are easy to reason about.

## Project Layout

- `app/zoo-management/` — Quarkus application (Maven)
- `app/zoo-management/src/main/webui/` — Angular CLI app, bundled into the Quarkus JAR via Quarkus Quinoa
- `openspec/` — OpenSpec specs and changes; constraints for OpenSpec artifacts are in `openspec/config.yaml`
- `exercises/` — workshop exercises, `slides/` — workshop deck

## Tech Stack

### Backend
- Quarkus (quarkus-rest + quarkus-rest-jackson for JAX-RS/JSON), REST root path `/api`
- Hibernate ORM with Panache, H2 (`drop-and-create`, seed data in `import.sql`)
- Quarkus Quinoa — bundles the Angular build output and serves it from the Quarkus server
- Testing: quarkus-junit, RestAssured, AssertJ

### Frontend
- Angular (standalone components, Angular CLI, pnpm as package manager)
- Zoneless change detection (`provideZonelessChangeDetection()`) with OnPush on every component — no Zone.js
- NgRx Signal Store + NgRx Operators for state management (signal-based, no classic actions/reducers)
- Angular Material + Angular CDK for UI components, TailwindCSS for layout and spacing
- Transloco for i18n (default language German `de`, secondary English `en`)
- RxJS only where reactive streams are genuinely needed; prefer signals otherwise
- ESLint (typescript-eslint, angular-eslint, Sheriff for module boundaries), Prettier with `prettier-plugin-organize-imports`

## Commands

- Run the app: `./mvnw quarkus:dev` in `app/zoo-management` (http://localhost:8080)
- Backend tests: `./mvnw test` in `app/zoo-management`
- Frontend: run Angular CLI commands via `ng` (e.g. `ng generate component ...`, `ng build`, `ng lint`) in `app/zoo-management/src/main/webui`, not via `pnpm`

## Conventions

### Backend
- RESTful API design: plural resource nouns, correct HTTP verbs, meaningful status codes.
- Panache active-record pattern for entities; keep repository logic inside the entity or a dedicated repository class.

### Frontend
- Never use inline components — always separate component files (`.ts` + `.html` + `.scss`).
- All components use `ChangeDetectionStrategy.OnPush`; rely on signals and the async pipe instead of imperative `markForCheck()`.
- Prefer `signal()`, `computed()` and `effect()` over RxJS; use RxJS only for event streams or complex async coordination.
- State lives in NgRx Signal Store feature stores, co-located with their domain feature folder.
- Sheriff boundaries: domain/feature structure at `src/app/domains/<domain>/<feature>`; the app shell (`app.ts`, `app.html`, `app.routes.ts`) sits at the root of `src/app` (Sheriff module `root`). A feature in `domain:animals` must not import from `domain:staff` unless via `domain:shared`.
- Angular Material for all interactive UI; TailwindCSS only for layout, spacing and responsive adjustments — do not duplicate Material styling.
- Component selectors use the `app-` prefix in kebab-case; directive selectors use the `app` prefix in camelCase.
