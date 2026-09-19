# Feature — CodeMirror Markdown Editor

## Goal

Remplacer le placeholder d'éditeur par CodeMirror 6.

## Dependencies

```bash
npm install @uiw/react-codemirror @codemirror/lang-markdown
```

## Tasks

- Installer CodeMirror.
- Ajouter le support Markdown.
- Créer les props `value` et `onChange`.
- Brancher CodeMirror au state React.
- Vérifier la saisie en temps réel.
- Vérifier le scroll.

## Acceptance Criteria

- [ ] CodeMirror est affiché.
- [ ] L'utilisateur peut écrire.
- [ ] Le state React est mis à jour.
- [ ] La syntaxe Markdown est reconnue.
- [ ] Le scroll reste dans l'éditeur.
- [ ] L'éditeur occupe toute la zone disponible.

## Depends On

- `04-markdown-state.md`
