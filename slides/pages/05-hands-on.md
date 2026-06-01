---
layout: section
---

# Hands-on Exercises

---

# Exercise Setup

Clone the workshop repo and install the CLI:

```sh
git clone <repo-url>
cd openspec-workshop
npm install -g openspec   # or: pnpm / yarn
```

Start the app:

```sh
cd app/zoo-management
./mvnw quarkus:dev
```

---

# Exercise 1 — Navigate the Changes

Use `list`, `show`, and `status` to explore the six proposed changes.

**Goal:** answer the quiz questions without looking at the files directly.

---

# Exercise 2 — Implement a Change

Pick a change that has all four artifacts complete.

```sh
openspec status --change <your-choice>
openspec instructions <your-choice>
```

Paste the instructions into Claude Code (or your AI of choice) and implement the first task.

---

# Exercise 3 — Propose Your Own Change

Think of a small feature for the zoo app. Use the CLI to scaffold a new change:

```sh
openspec propose
```

Fill in the proposal interactively, then review the generated artifacts.
