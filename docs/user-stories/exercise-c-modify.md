# Exercise C — MODIFY: Dashboard

## Delta type
MODIFY

## Context
The baseline dashboard (US-06) is an animal spotlight — it features one highlighted animal (the cheetah) with a large card, key stats, and a fun fact. A developer might build this thinking "zoo management = showcase animals," and it makes for a visually engaging starting screen.

The correct interpretation, however, is that the dashboard serves the zoo *manager* — not a visitor. A manager needs an operational overview: how many animals are registered, how many are flagged for a vet check, which feedings are due today, and whether any enclosures are at capacity.

## User story to modify
**US-06** (modified) — As a zoo manager, I want a dashboard that shows an operational overview of the zoo — including animal count, animals flagged for vet checks, and feedings due today — so I can assess the zoo's status at a glance.

## What participants do
Write a delta spec that redefines the dashboard's purpose and content. The route stays the same, but the spec changes what data is shown and why. Participants must reason about the original intent vs. the correct intent.

## Learning outcome
Participants experience that MODIFY deltas are not just tweaks — they can represent a fundamental reinterpretation of a feature's purpose. The spec must explain the *why*, not just the *what*.

---

> **Note:** This exercise is most impactful after Exercise A (REMOVE) and Exercise B (ADD), because the operational metrics on the dashboard (vet flags, feeding due today) reference features introduced or cleaned up in those exercises.
