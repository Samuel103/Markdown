# Feature — Document Model

## Goal

Créer un modèle représentant le document Markdown courant.

## Suggested Type

```ts
export type MarkdownDocument = {
  fileName: string
  content: string
  isDirty: boolean
}
```

## Tasks

- Créer `src/types/document.ts`.
- Remplacer progressivement le simple state `markdown`.
- Conserver le nom de fichier.
- Conserver le contenu.
- Conserver l'état `isDirty`.

## Acceptance Criteria

- [x] Le type `MarkdownDocument` existe.
- [x] Le document courant est stocké dans un state.
- [x] Le contenu de l'éditeur provient du document courant.
- [x] Le modèle est réutilisable pour la version Tauri.

## Depends On

- `04-markdown-state.md`
