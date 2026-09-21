---
name: feature-load
description: "Capture a referenced Markdown feature in the project context and iteratively produce its implementation plan without implementing it."
---

# Feature

Use these instructions when the user invokes `/feature load <feature-markdown-file>`.

This is a planning workflow only. Do not implement the feature, edit application code, or save a plan until the user approves it.

1. Read the referenced spec, required context, and relevant code. If unavailable, ask for an accessible reference.
2. Update only `# Current feature overview / goals` with goals, behavior, constraints, criteria, and open questions.
3. Present an evidence-based plan: files, changes, rationale, validation, assumptions, and risks. Iterate without saving it until explicitly approved.
4. On approval, replace only `# Plans`; then create and check out a feature branch, stopping for any Git decision. Wait for `/feature implement`.

Keep the overview and plan in the language used by the feature request unless the user asks otherwise.
