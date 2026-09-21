# Markdown Editor

Un éditeur Markdown léger construit avec React, TypeScript, Vite et Tailwind CSS. Il vise à permettre d'écrire du Markdown, de visualiser le rendu en temps réel et de sauvegarder ses fichiers simplement.

## Démarrer le projet

```bash
npm install
npm run dev
```

L'application est alors disponible sur `http://localhost:3000`.

Commandes utiles :

```bash
npm run lint
npm run build
npm run preview
```

## Workflow IA

Le dépôt utilise `context/current-context.md` comme mémoire de travail : il contient l'objectif de la fonctionnalité, son plan, des notes, ainsi que le statut d'un bug. Les commandes ci-dessous structurent le travail avec l'IA, de la demande initiale jusqu'à la finalisation Git.

### Vue d'ensemble

```text
Nouvelle fonctionnalité : /feature load <fichier> → /feature implement → /feature end
Correction de bug       : /bug     → accord explicite pour corriger → /end-bug
```

### `/feature load <fichier>`

À utiliser lorsqu'une nouvelle fonctionnalité est décrite dans un document Markdown.

Cette commande lit le document, le contexte du projet et le code pertinent. Elle ajoute ensuite un résumé de la fonctionnalité dans `context/current-context.md`, puis propose un plan détaillé dans la conversation (fichiers concernés, comportement, validation, risques et questions ouvertes). Elle ne modifie pas le code.

Le plan est discuté et ajusté avec vous. Seulement après votre validation explicite, il est enregistré dans la section `# Plans` du fichier de contexte et une branche de fonctionnalité est créée. La commande s'arrête alors : utilisez `/feature implement` pour commencer le développement.

### `/feature implement`

À utiliser après qu'un objectif clair et, idéalement, un plan validé ont été préparés avec `/feature load`.

L'IA relit les règles du dépôt et `context/current-context.md`, vérifie que le besoin est suffisamment précis, puis implémente uniquement la fonctionnalité documentée. Elle préserve les modifications sans rapport et exécute les vérifications adaptées, par exemple le lint ou le build. Elle résume ensuite le résultat et peut itérer sur vos retours.

Si une exigence importante est ambiguë ou absente, elle demande une décision avant de modifier le code.

### `/feature end`

À utiliser lorsque la fonctionnalité est terminée et que vous souhaitez la clôturer localement.

Cette commande examine les changements non commités de la fonctionnalité, y compris les fichiers non suivis, puis réalise une revue de qualité et de sécurité. Elle lance les validations pertinentes et vous présente les problèmes éventuels. Toute correction nécessaire doit recevoir votre accord explicite avant d'être appliquée.

Quand la revue est saine, elle réinitialise `context/current-context.md` depuis son modèle, crée un commit conventionnel avec le travail revu, puis fusionne la branche dans `main` local. Elle ne pousse jamais vers le dépôt distant.

### `/bug`

À utiliser dès qu'un comportement du projet semble incorrect : erreur, régression, affichage inattendu ou fonctionnalité qui ne répond plus comme prévu.

Avant toute modification liée au bug, l'IA crée une branche dédiée (par exemple `bug/description-courte`). Elle enquête dans le code, la configuration, les tests et les traces disponibles. Elle consigne progressivement dans la section `# Current bug status` de `context/current-context.md` le comportement attendu et observé, les preuves, les hypothèses ou la cause confirmée, et le plan d'action.

Cette étape sert à diagnostiquer : elle ne corrige pas le code automatiquement. Une demande explicite, telle que « corrige le bug » ou « applique ce plan », est nécessaire avant la correction. Après votre accord, l'IA applique seulement le plan validé, lance les vérifications pertinentes et met à jour le statut du bug.

### `/end-bug`

À utiliser après la correction et la validation d'un bug, pour finaliser la branche.

La commande compare le travail de la branche à `main` (ou `origin/main` si disponible), examine les changements commités et non commités, et réalise une revue de qualité et de sécurité. Si elle relève une correction à faire, elle attend votre approbation avant toute modification.

Quand tout est valide, elle réinitialise le fichier de contexte depuis son modèle, crée un commit conventionnel, fusionne la branche dans `main` local, vérifie l'état final, puis pousse `main` normalement vers le dépôt distant. En cas de conflit, d'absence d'identité Git, de protection de branche ou d'échec de push, elle s'arrête pour vous demander quoi faire.

## Principes importants

- Le contexte et le plan guident les changements : l'IA ne doit pas implémenter une fonctionnalité non documentée.
- Les modifications existantes sans rapport sont préservées ; aucune commande du workflow ne doit les écraser, les supprimer ou les mettre de côté.
- Les étapes de clôture effectuent une revue avant le commit et n'appliquent pas de correction signalée sans votre validation.
- `/feature end` reste local, tandis que `/end-bug` effectue aussi le push de `main` après une finalisation réussie.
