# Guide de Déploiement sur Hostinger

Ce guide vous explique comment déployer votre portfolio (Frontend Next.js et Backend NestJS) sur un hébergement Hostinger (Shared Hosting avec Node.js ou VPS).

---

## 🚀 Étape 1 : Préparation du Backend (NestJS)

1. **Build en local** :
   ```bash
   cd backend
   npm install
   npm run build
   ```
2. **Fichiers à uploader** :
   Uploadez le contenu du dossier `backend` vers votre sous-domaine (ex: `api.votre-domaine.com`), **SAUF** `node_modules`.
   *Inclus obligatoirement* : `dist/`, `prisma/`, `package.json`, `server.js`, `uploads/`.

3. **Configuration Hostinger** :
   - Dans le **Node.js Manager** de Hostinger :
     - **App Directory** : le dossier où vous avez mis le backend.
     - **App Entry Point** : `server.js`.
     - **Node.js version** : 18 ou 20.
   - Cliquez sur **Install** puis **Start**.

4. **Variables d'environnement** (.env) :
   Créez un fichier `.env` sur le serveur (via le gestionnaire de fichiers) :
   ```env
   PORT=4000
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="choisissez_un_secret_tres_long"
   ```

5. **Base de données** :
   Exécutez la commande suivante via SSH dans le dossier backend :
   ```bash
   npx prisma migrate deploy
   ```

---

## 🌐 Étape 2 : Préparation du Frontend (Next.js)

### Option A : Déploiement Statique (Actuel selon votre config)
Votre fichier `next.config.ts` contient `output: 'export'`. Cela génère des fichiers HTML/CSS/JS statiques.

1. **Build** : `npm run build`
2. **Uploadez** le contenu du dossier `out/` (généré après le build) directement dans le dossier `public_html` de votre domaine principal via FTP ou le Gestionnaire de Fichier Hostinger.
3. **Important** : Comme il s'agit d'un export statique, vous devrez re-build et ré-uploader le site à chaque fois que vous modifiez un contenu dans le dashboard admin.

### Option B : Déploiement Dynamique (Recommandé pour un Portfolio avec Dashboard)
Pour que vos modifications apparaissent instantanément sans re-build :

1. **Modifiez** `frontend/next.config.ts` : Supprimez (ou commentez) la ligne `output: 'export'`.
2. **Build** : `npm run build`
3. **Uploadez** tout le dossier `frontend` (sauf `node_modules`).
4. **Hostinger Node.js Manager** : Comme pour le backend, pointez vers `server.js` (que j'ai créé pour vous).
5. **Variables d'environnement** : Ajoutez `NEXT_PUBLIC_API_URL` dans le gestionnaire de Hostinger ou un fichier `.env`.

---

## 🛠 Pro Conseil (Accès SSH)

Pour gagner du temps, utilisez SSH pour zipper vos dossiers localement et les dézipper sur Hostinger :
```bash
# Local
zip -r backend.zip backend/ -x "**/node_modules/*"

# Sur Hostinger (SSH)
unzip backend.zip
```

---

### ✅ Checklist finale
- [ ] Backend démarré sur `api.votre-domaine.com`
- [ ] Prisma migrate effectué
- [ ] Folder `uploads` existant et accessible en écriture
- [ ] Frontend pointant vers l'URL de production de l'API
