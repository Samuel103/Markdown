---
name: feature-load
description: "Load a Markdown feature specification, record its context, and collaboratively prepare an approved implementation plan without implementing it."
---

# Feature load

Use this action only when the user invokes `/feature load <feature-markdown-file>`.

## Scope

This action prepares a feature; it never implements it. Do not edit application code, create implementation files, or start `/feature implement` work.

## Workflow

1. Read the referenced feature specification, the repository instructions and required context files, and only the code relevant to understanding the feature. If the specification cannot be accessed, ask the user for an accessible path or copy.
2. Update only the `# Current feature overview / goals` section of `context/current-context.md`. Capture the feature's goals, expected behavior, constraints, acceptance criteria, and unresolved questions. Do not change `# Plans` at this stage.
3. Present a plan in the conversation, supported by the specification and code inspection. State the affected files, intended changes, rationale, validation, assumptions, and material risks.
4. Revise the proposed plan in the conversation when the user requests changes. Do not save or implement the plan until the user explicitly approves it.
5. After explicit approval, replace only the `# Plans` section of `context/current-context.md` with the approved plan. Preserve every other section and unrelated user changes.
6. Ask for the user's Git decision before creating or checking out a feature branch. Do not commit, merge, push, rebase, or otherwise change Git history as part of this action. After the decision, wait for `/feature implement` before implementing.

Write the overview and plan in the language used by the feature request unless the user asks for a different language.
