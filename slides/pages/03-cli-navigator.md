---
layout: section
---

# Moment 1: CLI as File Navigator

`list` · `show` · `status` — 5 min

---

# `openspec list`

See all proposed changes at a glance.

```sh
$ openspec list
```

Shows each change with its task count and artifact status — your project's backlog at a glance.

---

# `openspec show <change>`

Read a change's full context.

```sh
$ openspec show us-05-delete-animal
```

Returns the proposal, specs, design, and tasks in one readable output — everything the team agreed to.

---

# `openspec status --change <change>`

Check which artifacts are complete.

```sh
$ openspec status --change us-01-animal-list
```

Four artifacts required by `spec-driven`: proposal → specs → design → tasks.

A change is only ready to implement when all four are present.

---

# Hands-on: Quiz Round 1

Open the quiz and answer questions **1–12** using only the three commands.

```sh
openspec list
openspec show <change>
openspec status --change <change>
```

You have **5 minutes** — go!
