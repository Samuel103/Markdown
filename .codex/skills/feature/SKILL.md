---
name: feature
description: "Capture a referenced Markdown feature in the project context and iteratively produce its implementation plan without implementing it."
---

# Feature

Use this skill when the user invokes `/feature` with a Markdown document describing a feature for this repository.

This is a planning workflow only. Do not implement the feature, edit application code, or save a plan until the user approves it.

## Workflow

1. Resolve and read the referenced feature Markdown file. If it cannot be read, ask the user to provide a valid accessible reference.
2. Read `context/project-overview.md`, `context/rules.md`, and `context/current-feature.md`. Inspect relevant source files when needed to make the plan evidence-based.
3. Update `context/current-feature.md` under `# Current feature overview / goals` with a concise, faithful overview of the referenced feature: goals, user-visible behavior, constraints, acceptance criteria, and open questions. Preserve the `# Plans` and `# Notes` sections and all unrelated content.
4. Present a detailed draft plan in the conversation. Cover the files to create or modify, the intended changes and their rationale, data/UI or behavior changes, validation, and important assumptions or risks. State any uncertainty plainly.
5. Iterate on the draft using the user's feedback. Do not write it into `# Plans` until the user explicitly confirms that the plan is ready to save.
6. Once approved, replace the content under `# Plans` with the agreed plan, preserving the `# Current feature overview / goals` and `# Notes` sections. Confirm that the plan was saved and stop; wait for a separate request before implementation.

Keep the overview and plan in the language used by the feature request unless the user asks otherwise.
