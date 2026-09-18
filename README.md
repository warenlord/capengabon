# Site CAPEN

Site institutionnel et commercial de CAPEN (Coopérative Agropastorale et Packaging des Enfants NGADI), construit avec Next.js 15 (App Router), TypeScript et Tailwind CSS.

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs
npm run dev                  # http://localhost:3000
```

## Variables d'environnement (`.env.local`)

| Variable | Rôle |
|---|---|
| `ADMIN_PASSWORD` | Mot de passe d'accès à `/admin` |
| `SESSION_SECRET` | Chaîne aléatoire longue pour signer le cookie de session admin |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Non utilisé directement (le numéro réel se configure dans `/admin/site-info`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` / `NEXT_PUBLIC_CONTACT_PHONE` | Idem, informatifs — la source de vérité est `/admin/site-info` |

**Important** : tant que le numéro WhatsApp et l'e-mail ne sont pas renseignés via `/admin/site-info`, les boutons correspondants restent masqués sur le site (aucune donnée n'est inventée).

## Administration du contenu

Rendez-vous sur `/admin`, connectez-vous avec `ADMIN_PASSWORD`. Vous pouvez y gérer :

- **Coordonnées CAPEN** (WhatsApp, e-mail, téléphone, adresse, réseaux sociaux)
- **Productions** (banane, manioc) : description, statut, photos
- **Produits** (ex. bâtons de manioc) : fiches, formats, prix, photos, création/suppression
- **Actualités** : création, édition, publication/dépublication, galerie
- **Galerie** (« CAPEN sur le terrain ») : ajout/suppression de photos
- **Partenaires** : ajout/suppression, logo

En local (sans `DATA_DIR`), le contenu est stocké dans des fichiers JSON sous `data/` et les images uploadées dans `public/images/uploads/`. Les demandes envoyées via les formulaires publics sont journalisées dans `data/submissions/` (non versionné).

## Déploiement

Cette architecture écrit sur le système de fichiers du serveur (contenu admin + photos uploadées + soumissions de formulaires). Elle nécessite donc un hébergement **Node.js classique avec disque persistant** — pas un hébergement 100% statique ou serverless pur (Vercel sans volume, par ex.) où le système de fichiers est éphémère.

Sur un hébergement avec disque persistant (Render, VPS...), définir la variable `DATA_DIR` (ex. `/var/data`) : le code lit/écrit alors tout le contenu admin et les images uploadées à cet endroit, indépendamment du code déployé, via `lib/storage-paths.ts`. Au premier démarrage, le contenu initial (`data/*.json` du dépôt) est automatiquement copié sur ce disque ; ensuite, chaque modification via l'admin y est conservée, même après un nouveau déploiement du code.

### Déploiement sur Render (hébergement choisi pour capengabon.com)

Le dépôt contient un `render.yaml` (Blueprint) prêt à l'emploi.

1. Pousser ce projet sur un dépôt GitHub.
2. Sur [render.com](https://dashboard.render.com) → **New** → **Blueprint** → sélectionner le dépôt GitHub. Render détecte `render.yaml` et propose de créer le service `capen-site` (plan Starter + disque persistant de 1 Go monté sur `/var/data`).
3. Render demande la valeur de `ADMIN_PASSWORD` (marquée `sync: false` dans le Blueprint, donc jamais committée) : saisir un mot de passe fort. `SESSION_SECRET` est généré automatiquement.
4. Une fois le service en ligne (`capen-site.onrender.com`), aller dans **Settings → Custom Domains** et ajouter `capengabon.com` et `www.capengabon.com`. Render fournit les enregistrements DNS à créer (généralement un `A`/`ALIAS` pour l'apex et un `CNAME` pour `www`) et gère automatiquement le certificat HTTPS.
5. Créer ces enregistrements chez **Namecheap** (Domain List → `capengabon.com` → **Manage** → **Advanced DNS**), avec les valeurs exactes données par Render.
6. Une fois le DNS propagé, se connecter sur `https://capengabon.com/admin` et renseigner les vraies coordonnées CAPEN (WhatsApp, e-mail, téléphone) dans `/admin/site-info`.

Pensez à sauvegarder régulièrement le disque persistant (export manuel du dossier `/var/data` via le shell Render, ou snapshot du disque depuis le dashboard).

## Sécurité

- `npm audit` signale une vulnérabilité résiduelle dans la version de PostCSS embarquée par Next.js 15.5.25 (outil de build, non exposé aux requêtes publiques). Elle sera résolue par une future mise à jour de Next.js — à vérifier périodiquement avec `npm audit`.
- Changez `ADMIN_PASSWORD` et `SESSION_SECRET` avant toute mise en production.
