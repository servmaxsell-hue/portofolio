// Projects Data
export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    tech_stack: string[];
    problem?: string;
    solution?: string;
    result?: string;
    github_url?: string;
    live_url?: string;
    category: "web" | "automation" | "marketing" | "fullstack";
    featured: boolean;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "E-Commerce Platform",
        slug: "e-commerce-platform",
        description: "Plateforme e-commerce complète avec gestion des produits, paiements Stripe, et dashboard admin. Architecture microservices avec Laravel et Next.js.",
        image: "/projects/ecommerce.jpg",
        tech_stack: ["Laravel", "Next.js", "PostgreSQL", "Stripe", "Docker"],
        github_url: "https://github.com/Maxience/ecommerce",
        live_url: "https://ecommerce-demo.com",
        category: "fullstack",
        featured: true,
        problem: "L'ancien système monolithique n'était pas scalable et les temps de chargement étaient trop longs.",
        solution: "Migration vers une architecture microservices et utilisation de Next.js pour le frontend.",
        result: "Temps de chargement réduit de 60% et augmentation du taux de conversion de 25%."
    },
    {
        id: 2,
        title: "CRM Automatisé",
        slug: "crm-automatise",
        description: "Solution CRM sur mesure avec automatisation des workflows via n8n. Intégration avec Slack, Email, et Google Workspace.",
        image: "/projects/crm.jpg",
        tech_stack: ["Laravel", "Vue.js", "n8n", "MySQL", "Redis"],
        github_url: "https://github.com/Maxience/crm-auto",
        category: "automation",
        featured: true,
        problem: "Perte de temps sur des tâches manuelles répétitives et erreurs de saisie.",
        solution: "Automatisation complète des flux de travail avec n8n connectant tous les outils.",
        result: "Gain de 15h/semaine par employé et réduction des erreurs à <1%."
    },
    {
        id: 3,
        title: "Dashboard Marketing Analytics",
        slug: "dashboard-marketing-analytics",
        description: "Dashboard temps réel pour suivi des performances Google Ads et Microsoft Ads. Visualisations interactives et rapports automatisés.",
        image: "/projects/dashboard.jpg",
        tech_stack: ["Next.js", "Python", "Chart.js", "Google Ads API", "PostgreSQL"],
        live_url: "https://analytics-demo.com",
        category: "marketing",
        featured: true,
    },
    {
        id: 4,
        title: "Application SaaS B2B",
        slug: "application-saas-b2b",
        description: "Plateforme SaaS multi-tenant avec système d'abonnement, facturation automatisée et API REST complète.",
        image: "/projects/saas.jpg",
        tech_stack: ["Laravel", "React", "Tailwind CSS", "Stripe", "AWS"],
        github_url: "https://github.com/Maxience/saas-platform",
        category: "fullstack",
        featured: false,
    },
    {
        id: 5,
        title: "Automation Suite Make.com",
        slug: "automation-suite-make",
        description: "Suite d'automatisations complexes pour la gestion des leads, sync CRM, et reporting automatique pour agences marketing.",
        image: "/projects/automation.jpg",
        tech_stack: ["Make.com", "Zapier", "Airtable", "Notion API"],
        category: "automation",
        featured: false,
    },
    {
        id: 6,
        title: "Landing Pages Performance",
        slug: "landing-pages-performance",
        description: "Collection de landing pages optimisées pour la conversion avec A/B testing intégré et analytics avancées.",
        image: "/projects/landing.jpg",
        tech_stack: ["Next.js", "Tailwind CSS", "Google Analytics", "Hotjar"],
        live_url: "https://landing-demos.com",
        category: "web",
        featured: false,
    },
    {
        id: 7,
        title: "Système de Réservation WhatsApp IA",
        slug: "whatsapp-ai-booking-system",
        description: "Assistant virtuel WhatsApp alimenté par GPT-4 qui qualifie les prospects et gère les prises de rendez-vous automatiquement via Cal.com.",
        image: "/projects/whatsapp-booking.jpg",
        tech_stack: ["n8n", "OpenAI GPT-4", "WhatsApp API", "Cal.com", "Google Sheets"],
        category: "automation",
        featured: true,
        problem: "La gestion manuelle des rendez-vous et des messages entrants est chronophage et source d'erreurs.",
        solution: "Un workflow automatisé qui répond instantanément, qualifie le lead et booke le créneau dans l'agenda.",
        result: "Disponibilité 24/7, zéro oubli de relance, et une expérience client fluide et moderne."
    },
    {
        id: 8,
        title: "Prospection Cold Email IA : LinkedIn + Claude 3.7",
        slug: "cold-email-ia-linkedin",
        description: "Automatisation complète : Scrape LinkedIn, enrichissement des données et rédaction d'emails ultra-personnalisés par Claude 3.7.",
        image: "/projects/cold-email-ai.jpg",
        tech_stack: ["n8n", "Apify", "Claude 3.7", "Google Sheets", "Gmail"],
        category: "automation",
        featured: true,
        problem: "La prospection manuelle est lente et la personnalisation à grande échelle est impossible humainement.",
        solution: "Un workflow n8n qui scrape LinkedIn via Apify, enrichit les données, et utilise Claude 3.7 pour rédiger des emails d'approche uniques.",
        result: "Taux de réponse x3 grâce à l'hyper-personnalisation et 100% de gain de temps sur la rédaction."
    },
    {
        id: 9,
        title: "AchatAvis.com - E-Réputation IA",
        slug: "achat-avis-ia",
        description: "Plateforme d'E-Réputation propulsée par 7 agents IA autonomes (Sophie, Thomas, etc.) qui gèrent vos avis, SEO local et appels 24/7.",
        image: "/projects/achat-avis.jpg",
        tech_stack: ["Next.js", "n8n", "Twilio", "ElevenLabs", "Google Business API"],
        live_url: "https://achat-avis.vercel.app/",
        category: "fullstack",
        featured: true,
        problem: "Les artisans perdent 30% de CA à cause des appels manqués (127€/appel) et d'une mauvaise gestion des avis Google.",
        solution: "Une équipe de 7 agents IA spécialisés qui travaillent nuit et jour pour booster le classement local et répondre instantanément.",
        result: "+30% de chiffre d'affaires, 0 appel manqué et une e-réputation impeccable sans intervention humaine."
    },
];

// Articles Data
export interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    published_at: string;
    created_at: string;
    published: boolean;
    read_time: number;
    likes: number;
    tags: string[];
}

export const articles: Article[] = [
    {
        id: 1,
        title: "Optimiser vos campagnes Google Ads en 2024",
        slug: "optimiser-google-ads-2024",
        excerpt: "Découvrez les meilleures stratégies pour maximiser votre ROI sur Google Ads avec les dernières fonctionnalités IA.",
        content: "Contenu complet de l'article sur Google Ads...",
        image: "/blog/google-ads.jpg",
        published_at: "2024-01-15",
        created_at: "2024-01-15",
        published: true,
        read_time: 8,
        likes: 0,
        tags: ["Google Ads", "Marketing Digital", "PPC"],
    },
    {
        id: 2,
        title: "Automatiser son business avec n8n",
        slug: "automatiser-business-n8n",
        excerpt: "Guide complet pour créer des workflows d'automatisation puissants avec n8n, l'alternative open-source à Zapier.",
        content: "Contenu complet de l'article sur n8n...",
        image: "/blog/n8n.jpg",
        published_at: "2024-02-01",
        created_at: "2024-02-01",
        published: true,
        read_time: 12,
        likes: 0,
        tags: ["Automatisation", "n8n", "Workflow"],
    },
    {
        id: 3,
        title: "Laravel + Next.js : L'architecture moderne",
        slug: "laravel-nextjs-architecture",
        excerpt: "Comment combiner Laravel comme backend API et Next.js pour créer des applications web performantes et scalables.",
        content: "Contenu complet de l'article sur Laravel + Next.js...",
        image: "/blog/laravel-next.jpg",
        published_at: "2024-02-20",
        created_at: "2024-02-20",
        published: true,
        read_time: 15,
        likes: 0,
        tags: ["Laravel", "Next.js", "Architecture", "Fullstack"],
    },
    {
        id: 4,
        title: "Docker pour les développeurs PHP",
        slug: "docker-developpeurs-php",
        excerpt: "Configurez un environnement de développement PHP/Laravel professionnel avec Docker en moins de 10 minutes.",
        content: "Contenu complet de l'article sur Docker...",
        image: "/blog/docker.jpg",
        published_at: "2024-03-05",
        created_at: "2024-03-05",
        published: true,
        read_time: 10,
        likes: 0,
        tags: ["Docker", "PHP", "DevOps", "Laravel"],
    },
    {
        id: 5,
        title: "Guide Ultime : Optimiser sa Fiche Google Business Profile en 2026",
        slug: "article-google-business-optimization",
        excerpt: "Le guide complet pour transformer votre fiche Google en aimant à clients. NAP, catégories, photos : tout ce qu'il faut savoir.",
        content: "Contenu complet de l'article sur Google Business Profile...",
        image: "/blog/seo-local-optimization.jpg",
        published_at: "2026-01-10",
        created_at: "2026-01-10",
        published: true,
        read_time: 10,
        likes: 0,
        tags: ["SEO Local", "Google Business Profile", "Visibilité"],
    },
    {
        id: 6,
        title: "Les 7 Erreurs Fatales qui Tuent Votre Référencement Local",
        slug: "article-local-seo-mistakes",
        excerpt: "Attention à ces erreurs courantes qui peuvent faire suspendre votre fiche ou ruiner votre classement. La liste noire à éviter.",
        content: "Contenu complet de l'article sur les erreurs SEO Local...",
        image: "/blog/seo-local-mistakes.jpg",
        published_at: "2026-01-12",
        created_at: "2026-01-12",
        published: true,
        read_time: 8,
        likes: 0,
        tags: ["SEO Local", "Erreurs", "Google Maps"],
    },
    {
        id: 7,
        title: "Top 10 des Actions pour Dominer le Pack Local Google",
        slug: "article-local-seo-strategies",
        excerpt: "Ne vous contentez pas d'exister. Dominez votre zone avec ces 10 stratégies avancées (Posts, Q&A, Produits, etc.).",
        content: "Contenu complet de l'article sur les stratégies SEO Local...",
        image: "/blog/seo-local-strategies.jpg",
        published_at: "2026-01-15",
        created_at: "2026-01-15",
        published: true,
        read_time: 12,
        likes: 0,
        tags: ["SEO Local", "Stratégie", "Croissance"],
    },
    {
        id: 8,
        title: "Urgence : Ma Fiche Google est Suspendue dès la Création",
        slug: "article-gbp-suspension-creation",
        excerpt: "Pourquoi Google a flagué votre fiche immédiatement ? Adresses interdites, secteurs à risque et comment monter votre dossier de défense.",
        content: "Contenu complet de l'article sur la suspension à la création...",
        image: "/blog/gbp-suspension-creation.jpg",
        published_at: "2026-01-20",
        created_at: "2026-01-20",
        published: true,
        read_time: 10,
        likes: 0,
        tags: ["Google Business Profile", "Suspension", "Urgence"],
    },
    {
        id: 9,
        title: "Suspension Google après modification : Le Guide de Survie",
        slug: "article-gbp-suspension-modification",
        excerpt: "Vous avez changé une catégorie et tout a disparu ? Comprenez le 'Core Fact Trigger' et comment récupérer vos avis.",
        content: "Contenu complet de l'article sur la suspension après modification...",
        image: "/blog/gbp-suspension-edit.jpg",
        published_at: "2026-01-22",
        created_at: "2026-01-22",
        published: true,
        read_time: 8,
        likes: 0,
        tags: ["Google Business Profile", "Suspension", "Erreurs"],
    },
];

// Services Data
export interface Service {
    id: number;
    title: string;
    slug: string;
    description: string;
    long_description: string;
    icon: string;
    features: string[];
    benefits: string[];
    technologies: string[];
    order: number;
}

export const services: Service[] = [
    {
        id: 1,
        title: "Développement Web Fullstack",
        slug: "developpement-web-fullstack",
        description: "Conception et développement d'applications web sur mesure, de la base de données à l'interface utilisateur.",
        long_description: "Je conçois et développe des applications web complètes, de A à Z. Mon expertise couvre l'ensemble du stack technique : backend robuste avec Laravel/PHP, frontend moderne avec React/Next.js, et infrastructure cloud optimisée. Chaque projet est pensé pour être performant, scalable et maintenable sur le long terme.",
        icon: "code",
        features: [
            "Applications Laravel / PHP",
            "Interfaces React / Next.js",
            "APIs REST & GraphQL",
            "Bases de données optimisées",
            "Déploiement & DevOps",
        ],
        benefits: [
            "Code propre et maintenable",
            "Performance optimisée",
            "Sécurité renforcée",
            "Documentation complète",
            "Support post-livraison",
        ],
        technologies: ["Laravel", "Next.js", "React", "PHP", "PostgreSQL", "Docker", "AWS"],
        order: 1,
    },
    {
        id: 2,
        title: "Automatisation n8n / Make.com",
        slug: "automatisation-workflows",
        description: "Création de workflows automatisés pour optimiser vos processus métier et gagner en productivité.",
        long_description: "L'automatisation est la clé de la productivité moderne. J'analyse vos processus existants et crée des workflows intelligents qui éliminent les tâches répétitives. Avec n8n et Make.com, je connecte vos outils entre eux pour créer un écosystème digital fluide et efficace.",
        icon: "automation",
        features: [
            "Audit des processus existants",
            "Conception de workflows sur mesure",
            "Intégrations multi-outils",
            "Maintenance & optimisation",
            "Formation équipes",
        ],
        benefits: [
            "Gain de temps significatif",
            "Réduction des erreurs humaines",
            "Meilleure traçabilité",
            "Scalabilité des processus",
            "ROI rapide et mesurable",
        ],
        technologies: ["n8n", "Make.com", "Zapier", "Airtable", "Notion", "Slack", "Google Workspace"],
        order: 2,
    },
    {
        id: 3,
        title: "Marketing Digital & Ads",
        slug: "marketing-digital-ads",
        description: "Stratégies publicitaires performantes sur Google Ads et Microsoft Ads pour maximiser votre ROI.",
        long_description: "Une présence en ligne sans stratégie publicitaire efficace, c'est comme un magasin sans enseigne. Je crée et gère vos campagnes Google Ads et Microsoft Ads avec une approche data-driven. Chaque euro investi est optimisé pour maximiser votre retour sur investissement.",
        icon: "chart",
        features: [
            "Audit compte publicitaire",
            "Création campagnes Google/Microsoft Ads",
            "Optimisation en continu",
            "Reporting avancé",
            "A/B Testing & Conversion",
        ],
        benefits: [
            "Ciblage précis de votre audience",
            "Budget optimisé",
            "Résultats mesurables",
            "Croissance prévisible",
            "Avantage concurrentiel",
        ],
        technologies: ["Google Ads", "Microsoft Ads", "Google Analytics", "Tag Manager", "Data Studio"],
        order: 3,
    },
];

// Skills Data
export interface Skill {
    name: string;
    level: number;
    category: "technical" | "marketing";
}

export const skills: Skill[] = [
    // Technical
    { name: "Laravel / PHP", level: 95, category: "technical" },
    { name: "Next.js / React", level: 90, category: "technical" },
    { name: "Python", level: 80, category: "technical" },
    { name: "Docker / DevOps", level: 85, category: "technical" },
    { name: "HTML / CSS / JavaScript", level: 95, category: "technical" },
    { name: "n8n / Make.com", level: 90, category: "technical" },
    { name: "WordPress", level: 85, category: "technical" },
    // Marketing
    { name: "Google Ads", level: 90, category: "marketing" },
    { name: "Microsoft Ads", level: 85, category: "marketing" },
    { name: "SEO / SEA", level: 80, category: "marketing" },
    { name: "Marketing Automation", level: 88, category: "marketing" },
];
