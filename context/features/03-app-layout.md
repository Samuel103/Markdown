# Feature — Application Layout

## Goal

Créer le layout principal de l'application.

## UI Structure

```text
┌─────────────────────────────────────────────┐
│ Toolbar                                     │
├──────────────────────┬──────────────────────┤
│ Editor               │ Preview              │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

## Tasks

- Créer `EditorPage`.
- Créer `Toolbar`.
- Créer `MarkdownEditor`.
- Créer `MarkdownPreview`.
- Utiliser toute la hauteur de la fenêtre.
- Diviser la zone principale en deux panneaux.
- Ajouter des placeholders temporaires.

## Suggested Structure

```text
src/
├── components/
│   ├── editor/
│   ├── preview/
│   └── toolbar/
├── pages/
└── App.tsx
```

## Acceptance Criteria

- [ ] La toolbar est visible.
- [ ] L'éditeur est visible.
- [ ] La preview est visible.
- [ ] Les deux panneaux sont côte à côte sur desktop.
- [ ] L'application occupe toute la hauteur disponible.

## Depends On

- `01-project-setup.md`
- `02-tailwind-setup.md`
