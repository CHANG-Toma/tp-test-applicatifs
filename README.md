# TP Tests Applicatifs — rendu TypeScript

**CHANG Toma** · volet **TypeScript (Vitest)** du TP « Tests applicatifs ».  

---

## Lancer les tests (TypeScript)

```bash
cd typescript
npm install
npm test
```
---

## Rapport des apports

| Partie | Travail réalisé |
|--------|------------------|
| **I** | Tests unitaires sur `Task` (pattern AAA), complément des zones prévues dans `unitaire.task.test.ts`. |
| **II** | Cas limites (`casLimites.test.ts`) : description longueur max, `dueDate` vide → `null`, etc. Entrées invalides (`entreesInvalides.test.ts`) : date non chaîne, etc. |
| **III** | Intégration : modification d’une tâche puis sauvegarde / rechargement JSON (`integration.test.ts`). Fonctionnel : filtre `status: done` et tâches terminées (`fonctionnel.test.ts`). |
| **IV** | **Bug-001** : `deleteTask` confondait **index** et **id** — correction dans `src/taskManager.ts`. Deux tests de régression (`regression.test.ts`). Deux scénarios E2E dont un autour de la suppression par id (`e2e.test.ts`). |
| **V** | Preuves d’exécution locale Vitest (dossier `typescript/proofs/`, liens ci-dessous). La CI du dépôt exécute aussi Python (`pytest`) : voir `.github/workflows/ci.yml`. |

---

## Preuves (captures)

| Preuve | Lien vers le fichier dans le dépôt |
|--------|-------------------------------------|
| Partie IV — régression au vert | [ouvrir `proof-part4-regression.png`](./typescript/proofs/proof-part4-regression.png) |
| Toute la suite Vitest au vert | [ouvrir `proof-all-tests-passed.png`](./typescript/proofs/proof-all-tests-passed.png) |

Chemins locaux (copier-coller dans l’explorateur ou le terminal) :

- `typescript/proofs/proof-part4-regression.png`
- `typescript/proofs/proof-all-tests-passed.png`

---

## Ce que j’ai appris

- Structurer un test en **Arrange / Act / Assert** rend le scénario lisible pour les autres et pour moi-même plus tard.
- Les **cas limites** et les **entrées invalides** ne sont pas la même chose : l’un teste la frontière du domaine, l’autre le rejet explicite des valeurs hors contrat.
- Un test d’**intégration** vérifie que des modules (ici stockage + gestionnaire) coopèrent ; un test **fonctionnel** exprime une règle métier observable du point de vue utilisateur.
- Un bug comme la confusion **id / index** se voit surtout avec un test de **régression** qu’on garde pour éviter que le bug ne revienne.
- La **CI GitHub Actions** automatise la confiance : chaque push relance la suite et impose de ne rien oublier avant de rendre le projet.
