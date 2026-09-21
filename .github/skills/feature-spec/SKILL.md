---
name: feature-spec
description: "Create a numbered feature specification in context/features using this repository's standard filename and document structure. Use when the user asks to add or draft a feature file, not to implement a feature."
---

# Feature Spec

Create exactly one feature specification at `context/features/` unless the user requests otherwise.

## Naming

- Inspect the existing feature filenames before choosing a number.
- Name the file `NN-kebab-case-title.md`, where `NN` is the next available two-digit number after the highest numbered feature file. Do not use `00`, which is reserved for the roadmap.
- Derive the kebab-case title from the feature title. Keep the number and filename in English-style ASCII kebab case, as in `26-desktop-window-title.md`.
- Do not overwrite an existing feature file.

## Required document format

Use French content and this exact section order. Replace every placeholder with information specific to the requested feature; do not leave template text behind.

```md
# Feature — <Feature title>

## Goal

<One concise statement of the intended user or product outcome.>

## Tasks

- [ ] <Concrete implementation task>

## Acceptance Criteria

- [ ] <Observable condition that confirms the feature works.>

## Depends On

Aucune dépendance.
```

Use unchecked checkboxes for all new tasks and acceptance criteria. When the feature relies on existing work, replace `Aucune dépendance.` with a bullet list of relative feature filenames, for example `- \`10-document-model.md\``. Keep the title in title case and use the `# Feature —` prefix exactly.

Keep the specification focused on the requested feature and on the project's simple Markdown-editor scope. Do not add optional sections, commands, technical decisions, or implementation detail unless the user explicitly asks for them.

After creating the file, report its path and the number selected.
