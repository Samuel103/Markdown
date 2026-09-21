# Repository instructions

## Reuse Scout

Before creating a new reusable TypeScript or React abstraction, invoke the
`Reuse Scout` agent (`.github/agents/reuse-scout.agent.md`) when the change may
introduce a component, custom hook, function, helper, utility, type, schema,
validator, API client, shared state pattern, CSS/Tailwind pattern or other
shared UI primitive.

Give the agent a concise description of the intended behavior, expected inputs
and outputs, the likely architectural area, related files and relevant domain
terms. Wait for its result before implementing. The main agent remains solely
responsible for deciding and applying the change from the scout's evidence:

- `REUSE`: use the existing implementation.
- `EXTEND`: extend or refactor the existing implementation when appropriate.
- `CREATE`: create a new implementation only when no suitable candidate exists.

Do not invoke the agent for documentation-only changes, trivial typo fixes,
configuration-only changes, or obvious one-line edits to existing code.
