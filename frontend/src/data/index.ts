// Projects Data
export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    tech_stack: string[];
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
