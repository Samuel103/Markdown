# Feature — CodeMirror Markdown Editor

## Goal

Remplacer le placeholder d'éditeur par CodeMirror 6.

## Dependencies

```bash
npm install @uiw/react-codemirror @codemirror/lang-markdown
```

## Décisions MVP

- Utiliser `@uiw/react-codemirror` et `@codemirror/lang-markdown`.
- L'éditeur est contrôlé par les props `value` et `onChange` fournies par `EditorPage`.
- À chaque modification de l'utilisateur, l'éditeur appelle `onChange` avec le contenu complet du document.
- Une modification externe de `value` (par exemple après un nouveau document ou l'ouverture d'un fichier) doit aussi être reflétée dans CodeMirror.
- L'éditeur occupe toute la largeur et toute la hauteur disponibles dans son panneau.
- Le défilement est interne à l'éditeur : le layout principal ne doit pas défiler pendant la saisie.
- Les options avancées — recherche, autocomplétion, numéros de ligne et raccourcis Markdown — sont hors périmètre pour le MVP.
- L'adaptation du thème CodeMirror aux modes clair et sombre sera traitée dans une feature dédiée.

## Tasks

- Installer CodeMirror.
- Ajouter le support Markdown.
- Créer les props `value` et `onChange`.
- Brancher CodeMirror au state React.
- Vérifier la saisie en temps réel.
- Vérifier le scroll.
- Vérifier qu'une nouvelle valeur reçue via `value` est affichée dans l'éditeur.
- Vérifier l'absence de warning React ou CodeMirror en développement, y compris avec `StrictMode`.

## Acceptance Criteria

- [x] CodeMirror est affiché.
- [x] L'utilisateur peut écrire.
- [x] Le state React est mis à jour.
- [x] La syntaxe Markdown est reconnue.
- [x] Le scroll reste dans l'éditeur.
- [x] L'éditeur occupe toute la zone disponible.
- [x] Une mise à jour externe de `value` est visible dans CodeMirror.
- [x] Aucun warning React ou CodeMirror n'apparaît en développement.

## Depends On

- `04-markdown-state.md`
