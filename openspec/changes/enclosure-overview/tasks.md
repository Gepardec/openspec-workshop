## 1. Backend

- [ ] 1.1 Add the `EnclosureResponse` record and `EnclosureResource` (`GET /enclosures`) in `app/zoo-management/src/main/java/com/gepardec/openspecws/`, grouping animals by non-blank enclosure, sorted by names; verify the tests from 1.2 pass
- [ ] 1.2 Add `EnclosureResourceTest` (RestAssured, `@QuarkusTest`) covering the three scenarios of `GET /enclosures`; verify with `./mvnw test` in `app/zoo-management`

## 2. Frontend - data

- [ ] 2.1 Create the `enclosures` domain model, service and signal store (`src/app/domains/enclosures/`); verify with `ng build`

## 3. Frontend - overview page

- [ ] 3.1 Create the `enclosure-overview` page component (`.ts`, `.html`, `.scss`) with expansion panels, animal links and an empty state, and add the `/enclosures` route; verify in the running app that enclosures with counts and animals are shown
- [ ] 3.2 Add the navigation link to `app.html`; verify it is visible and navigates to `/enclosures`
- [ ] 3.3 Add all new Transloco keys in `public/i18n/de.json` and `public/i18n/en.json`; verify German and English texts in the running app

## 4. Verification

- [ ] 4.1 Run `ng build`, `ng lint` and `npx prettier --check` on touched files in `app/zoo-management/src/main/webui`, and `./mvnw test`; verify all are green
