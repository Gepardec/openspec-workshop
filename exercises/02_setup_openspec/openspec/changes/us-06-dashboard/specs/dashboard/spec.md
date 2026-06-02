## ADDED Requirements

### Requirement: Dashboard displays spotlight animal
The system SHALL present a dashboard page at `/dashboard` that shows one featured animal as a spotlight card. The card SHALL display the animal's name, species, age, enclosure, and a fun fact.

#### Scenario: User opens dashboard
- **WHEN** a user navigates to `/dashboard`
- **THEN** the page displays a spotlight card for the featured animal with its name, species, age, enclosure, and fun fact visible

#### Scenario: No featured animal configured
- **WHEN** the backend cannot resolve the configured featured animal (e.g., it has been deleted)
- **THEN** the dashboard displays an error message indicating the spotlight is unavailable

### Requirement: Dashboard links to animal profile
The system SHALL provide a navigation action on the spotlight card that takes the user to the featured animal's full profile page.

#### Scenario: User clicks spotlight card link
- **WHEN** a user clicks the "View profile" action on the spotlight card
- **THEN** the app navigates to the animal profile page for the featured animal

### Requirement: App defaults to dashboard
The system SHALL redirect users who navigate to the root URL to the dashboard.

#### Scenario: User opens root URL
- **WHEN** a user navigates to `/`
- **THEN** the app redirects to `/dashboard`

### Requirement: Backend serves spotlight data
The system SHALL expose `GET /api/dashboard/spotlight` returning the featured animal's stats and fun fact.

#### Scenario: Spotlight animal exists
- **WHEN** `GET /api/dashboard/spotlight` is called and the featured animal exists
- **THEN** the response is `200 OK` with a JSON body containing `id`, `name`, `species`, `age`, `enclosure`, and `funFact`

#### Scenario: Featured animal not found
- **WHEN** `GET /api/dashboard/spotlight` is called and the configured animal ID does not exist
- **THEN** the response is `404 Not Found`
