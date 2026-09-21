---
name: end-bug
description: Review the current branch's bugfix work, present findings for approval before changes, then commit, merge, and push main when clear.
---

# End Bug

Use this skill when the user invokes `/end-bug` to close a bugfix in this repository. It reviews the complete current-branch change set, including committed work not yet in `main` and local worktree changes.

## Review

1. Read the repository instructions and their required context files, including `context/current-context.md`.
2. Determine the current branch, repository status, and its safe comparison base: use the locally available `origin/main` when it exists, otherwise local `main`. Inspect the branch diff, staged and unstaged diffs, and untracked files separately. Never discard, reset, stash, or overwrite user work.
3. Review the changes for bug correctness, regressions, maintainability, and consistency with the reported bug. Run relevant available validation proportionate to the changes.
4. Perform a security review appropriate to the changes. At minimum, inspect exposed secrets, unsafe input/rendering or injection paths, authorization or data-exposure regressions, insecure dependency changes, and missing security-relevant validation. State any checks that could not run.
5. Report findings with file and location where practical, separating blocking issues, recommended improvements, and security findings. Include validation results.

## Approval gate

If a finding requires a code or configuration change, describe the concrete correction and wait for the user's explicit approval before changing anything. Do not commit, merge, or push while an unapproved blocking or security finding remains.

After approval, apply only the approved corrections, rerun the relevant checks, and repeat the review. If the user declines a non-blocking recommendation, record that decision and continue only when safe. Never treat silence or an earlier request to run `/end-bug` as approval to fix a reported finding.

## Finalize

Only after the review has no blocking or security findings:

1. Restore `context/current-context.md` exactly from [the bundled template](assets/current-context-template.md).
2. Confirm the final diff contains only reviewed bugfix work, the context reset, and no unrelated user changes. Confirm a Git author identity is available. Stage only those reviewed paths and create one concise conventional commit on the current branch. Never amend or rewrite existing commits.
3. If the current branch is not `main`, merge it into local `main` with a non-destructive merge. If already on `main`, state that no merge was needed. Do not rebase, force-push, overwrite a branch, or resolve merge conflicts automatically.
4. Verify local `main` is clean, then push it with a normal non-force push to its configured remote. If no suitable remote exists, the branch is protected, authentication fails, or Git reports any merge or push error, stop and ask the user for direction.
5. Summarize review and security findings, validation, the commit hash, merge result, and push result.

The context reset, commit, merge, and normal push to `main` are part of this explicit `/end-bug` workflow. Ask again before any action outside this reviewed bugfix workflow.
