---
name: feature
description: "Route feature planning, implementation, and completion commands for this repository. Use when the user invokes /feature load, /feature implement, or /feature end."
---

# Feature

Route exactly one command, then read only its action file:

- `/feature load <spec>` → [load](actions/load.md)
- `/feature implement` → [implement](actions/implement.md)
- `/feature end` → [end](actions/end.md)

Ask for a valid action (and a spec for `load`) when missing. The selected action file is the source of truth.
