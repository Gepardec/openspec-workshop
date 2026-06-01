---
layout: section
---

# Moment 2: CLI as Agent Bridge

OpenSpec instructions — deep dive — 15 min

---

# The Gap

AI agents are powerful but **context-blind by default**.

They don't know:
- What the team decided last week
- Which constraints are non-negotiable
- What the next step actually is

The spec is the answer — but only if the agent can read it.

---

# `openspec instructions`

Generates a focused prompt the agent uses to start work on a change.

```sh
$ openspec instructions us-03-add-animal
```

The output is a structured prompt that tells the agent:
- What change to implement
- Which task to start with
- Which specs and design decisions are relevant

---

# What's Inside the Instructions?

```
1. Change summary (from proposal)
2. Active task (from tasks.md)
3. Relevant specs (from specs.md)
4. Design constraints (from design.md)
5. Project conventions (from openspec/config.yaml)
```

The agent gets exactly what it needs — no more, no less.

---

# The Agent Loop

```
openspec instructions → AI reads context → AI implements task
       ↑                                          ↓
openspec apply-change ←←←←←←←←←←←←←←←←← task complete
```

The CLI drives the loop. The agent does the work. You review the diff.

---

# Why This Matters

- The agent can't hallucinate requirements — they're in the spec
- Decisions are auditable — they're in the proposal
- Onboarding is self-serve — `openspec show` is the answer

The spec isn't documentation. **It's the operating memory of the team.**

---

# Live Demo

Walking through a change from `openspec list` to implementation.

```sh
openspec list
openspec show us-03-add-animal
openspec status --change us-03-add-animal
openspec instructions us-03-add-animal
```

Then: hand the output to an AI agent and watch it work.
