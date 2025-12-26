import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Adding additional services...');

    const newServices = [
        {
            title: "SEO & Référencement Naturel",
            slug: "seo-referencement-naturel",
            description: "Optimisation de votre visibilité sur Google. Audit SEO complet, stratégie de contenu et suivi des performances pour générer du trafic qualifié.",
            long_description: "Le référencement naturel (SEO) est la clé pour être visible sur Google sans payer de publicité. Je vous accompagne dans l'optimisation complète de votre site : audit technique, recherche de mots-clés, création de contenu optimisé, netlinking, et suivi mensuel de vos positions. Résultat : plus de trafic, plus de leads, plus de clients.",
            icon: "🎯",
            features: JSON.stringify([
                "Audit SEO technique complet",
                "Stratégie de mots-clés longue traîne",
                "Optimisation on-page et off-page",
                "Création de backlinks qualifiés",
                "Reporting mensuel des performances"
            ]),
            benefits: JSON.stringify([
                "Visibilité durable sans budget pub",
                "Trafic qualifié ciblé",
                "Autorité de domaine renforcée",
                "ROI mesurable et croissant"
            ]),
            technologies: JSON.stringify([
                "Google Search Console",
                "Ahrefs",
                "SEMrush",
                "Screaming Frog",
                "Google Analytics"
            ]),
            order: 3
        },
        {
            title: "Google Ads & SEA",
            slug: "google-ads-sea",
            description: "Campagnes publicitaires Google Ads rentables. Ciblage précis, optimisation continue et maximisation de votre ROI publicitaire.",
            long_description: "Générez des leads qualifiés immédiatement avec Google Ads. Je crée et optimise vos campagnes Search, Display et Shopping pour maximiser votre retour sur investissement. Gestion complète : recherche de mots-clés, création d'annonces performantes, optimisation des enchères, et A/B testing continu. Vous payez uniquement pour les clics, et chaque euro investi est tracé et optimisé.",
            icon: "📢",
            features: JSON.stringify([
                "Campagnes Search, Display & Shopping",
                "Ciblage par intention d'achat",
                "Optimisation du Quality Score",
                "A/B testing des annonces",
                "Suivi des conversions et ROI"
            ]),
            benefits: JSON.stringify([
                "Résultats immédiats",
                "Budget maîtrisé au centime près",
                "Leads qualifiés et mesurables",
                "Scaling rapide des campagnes performantes"
            ]),
            technologies: JSON.stringify([
                "Google Ads",
                "Google Tag Manager",
                "Google Analytics 4",
                "Looker Studio",
                "Microsoft Ads"
            ]),
            order: 4
        },
        {
            title: "Création de Sites E-Commerce",
            slug: "creation-sites-ecommerce",
            description: "Boutiques en ligne performantes et optimisées pour la conversion. De la conception à la mise en ligne, je transforme vos produits en revenus.",
            long_description: "Lancez ou refondez votre boutique en ligne avec une solution e-commerce moderne, rapide et optimisée pour les ventes. Architecture scalable, tunnel de conversion optimisé, paiements sécurisés (Stripe, PayPal), et intégration complète avec vos outils de gestion (CRM, ERP, comptabilité). Je vous accompagne également sur la stratégie marketing (SEO, Google Shopping, remarketing) pour générer du chiffre d'affaires dès le lancement.",
            icon: "🛒",
            features: JSON.stringify([
                "Design UX/UI orienté conversion",
                "Intégration paiements sécurisés",
                "Gestion de catalogue automatisée",
                "Suivi des commandes en temps réel",
                "Dashboard analytique complet"
            ]),
            benefits: JSON.stringify([
                "Ventes 24/7 en automatique",
                "Taux de conversion optimisé",
                "Expéditions et stocks synchronisés",
                "Scaling facilité"
            ]),
            technologies: JSON.stringify([
                "Next.js",
                "Stripe",
                "Shopify",
                "WooCommerce",
                "PostgreSQL"
            ]),
            order: 5
        }
    ];

    for (const service of newServices) {
        const created = await prisma.service.upsert({
            where: { slug: service.slug },
            update: service,
            create: service,
        });
        console.log(`✓ Service ajouté : ${created.title}`);
    }

    console.log('✅ Tous les services ont été ajoutés !');
}

main()
    .catch((e) => {
        console.error('❌ Erreur:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
