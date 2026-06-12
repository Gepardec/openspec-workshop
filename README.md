# OpenSpec Workshop

This repository contains all materials for a one-day hands-on workshop about using OpenSpec with AI coding agents.

The goal of the workshop is to help participants move from ad-hoc prompting to a more structured, spec-driven way of working with AI. Instead of relying on chat history as the source of truth, participants learn how to use OpenSpec artifacts to describe intent, scope, behavior, design decisions, and implementation tasks before asking an agent to change code.

This repo is designed as a single source of truth for the workshop. It includes the agenda, slides, exercises, examples, checklists, setup instructions, and a playground codebase where participants can experiment with OpenSpec using the AI agent of their choice.

The repository is pre-configured to work with every agentic tool that supports the `.agents` directory. In addition, it includes explicit setup support for the following tools:

- Claude Code
- Codex
- Cursor
- GitHub Copilot
- Junie
- OpenCode
- Antigravity

By the end of the workshop, participants should be able to:

- understand the core OpenSpec concepts;
- distinguish between current specs, proposed changes, design notes, and implementation tasks;
- use the basic OpenSpec workflow with an AI coding agent;
- review and improve generated OpenSpec artifacts;
- apply the workflow to a small feature or change in an existing codebase;
- take this repository home as a reference for future OpenSpec-based development.

The workshop focuses on the practical OpenSpec loop:

```text
explore → propose → review → apply → sync → archive
```

## Prerequisites
- Java 21+
- Node.js 24+
- pnpm 11+ (`npm i -g pnpm`)
- openspec-CLI (`npm install -g @fission-ai/openspec@latest`)

## Start the app
1. Go into the app directory: `cd app/zoo-management`
2. Launch the app: `./mvnw quarkus:dev`
3. Open http://localhost:8080 in your browser