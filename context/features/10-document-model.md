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

- [ ] Le type `MarkdownDocument` existe.
- [ ] Le document courant est stocké dans un state.
- [ ] Le contenu de l'éditeur provient du document courant.
- [ ] Le modèle est réutilisable pour la version Tauri.

## Depends On

- `04-markdown-state.md`
