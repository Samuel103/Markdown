# Feature — Toolbar

## Goal

Centraliser les principales actions de l'application.

## Actions

- New
- Open
- Save
- Save As
- Toggle Theme

## Tasks

- Créer une toolbar réutilisable.
- Ajouter les boutons.
- Afficher le nom du document.
- Afficher l'état dirty.
- Ajouter des `aria-label`.
- Garder la logique métier hors du composant.

## Suggested Props

```ts
type ToolbarProps = {
  fileName: string
  isDirty: boolean
  onNew: () => void
  onOpen: () => void
  onSave: () => void
  onSaveAs: () => void
  onToggleTheme: () => void
}
```

## Acceptance Criteria

- [ ] Tous les boutons nécessaires existent.
- [ ] Le nom du fichier est affiché.
- [ ] L'état dirty est visible.
- [ ] La toolbar ne contient pas la logique d'accès fichier.

## Depends On

- `11-new-document.md`
- `12-open-markdown-file.md`
- `13-save-document.md`
- `14-save-as.md`
