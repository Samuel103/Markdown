# Feature — Dark Mode

## Goal

Ajouter un mode sombre complet.

## Tasks

- Créer un état de thème.
- Appliquer le thème au shell.
- Adapter la toolbar.
- Adapter l'éditeur.
- Adapter la preview.
- Adapter les borders.
- Adapter les dialogs.

## Theme Type

```ts
type Theme = 'light' | 'dark'
```

## Acceptance Criteria

- [ ] Le bouton de thème fonctionne.
- [ ] Toute l'interface passe en dark mode.
- [ ] CodeMirror est lisible en dark mode.
- [ ] La preview est lisible en dark mode.
- [ ] Aucun texte ne devient illisible.

## Depends On

- `06-editor-styling.md`
- `09-preview-styling.md`
- `16-toolbar.md`
