---
name: bug
description: Rechercher, diagnostiquer et planifier la correction d'un bug de ce dépôt, en tenant à jour son statut dans context/current-context.md; implémenter la correction seulement sur demande explicite.
---

# Bugs

Utilise ce skill lorsqu'un utilisateur invoque `/bug` ou demande d'enquêter sur un dysfonctionnement de ce dépôt.

## Diagnostic et planification

1. Lire les instructions du dépôt ainsi que `context/project-overview.md`, `context/rules.md` et `context/current-context.md` avant l'investigation. Examiner ensuite le code, la configuration, les tests et les traces pertinents afin de fonder les conclusions sur des éléments vérifiables.
2. Avant toute modification de fichier liée au bug — y compris la première mise à jour de `context/current-context.md` — créer et basculer sur une branche dédiée, nommée par exemple `bug/<description-courte>`. Vérifier d'abord la branche et l'état du dépôt, préserver les changements existants et ne pas écraser de branche. Si la création ou le basculement est empêché par un conflit ou nécessite de déplacer des changements non liés, s'arrêter et demander une décision à l'utilisateur.
3. Mettre à jour `context/current-context.md`, sous `# Current bug status`, dès que le problème est décrit et à chaque nouvel indice important. Conserver les autres sections et leur contenu.
4. Dans cette section, consigner de façon concise : le statut (par exemple « en investigation », « cause confirmée », « prêt à corriger » ou « corrigé »), le comportement attendu et observé, les éléments de preuve, les causes possibles ou confirmées, et le plan d'action courant. Distinguer clairement les hypothèses des causes confirmées.
5. Présenter à l'utilisateur les causes possibles, le niveau de confiance et un plan de correction concret : fichiers concernés, modifications prévues, risques éventuels et validation. Ne pas modifier le code durant cette phase.
6. Poursuivre l'investigation et tenir le statut à jour lorsque l'utilisateur apporte un nouvel élément ou demande une autre piste. Mettre à jour le plan si les nouvelles preuves le justifient.

## Correction après accord

Ne corrige le bug que lorsque l'utilisateur donne une instruction explicite de correction, telle que « corrige le bug » ou « applique ce plan ». À ce moment :

1. Mettre en œuvre uniquement le plan approuvé, en préservant les changements non liés.
2. Exécuter les vérifications pertinentes, proportionnellement à la modification.
3. Mettre à jour `# Current bug status` avec le résultat, les validations effectuées et tout suivi restant.
4. Résumer la correction, les fichiers modifiés et les résultats de validation.

Garder la section de contexte et la communication dans la langue utilisée par l'utilisateur, sauf demande contraire. Si le bug ne peut pas être reproduit ou si une décision utilisateur est indispensable, l'indiquer clairement dans le statut et le plan au lieu de présenter une hypothèse comme un fait.
