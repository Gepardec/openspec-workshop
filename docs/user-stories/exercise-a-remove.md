# Exercise A — REMOVE: Animal Notes Field

## Delta type
REMOVE

## Context
The baseline animal profile (US-02) includes a free-text notes field for general observations. This seems like a reasonable addition at first glance, but it has structural problems: it is unstructured, does not capture who wrote what or when, and implicitly pushes the app toward user management. It is also redundant once structured tracking features (feeding log, vet flags) exist.

## User story to remove
**US-02** (modified) — The notes field is removed from the animal profile. The animal profile shows factual, structured data only.

## What participants do
Write a spec delta that removes the notes field from the animal profile — covering both the data model and the UI. They argue in the spec *why* it is being removed, not just *what* is changing.

## Learning outcome
Participants experience that REMOVE deltas are not just deletions — they require justification in the spec and often reveal hidden assumptions in the original design.
