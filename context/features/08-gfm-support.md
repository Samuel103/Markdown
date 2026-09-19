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

- [ ] Les tables fonctionnent.
- [ ] Les checkboxes fonctionnent.
- [ ] Le strikethrough fonctionne.
- [ ] Les autolinks fonctionnent.

## Depends On

- `07-markdown-preview.md`
