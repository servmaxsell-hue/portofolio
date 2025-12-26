import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Adding 3 new services...');

    const newServices = [
        {
            title: "Stratégie Marketing Digital & Growth",
            slug: "strategie-marketing-digital-growth",
            description: "Accélérez votre croissance avec une stratégie marketing complète. Acquisition, conversion et fidélisation : je vous accompagne de A à Z.",
            long_description: "Le marketing digital n'est pas qu'une question d'outils, c'est une stratégie globale. Je vous aide à définir vos personas, votre proposition de valeur unique, et à construire un plan d'acquisition multi-canal rentable. De l'audit jusqu'à l'exécution : SEO, SEA, social media, emailing, content marketing. Chaque action est mesurée, optimisée et alignée sur vos objectifs business. Résultat : plus de leads qualifiés, meilleur taux de conversion, et croissance pérenne.",
            icon: "📈",
            features: JSON.stringify([
                "Audit marketing 360° de votre présence en ligne",
                "Définition de personas et buyer journey",
                "Plan d'acquisition multi-canal (SEO/SEA/Social)",
                "Funnel de conversion optimisé",
                "Tableaux de bord KPIs et reporting mensuel"
            ]),
            benefits: JSON.stringify([
                "Stratégie claire et actionnaire",
                "ROI mesurable sur chaque canal",
                "Optimisation continue basée sur la data",
                "Croissance prévisible et scalable"
            ]),
            technologies: JSON.stringify([
                "Google Analytics 4",
                "Meta Business Suite",
                "HubSpot/ActiveCampaign",
                "Google Tag Manager",
                "Looker Studio"
            ]),
            order: 6
        },
        {
            title: "Création de Sites Web Pro (Entreprises & Particuliers)",
            slug: "creation-sites-web-professionnels",
            description: "Votre site vitrine ou corporate sur-mesure. Design moderne, rapide et optimisé pour convertir vos visiteurs en clients.",
            long_description: "Que vous soyez entrepreneur, PME ou grande entreprise, votre site web est votre première impression. Je crée des sites modernes, ultra-rapides et pensés pour la conversion. Architecture SEO-friendly, design responsive mobile-first, et performance optimale (Core Web Vitals). Chaque site est livré avec un CMS simple pour que vous puissiez modifier vos contenus en autonomie. Hébergement sécurisé, maintenance incluse, et accompagnement pour faire évoluer votre site selon vos besoins.",
            icon: "🌐",
            features: JSON.stringify([
                "Design sur-mesure adapté à votre identité",
                "Développement responsive (mobile/tablet/desktop)",
                "CMS intuitif (WordPress, Webflow ou custom)",
                "Optimisation SEO technique intégrée",
                "Hébergement performant et sécurisé"
            ]),
            benefits: JSON.stringify([
                "Site livré clé en main en 2-4 semaines",
                "Autonomie totale sur vos contenus",
                "Performance et vitesse garanties",
                "Support et maintenance continue"
            ]),
            technologies: JSON.stringify([
                "Next.js",
                "WordPress",
                "Webflow",
                "Vercel/AWS",
                "Figma"
            ]),
            order: 7
        },
        {
            title: "Chatbots Intelligents & Assistants IA",
            slug: "chatbots-intelligents-assistants-ia",
            description: "Automatisez votre support client et qualification de leads avec des chatbots IA de nouvelle génération. Disponibles 24/7, ils répondent comme des humains.",
            long_description: "Les chatbots IA modernes (GPT-4, Claude) peuvent gérer 80% de vos demandes clients sans intervention humaine. Je crée des assistants conversationnels sur-mesure qui comprennent le contexte, répondent avec pertinence, et qualifient vos leads automatiquement. Intégration sur votre site web, WhatsApp, Facebook Messenger ou Slack. Chaque conversation alimente votre CRM et vous recevez des notifications pour les demandes urgentes. Résultat : support client instantané, économie de temps massif, et taux de satisfaction client en hausse.",
            icon: "🤖",
            features: JSON.stringify([
                "Chatbot GPT-4 entraîné sur vos données",
                "Intégration multi-canal (site, WhatsApp, Messenger)",
                "Qualification automatique des leads",
                "Transfert vers humain si nécessaire",
                "Analytics et amélioration continue"
            ]),
            benefits: JSON.stringify([
                "Support client 24/7 sans embauche",
                "Temps de réponse instantané",
                "Leads qualifiés en auto-pilote",
                "Satisfaction client améliorée"
            ]),
            technologies: JSON.stringify([
                "OpenAI GPT-4",
                "Dialogflow",
                "n8n",
                "Voiceflow",
                "Zapier/Make"
            ]),
            order: 8
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

    console.log('✅ Les 3 nouveaux services ont été ajoutés !');
}

main()
    .catch((e) => {
        console.error('❌ Erreur:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
