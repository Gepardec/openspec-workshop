## Why

The app currently lands the user directly on the animal list with no welcoming context. A dashboard gives zoo managers an engaging entry point that highlights a featured animal — providing quick orientation and a moment of delight when opening the app.

## What Changes

- Add a new `/dashboard` route as the default landing page of the app
- Implement a "spotlight" section that features one animal with its key stats (name, species, age, enclosure) and a fun fact
- Add navigation from the dashboard to the full animal profile
- Update the shell navigation to include a link to the dashboard

## Capabilities

### New Capabilities

- `dashboard`: The dashboard page featuring a spotlight animal with its key stats and a fun fact

### Modified Capabilities

_(none — no existing spec-level behavior changes)_

## Impact

- **Frontend**: New `dashboard` feature module under `src/app/domains/dashboard/` (or a `shell`-level page); new route `/dashboard` set as the app's default redirect
- **Backend**: New REST endpoint `GET /api/dashboard/spotlight` returning the featured animal with its stats and fun fact
- **Navigation**: Shell nav bar updated with a Dashboard link
