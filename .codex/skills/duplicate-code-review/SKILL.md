---
name: duplicate-code-review
description: Detect existing repository implementations that duplicate or materially overlap with code being planned or changed.
---

# Duplicate Code Review

Use this skill before adding a helper, utility, hook, component behaviour, or
service method, and after implementing one when the user asks for a duplicate
code check. Its purpose is to surface reusable code to the main agent; it does
not authorize refactoring or edits on its own.

Delegate the read-only investigation to the `reuse-scout` repository agent.
Give it the request, the relevant planned or changed symbols/files, and any
constraints that determine whether reuse is acceptable. Ask it to inspect the
working-tree diff when applicable.

Review the scout's evidence before acting:

- Reuse an existing implementation when its contract satisfies the new need.
- For material overlap, compare contracts and choose the smallest safe
  consolidation only if the requested work authorizes it.
- Keep implementations separate when their responsibilities genuinely differ;
  record the reason in the handoff or implementation summary.

Do not treat a matching name, folder, or a similar-looking snippet as proof of
duplication. Preserve project conventions and unrelated user changes.
