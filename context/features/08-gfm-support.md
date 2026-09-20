# Feature — GitHub Flavored Markdown

## Goal

Ajouter le support GitHub Flavored Markdown.

## Dependencies

```bash
npm install remark-gfm
```

## Tasks

- Ajouter `remark-gfm`.
- Brancher le plugin à `react-markdown`.
- Tester les tables.
- Tester les task lists.
- Tester le strikethrough.
- Tester les autolinks.

## Test Content

```md
- [x] Done
- [ ] Todo

~~Deprecated~~

| Name | Status |
|---|---|
| Editor | Done |
```

## Acceptance Criteria

- [x] Les tables fonctionnent.
- [x] Les checkboxes fonctionnent.
- [x] Le strikethrough fonctionne.
- [x] Les autolinks fonctionnent.

## Depends On

- `07-markdown-preview.md`
