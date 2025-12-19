# Portfolio Maxime Paul Dossou

Portfolio professionnel moderne pour Maxime Paul Dossou, développeur fullstack et expert en marketing digital.

## 🚀 Features

- **Design moderne** : Fond blanc minimaliste avec animation de particules interactive
- **Multi-pages** : Accueil, À propos, Projets, Blog, Services, Contact
- **Animations** : Framer Motion pour des transitions fluides
- **Responsive** : Optimisé pour desktop, tablette et mobile
- **API Routes** : Endpoints pour projets, articles, services et contact
- **SEO Ready** : Métadonnées optimisées pour le référencement

## 🛠️ Technologies

- **Framework** : Next.js 16 (App Router)
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Background** : Canvas particles interactives
- **Icons** : React Icons
- **Langage** : TypeScript

## 📦 Installation

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Installation locale

```bash
# Cloner le projet
cd frontend

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🏗️ Structure du projet

```
frontend/
├── src/
│   ├── app/                    # Pages (App Router)
│   │   ├── page.tsx            # Accueil
│   │   ├── about/              # À propos
│   │   ├── projects/           # Projets
│   │   ├── blog/               # Blog + [slug]
│   │   ├── services/           # Services
│   │   ├── contact/            # Contact
│   │   └── api/                # API Routes
│   ├── components/             # Composants React
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── InteractiveBackground.tsx
│   └── data/                   # Données (projets, articles, services)
│       └── index.ts
└── public/                     # Assets statiques
```

## 📝 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/projects` | GET | Liste des projets |
| `/api/articles` | GET | Liste des articles publiés |
| `/api/services` | GET | Liste des services |
| `/api/contact` | POST | Soumission formulaire contact |

## 🎨 Personnalisation

### Modifier les données

Éditez le fichier `src/data/index.ts` pour :
- Ajouter/modifier des projets
- Créer de nouveaux articles de blog
- Mettre à jour les services
- Ajuster les compétences et niveaux

### Modifier le design

- **Couleurs** : Éditez les variables CSS dans `src/app/globals.css`
- **Polices** : Modifiez l'import Google Fonts dans `globals.css`
- **Animations** : Ajustez les paramètres Framer Motion dans les composants

## 🚢 Déploiement

### Vercel (Recommandé)

```bash
npm run build
```

Puis déployez sur [Vercel](https://vercel.com) en connectant votre repository.

### Autre hébergement

```bash
# Build production
npm run build

# Lancer en production
npm start
```

## 📧 Contact

- **Email** : contact@maximedossou.com
- **LinkedIn** : linkedin.com/in/maximedossou
- **GitHub** : github.com/maximedossou

---

Développé avec ❤️ par Paul Maxime Dossou
