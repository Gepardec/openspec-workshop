## Context

The zoo management app already supports listing, viewing, creating, and editing animals. Animals that leave the zoo (transferred, released, or deceased) currently cannot be removed, leaving stale records in the registry. This change adds a hard-delete capability behind a confirmation step to prevent accidental data loss.

## Goals / Non-Goals

**Goals:**
- `DELETE /animals/{id}` endpoint returning 204 on success and 404 when the ID is unknown
- Confirmation dialog in the Angular frontend before issuing the request
- Navigate back to `/animals` after successful deletion; animal store updated without a full page reload

**Non-Goals:**
- Soft deletion / archiving (out of scope for this iteration)
- Audit trail or deletion history
- Bulk deletion of multiple animals

## Decisions

**Hard delete over soft delete**
A simple `DELETE` that removes the row is sufficient for the workshop scope. Soft delete would require schema changes (adding an `archived` flag), filtering in every query, and a restore workflow — none of which add educational value here. If retention becomes a requirement in a later iteration, it can be introduced as a new change.

**Confirmation dialog via Angular Material `MatDialog`**
Destructive actions should require explicit user confirmation. `MatDialog` is already available as part of Angular Material and consistent with the existing component library choice. A standalone `AnimalDeleteDialogComponent` keeps the confirmation logic isolated and reusable.

**Navigate to `/animals` after deletion**
The profile page no longer has a subject to display after a successful delete. Redirecting to the list is the natural recovery point and mirrors the pattern used in similar CRUD flows.

**Delete action on the profile page only**
The list view already has per-row navigation to the profile; adding a delete action directly on each list row would increase accidental deletion risk and clutter the list. Keeping the delete action scoped to the profile gives the user a full-context view before committing to the deletion.

**Animal store handles state removal**
The existing NgRx Signal Store for animals manages the local cache. A `delete` method on the store dispatches the HTTP request and, on success, removes the animal from the in-memory signal collection. This keeps the list consistent without a full re-fetch.

## Risks / Trade-offs

[Accidental deletion] → Mitigated by the mandatory confirmation dialog before any HTTP request is issued.

[Deleted ID referenced from elsewhere] → Currently animals are standalone entities with no foreign-key dependents in scope. If enclosures or staff assignments are introduced later, the backend should enforce referential integrity via database constraints or application-level checks.

[Race condition: profile loaded, then deleted by another session] → On navigation to a profile that no longer exists, the existing 404 handling (shown in US-02/US-04) already covers this case.

## Migration Plan

No schema migrations required — the `animals` table already exists and Panache's `deleteById` (or entity `delete()`) handles the row removal. Deployment is a standard rolling update.
