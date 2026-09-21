---
name: bug
description: Diagnose, correct, or finalize a bugfix in this repository. Use when the user invokes /bug with a description, /bug investigate, or /bug end.
---

# Bug

Route exactly one action, then read only its action file:

- `/bug <description>` or `/bug investigate <description>` → [investigate](actions/investigate.md)
- `/bug end` → [end](actions/end.md)

Ask for a valid action and bug description when they are missing. The selected action file is the source of truth.
