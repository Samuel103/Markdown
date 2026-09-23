# Feature — Extended Markdown Preview

## Goal

Permettre à l’aperçu de restituer correctement les éléments Markdown avancés utilisés dans les documents riches, tout en conservant un rendu lisible, sécurisé et responsive.

## Tasks

- [ ] Prendre en charge le HTML Markdown autorisé nécessaire aux éléments repliables, afin que les balises `<details>` et `<summary>` soient rendues comme des contrôles interactifs plutôt que comme du texte.
- [ ] Interpréter les alertes de type GitHub (`[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]` et `[!CAUTION]`) comme des encadrés visuels accessibles.
- [ ] Ajouter la coloration syntaxique des blocs de code clôturés lorsqu’un langage est indiqué, avec un rendu lisible dans les thèmes clair et sombre.
- [ ] Préserver le défilement horizontal des tableaux et des blocs de code trop larges sans provoquer de débordement de l’aperçu sur mobile.
- [ ] Corriger le document de test Markdown pour échapper correctement les caractères `|` inclus dans une cellule de tableau et maintenir des exemples valides pour chaque syntaxe prise en charge.

## Acceptance Criteria

- [x] Un bloc `<details>` avec son `<summary>` est repliable et dépliable dans l’aperçu, sans afficher ses balises HTML comme texte.
- [x] Chaque type d’alerte GitHub est identifiable par son rôle et son style, sans perdre son contenu Markdown interne.
- [x] Les blocs TypeScript et Bash du document de test affichent une coloration syntaxique distincte et restent lisibles dans les deux thèmes.
- [x] Les tableaux et les blocs de code larges restent consultables à 390 px de largeur sans déborder horizontalement de la zone d’aperçu.
- [x] Le tableau GFM du document de test conserve ses trois cellules sur la ligne qui présente la syntaxe `| colonne |`.

## Depends On

- `07-markdown-preview.md`
- `08-gfm-support.md`
- `09-preview-styling.md`
