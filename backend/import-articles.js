const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "mysql://u262725529_portfolio:Paul%400815@srv2024.hstgr.io:3306/u262725529_portfolio"
        }
    }
});

const articles = [
    {
        title: "Pourquoi n8n est l'alternative parfaite à Zapier pour les PME au Bénin",
        slug: "n8n-vs-zapier-benin",
        excerpt: "Découvrez pourquoi n8n est la solution d'automatisation la plus rentable et flexible pour les entreprises béninoises en 2026.",
        fileName: "article-n8n-vs-zapier.html",
        tags: "Automatisation, n8n, Zapier, Business, Bénin",
        read_time: 10
    },
    {
        title: "Top 5 des tâches répétitives à automatiser dès aujourd'hui",
        slug: "top-5-taches-automatisables",
        excerpt: "Libérez 15h par semaine en automatisant ces 5 processus critiques pour votre business.",
        fileName: "article-top-5-taches.html",
        tags: "Productivité, Business, n8n, CRM",
        read_time: 8
    },
    {
        title: "Comment j'ai automatisé ma prospection LinkedIn avec l'IA",
        slug: "prospection-linkedin-ia-automation",
        excerpt: "Ma méthode complète pour générer des rendez-vous qualifiés en automatique grâce à n8n et GPT-4.",
        fileName: "article-linkedin-automation.html",
        tags: "Prospection, LinkedIn, IA, n8n, Sales",
        read_time: 9
    },
    {
        title: "WhatsApp Business + Google Sheets : Créez votre CRM sans coder",
        slug: "whatsapp-crm-google-sheets",
        excerpt: "Ne perdez plus aucune commande WhatsApp. Centralisez tout dans Google Sheets automatiquement.",
        fileName: "article-whatsapp-sheets.html",
        tags: "WhatsApp, Google Sheets, CRM, No-Code, Bénin",
        read_time: 7
    }
];

async function insertArticles() {
    console.log('🚀 Début de l\'insertion des articles...');

    for (const art of articles) {
        const filePath = path.join(__dirname, 'articles-html', art.fileName);
        try {
            const content = fs.readFileSync(filePath, 'utf8');

            await prisma.article.upsert({
                where: { slug: art.slug },
                update: {
                    title: art.title,
                    excerpt: art.excerpt,
                    content: content,
                    tags: art.tags,
                    read_time: art.read_time,
                    published: true,
                    published_at: new Date()
                },
                create: {
                    title: art.title,
                    slug: art.slug,
                    excerpt: art.excerpt,
                    content: content,
                    tags: art.tags,
                    read_time: art.read_time,
                    published: true,
                    published_at: new Date()
                }
            });
            console.log(`✅ Article inséré/mis à jour : ${art.title}`);
        } catch (error) {
            console.error(`❌ Erreur pour l'article ${art.fileName}:`, error.message);
        }
    }

    console.log('✨ Opération terminée !');
}

insertArticles()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
