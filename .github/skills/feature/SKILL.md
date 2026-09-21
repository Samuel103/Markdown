---
name: feature
description: "Route feature planning, implementation, and completion commands for this repository. Use when the user invokes /feature load, /feature implement, or /feature end."
---

# Feature

Use this skill as an explicit command router for a single feature lifecycle. The
command shape is:

```text
/feature <action> [argument]
```

Select exactly one action, then read the linked instruction file before taking
action. Treat everything after the action name as that action's argument; do
not infer an action from the argument or combine several actions in one turn.

| Command | Argument | Instructions |
| --- | --- | --- |
| `/feature load <feature-markdown-file>` | Required path or accessible reference to the Markdown feature specification. | Read [actions/load.md](actions/load.md). |
| `/feature implement` | None. | Read [actions/implement.md](actions/implement.md). |
| `/feature end` | None. | Read [actions/end.md](actions/end.md). |

If the action is missing or unknown, ask the user to choose `load`, `implement`,
or `end`. For `load`, ask for the feature Markdown file when it is missing.

The action files are the source of truth for their respective workflows. Do not
load an unrelated action file.
