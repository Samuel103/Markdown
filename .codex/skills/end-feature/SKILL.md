---
name: end-feature
description: Review uncommitted feature work, remediate approved findings, then finalize it on main.
---

# End feature

Use this skill when the user invokes `/end-feature` to close the feature currently being worked on in this repository. It reviews only uncommitted work; it does not push to a remote.

## Review

1. Read the repository instructions and their required context files, including `context/current-context.md`.
2. Inspect the current branch, repository status, and the complete staged and unstaged diff. Identify untracked files separately. Never discard, reset, stash, or overwrite unrelated user work.
3. Review the uncommitted changes for correctness, regressions, maintainability, and alignment with the current feature. Run relevant available validation proportionate to the changes.
4. Perform a security review appropriate to the change. At minimum, inspect for exposed credentials, unsafe input/rendering or injection paths, authorization or data-exposure regressions, insecure dependency changes, and missing security-relevant validation. Use dependency/security tooling when it is available and safe to run; clearly report checks that could not run.
5. Report findings, with file and location when practical, separating blocking issues, recommended improvements, and security findings. Also report validation results.

## Approval gate

If any finding requires a code or configuration change, propose the concrete corrections and ask the user to approve them before making any correction. Do not proceed to finalization while unapproved blocking or security findings remain.

After approval, apply only the approved corrections, rerun the relevant checks, and repeat the review until no blocking or security findings remain. If the user declines a non-blocking recommendation, record that decision in the final summary and continue only when it is safe to do so.

## Finalize

Once the review is clear:

1. Restore `context/current-context.md` exactly from [the bundled template](assets/current-feature-template.md).
2. Find the current feature we working on in `context/features` folder and put an x in the completed acceptance criteria.
2. Confirm the final staged/unstaged diff contains only the reviewed feature work and that Git has an author identity available. Stage the reviewed changes, including the restored context file, and create one commit with a concise conventional message that describes the feature. Never amend or rewrite existing commits.
3. Merge that feature branch into local `main` with a non-destructive merge. If already on `main`, commit there and state that no merge was needed. Do not push, force-push, rebase, resolve merge conflicts automatically, or overwrite a branch. Stop and ask the user if a merge conflict, missing Git identity, protected branch, or other Git error requires a decision.
4. Verify the resulting local `main` status and summarize the review, security checks, validation, commit hash, and merge outcome.

The reset of `context/current-context.md`, commit, and local merge are part of this explicit `/end-feature` workflow. Ask again before any action beyond them, especially a remote push or changes outside the reviewed work.
