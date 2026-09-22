# Feature — New Document

## Goal

Permettre de créer un nouveau document Markdown vide.

## Tasks

- Ajouter une action `New`.
- Réinitialiser le contenu.
- Utiliser `untitled.md` comme nom.
- Mettre `isDirty` à `false`.
- Préparer la gestion des changements non sauvegardés.

## Expected Result

```ts
{
  fileName: 'untitled.md',
  content: '',
  isDirty: false
}
```

## Acceptance Criteria

- [x] New vide l'éditeur.
- [x] Le nom devient `untitled.md`.
- [x] La preview est vidée.
- [x] `isDirty` revient à `false`.

## Depends On

- `10-document-model.md`
