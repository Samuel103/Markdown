---
name: bug-investigate
description: Diagnose and plan a repository bugfix without implementing it until explicitly approved.
---

# Investigate a bug

Use these instructions for `/bug <description>` or `/bug investigate <description>`.

1. Read the repository instructions and `context/project-overview.md`, `context/rules.md`, and `context/current-context.md`. Examine relevant code, configuration, tests, and traces; base conclusions on verifiable evidence.
2. Before the first bug-related file modification, including `context/current-context.md`, create and check out a dedicated branch such as `bug/<short-description>`. Check the branch and worktree first; preserve existing changes and never overwrite a branch. If this requires moving unrelated changes or a conflict prevents it, stop and ask the user.
3. Update only `# Current bug status` when the problem is described and when material evidence changes. Preserve the other sections. Record status, expected and observed behavior, evidence, possible or confirmed causes, and the active plan. Clearly distinguish hypotheses from confirmed causes.
4. Present possible causes, confidence, and a concrete correction plan: affected files, intended changes, risks, and validation. Do not modify application code at this stage.
5. Continue investigating and update the status and plan as the user provides evidence or asks for another lead.

Implement only after the user explicitly asks to correct the bug or apply the plan. Then implement only the approved plan, run proportionate validation, update `# Current bug status` with the outcome and follow-up, and summarize the changes and checks.

Keep the context status and communication in the user's language unless asked otherwise. If the bug cannot be reproduced or requires a user decision, say so in the status and plan rather than presenting a hypothesis as fact.
