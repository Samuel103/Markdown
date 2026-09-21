# Repository instructions

Before creating a reusable React or TypeScript abstraction (component, hook, helper, type, shared state, utility, validator, client, or CSS/Tailwind pattern), run `Reuse Scout` (`.github/agents/reuse-scout.agent.md`). Give the intended behavior, inputs/outputs, likely area, related files, and domain terms; wait for its evidence.

Use its result: `REUSE` an adequate candidate, `EXTEND` one when appropriate, or `CREATE` only when none fits. The main agent makes and applies the decision. Skip the scout for documentation, typos, configuration, obvious one-line edits, and non-behavioral test assertions.
