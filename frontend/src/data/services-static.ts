// Services Data (Updated with all 8 services)
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
        long_description: "Je conçois et développe des applications web complètes, de A à Z.",
        icon: "code",
        features: ["Applications Laravel / PHP", "Interfaces React / Next.js", "APIs REST & GraphQL"],
        benefits: ["Code propre", "Performance optimisée", "Support post-livraison"],
        technologies: ["Laravel", "Next.js", "React", "PostgreSQL"],
        order: 1,
    },
    {
        id: 2,
        title: "Automatisation n8n",
        slug: "automatisation-workflows",
        description: "Création de workflows automatisés pour optimiser vos processus métier et gagner en productivité.",
        long_description: "L'automatisation est la clé de la productivité moderne.",
        icon: "automation",
        features: ["Audit des processus", "Workflows sur mesure", "Intégrations API"],
        benefits: ["Gain de temps", "Réduction des erreurs", "ROI rapide"],
        technologies: ["n8n", "Make.com", "Zapier"],
        order: 2,
    },
    {
        id: 3,
        title: "SEO & Référencement Naturel",
        slug: "seo-referencement-naturel",
        description: "Optimisation de votre visibilité sur Google avec audit SEO complet et stratégie de contenu.",
        long_description: "Le référencement naturel (SEO) est la clé pour être visible sans payer de publicité.",
        icon: "chart",
        features: ["Audit SEO technique", "Stratégie mots-clés", "Backlinks qualifiés"],
        benefits: ["Visibilité durable", "Trafic qualifié", "ROI mesurable"],
        technologies: ["Google Search Console", "Ahrefs", "SEMrush"],
        order: 3,
    },
    {
        id: 4,
        title: "Google Ads & SEA",
        slug: "google-ads-sea",
        description: "Campagnes publicitaires Google Ads rentables avec optimisation continue et maximisation du ROI.",
        long_description: "Générez des leads qualifiés immédiatement avec Google Ads.",
        icon: "chart",
        features: ["Campagnes Search/Display", "Optimisation Quality Score", "Suivi conversions"],
        benefits: ["Résultats immédiats", "Budget maîtrisé", "Leads mesurables"],
        technologies: ["Google Ads", "Google Analytics 4", "Looker Studio"],
        order: 4,
    },
    {
        id: 5,
        title: "Création de Sites E-Commerce",
        slug: "creation-sites-ecommerce",
        description: "Boutiques en ligne performantes et optimisées pour la conversion. De la conception à la mise en ligne.",
        long_description: "Lancez ou refondez votre boutique en ligne avec une solution moderne.",
        icon: "code",
        features: ["Design UX/UI", "Paiements sécurisés", "Gestion catalogue"],
        benefits: ["Ventes 24/7", "Taux de conversion optimisé", "Scaling facilité"],
        technologies: ["Next.js", "Stripe", "Shopify"],
        order: 5,
    },
    {
        id: 6,
        title: "Stratégie Marketing Digital & Growth",
        slug: "strategie-marketing-digital-growth",
        description: "Accélérez votre croissance avec une stratégie marketing complète. Acquisition, conversion et fidélisation.",
        long_description: "Le marketing digital n'est pas qu'une question d'outils, c'est une stratégie globale.",
        icon: "chart",
        features: ["Audit marketing 360°", "Plan acquisition multi-canal", "Funnel de conversion"],
        benefits: ["Stratégie actionnaire", "ROI mesurable", "Croissance scalable"],
        technologies: ["Google Analytics 4", "HubSpot", "Looker Studio"],
        order: 6,
    },
    {
        id: 7,
        title: "Création de Sites Web Pro (Entreprises & Particuliers)",
        slug: "creation-sites-web-professionnels",
        description: "Votre site vitrine ou corporate sur-mesure. Design moderne, rapide et optimisé pour convertir.",
        long_description: "Votre site web est votre première impression.",
        icon: "code",
        features: ["Design sur-mesure", "Responsive mobile-first", "CMS intuitif"],
        benefits: ["Site clé en main", "Autonomie totale", "Performance garantie"],
        technologies: ["Next.js", "WordPress", "Webflow"],
        order: 7,
    },
    {
        id: 8,
        title: "Chatbots Intelligents & Assistants IA",
        slug: "chatbots-intelligents-assistants-ia",
        description: "Automatisez votre support client avec des chatbots IA disponibles 24/7 qui répondent comme des humains.",
        long_description: "Les chatbots IA modernes peuvent gérer 80% de vos demandes clients.",
        icon: "automation",
        features: ["Chatbot GPT-4", "Intégration multi-canal", "Qualification leads"],
        benefits: ["Support 24/7", "Réponse instantanée", "Satisfaction améliorée"],
        technologies: ["OpenAI GPT-4", "Dialogflow", "n8n"],
        order: 8,
    },
];
