# Markdown Editor

Application web légère pour écrire, prévisualiser et enregistrer des fichiers Markdown.

## Produit

- Éditeur CodeMirror à gauche, aperçu Markdown temps réel à droite.
- Créer, ouvrir et sauvegarder/télécharger des fichiers `.md`.
- Interface minimaliste, responsive, accessible au clavier, avec thèmes clair/sombre.
- Le MVP n'inclut ni backend, authentification, synchronisation, collaboration, IA ni intégration Git.

## Stack

React 19, TypeScript, Vite, Tailwind CSS 4, CodeMirror 6 (`@uiw/react-codemirror`), `react-markdown` et `remark-gfm`. Tauri est prévu pour les intégrations système de fichiers desktop.

## Priorités

Privilégier les changements simples, rapides et maintenables. Ne pas ajouter de dépendance ou de fonctionnalité avancée sans besoin produit clair. Les spécifications détaillées sont dans `context/features/` et ne doivent être lues que lorsqu'elles sont pertinentes.
