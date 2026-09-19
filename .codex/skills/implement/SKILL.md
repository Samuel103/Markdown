---
name: implement
description: "Implement the current repository feature from context/current-feature.md and refine it collaboratively through feedback."
---

# Implement

Use this skill when the user invokes `/implement` to build the feature documented in `context/current-feature.md`.

## Workflow

1. Read the repository instructions (such as `AGENTS.md`) and all project context files they require, including `context/current-feature.md`, before changing code.
2. Confirm that `context/current-feature.md` contains actionable goals and, when available, an approved plan. If requirements are incomplete or materially ambiguous, ask the user for the missing decision before implementation.
3. Inspect the relevant code and implement only the documented feature. Preserve unrelated user changes and follow the repository's conventions.
4. Run the most relevant available checks in proportion to the change, such as lint, tests, or a production build. Clearly report any check that fails or cannot be run.
5. Summarize the implementation and invite the user's feedback. Continue making focused revisions together until the user considers the result coherent and complete; validate each meaningful revision.

Treat `context/current-feature.md` as the source of truth. Do not edit it unless the user asks to update the feature specification, plan, or notes.
