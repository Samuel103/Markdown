# Feature — Markdown Live Preview

## Goal

Afficher le rendu HTML du Markdown en temps réel.

## Dependencies

```bash
npm install react-markdown
```

## Tasks

- Installer `react-markdown`.
- Créer `MarkdownPreview`.
- Ajouter une prop `markdown`.
- Rendre le contenu Markdown.
- Connecter la preview au state principal.
- Vérifier que le rendu se met à jour à chaque modification.

## Acceptance Criteria

- [x] Les titres sont rendus.
- [x] Les paragraphes sont rendus.
- [x] Les listes sont rendues.
- [x] La preview se met à jour immédiatement.
- [x] Aucun state Markdown séparé n'est créé dans la preview.

## Depends On

- `04-markdown-state.md`
