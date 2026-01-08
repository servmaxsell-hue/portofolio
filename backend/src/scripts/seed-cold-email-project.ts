import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Cold Email IA Project...');

    const project = {
        title: "Prospection Cold Email IA : LinkedIn + Claude 3.7",
        slug: "cold-email-ia-linkedin",
        description: "Automatisation complète : Scrape LinkedIn, enrichissement des données et rédaction d'emails ultra-personnalisés par Claude 3.7.",
        image: "/projects/cold-email-ai.jpg",
        tech_stack: JSON.stringify(["n8n", "Apify", "Claude 3.7", "Google Sheets", "Gmail"]),
        category: "automation",
        featured: true,
        order: 2,
        problem: "La prospection manuelle est lente et la personnalisation à grande échelle est impossible humainement.",
        solution: "Un workflow n8n qui scrape LinkedIn via Apify, enrichit les données, et utilise Claude 3.7 pour rédiger des emails d'approche uniques.",
        result: "Taux de réponse x3 grâce à l'hyper-personnalisation et 100% de gain de temps sur la rédaction."
    };

    const result = await prisma.project.upsert({
        where: { slug: project.slug },
        update: project,
        create: project,
    });

    console.log(`✓ Seeded project: ${result.title}`);
}

main()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
