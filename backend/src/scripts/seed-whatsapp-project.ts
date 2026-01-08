import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding WhatsApp AI Booking Project...');

    const project = {
        title: "Système de Réservation WhatsApp IA",
        slug: "whatsapp-ai-booking-system",
        description: "Assistant virtuel WhatsApp alimenté par GPT-4 qui qualifie les prospects et gère les prises de rendez-vous automatiquement via Cal.com.",
        image: "/projects/whatsapp-booking.jpg",
        tech_stack: JSON.stringify(["n8n", "OpenAI GPT-4", "WhatsApp API", "Cal.com", "Google Sheets"]),
        category: "automation",
        featured: true,
        order: 1, // High priority
        problem: "La gestion manuelle des rendez-vous et des messages entrants est chronophage et source d'erreurs.",
        solution: "Un workflow automatisé qui répond instantanément, qualifie le lead et booke le créneau dans l'agenda.",
        result: "Disponibilité 24/7, zéro oubli de relance, et une expérience client fluide et moderne."
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
