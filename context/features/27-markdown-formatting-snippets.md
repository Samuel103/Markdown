# Feature — Markdown Formatting Snippets

## Goal

Permettre à l'utilisateur d'insérer rapidement les principaux éléments Markdown depuis des boutons d'édition dans la barre supérieure.

## Tasks

- [ ] Ajouter à la barre supérieure des boutons d'insertion pour les titres, le texte gras, l'italique, le texte barré, les liens, les images, les citations, le code inline et les blocs de code.
- [ ] Ajouter des boutons pour les listes à puces, les listes numérotées, les listes de tâches, les séparateurs et les tableaux GFM.
- [ ] Insérer ou entourer le texte sélectionné avec la syntaxe Markdown appropriée et placer le curseur à un emplacement utile lorsqu'aucun texte n'est sélectionné.
- [ ] Conserver la sélection et le focus dans l'éditeur après chaque insertion.
- [ ] Rendre chaque bouton accessible avec un libellé explicite et utilisable au clavier.

## Acceptance Criteria

- [x] La barre supérieure permet d'insérer les syntaxes Markdown courantes sans les saisir manuellement.
- [x] Un clic sur un bouton de mise en forme applique la syntaxe au texte sélectionné ou insère un modèle éditable à la position du curseur.
- [x] Les boutons de tableaux et de listes de tâches produisent un Markdown GFM visible correctement dans l'aperçu.
- [x] Après une insertion, l'utilisateur peut continuer à écrire immédiatement dans l'éditeur.
- [x] Chaque commande possède un nom accessible décrivant son action.

## Depends On

- `05-codemirror-editor.md`
- `08-gfm-support.md`
- `16-toolbar.md`
