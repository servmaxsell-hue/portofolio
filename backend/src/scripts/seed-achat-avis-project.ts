import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding AchatAvis.com Project...');

    const project = {
        title: "AchatAvis.com - E-Réputation IA",
        slug: "achat-avis-ia",
        description: "Plateforme d'E-Réputation propulsée par 7 agents IA autonomes (Sophie, Thomas, etc.) qui gèrent vos avis, SEO local et appels 24/7.",
        image: "/projects/achat-avis.jpg",
        tech_stack: JSON.stringify(["Next.js", "n8n", "Twilio", "ElevenLabs", "Google Business API"]),
        live_url: "https://achat-avis.vercel.app/",
        category: "fullstack",
        featured: true,
        order: 3,
        problem: "Les artisans perdent 30% de CA à cause des appels manqués (127€/appel) et d'une mauvaise gestion des avis Google.",
        solution: "Une équipe de 7 agents IA spécialisés qui travaillent nuit et jour pour booster le classement local et répondre instantanément.",
        result: "+30% de chiffre d'affaires, 0 appel manqué et une e-réputation impeccable sans intervention humaine."
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
