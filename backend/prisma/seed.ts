import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('Paul@0815', 10);

    const user = await prisma.user.upsert({
        where: { email: 'dossoumaxime888@gmail.com' },
        update: {
            password: password,
        },
        create: {
            email: 'dossoumaxime888@gmail.com',
            name: 'Paul Maxime',
            password: password,
        },
    });

    console.log({ user });

    // Seed Projects
    const projects = [
        {
            title: "E-Commerce Platform",
            slug: "e-commerce-platform",
            description: "Plateforme e-commerce complète avec gestion des produits, paiements Stripe, et dashboard admin. Architecture microservices avec Laravel et Next.js.",
            image: "/projects/ecommerce.jpg",
            tech_stack: JSON.stringify(["Laravel", "Next.js", "PostgreSQL", "Stripe", "Docker"]),
            github_url: "https://github.com/Maxience/ecommerce",
            live_url: "https://ecommerce-demo.com",
            category: "fullstack",
            featured: true,
            problem: "L'ancien système monolithique n'était pas scalable et les temps de chargement étaient trop longs, causant une perte de revenue estimée à 20%.",
            solution: "Migration vers une architecture microservices et utilisation de Next.js pour le frontend. Mise en place de cache Redis et optimisation des requêtes DB.",
            result: "Temps de chargement réduit de 60%, augmentation du taux de conversion de 25% et capacité de gérer 10x plus de trafic simultané."
        },
        {
            title: "CRM Automatisé",
            slug: "crm-automatise",
            description: "Solution CRM sur mesure avec automatisation des workflows via n8n. Intégration avec Slack, Email, et Google Workspace.",
            image: "/projects/crm.jpg",
            tech_stack: JSON.stringify(["Laravel", "Vue.js", "n8n", "MySQL", "Redis"]),
            github_url: "https://github.com/Maxience/crm-auto",
            category: "automation",
            featured: true,
            problem: "L'entreprise perdait 15h/semaine par employé sur des tâches manuelles répétitives (saisie de leads, relances) avec un taux d'erreur de 12%.",
            solution: "Création d'un CRM sur mesure connecté à n8n. Automatisation complète des flux de travail : capture de leads, enrichissement des données, et séquences d'emailing.",
            result: "Gain de 15h/semaine par employé, réduction des erreurs à <1%, et augmentation de la satisfaction client grâce à une réactivité instantanée."
        },
        {
            title: "Dashboard Marketing Analytics",
            slug: "dashboard-marketing-analytics",
            description: "Dashboard temps réel pour suivi des performances Google Ads et Microsoft Ads. Visualisations interactives.",
            image: "/projects/dashboard.jpg",
            tech_stack: JSON.stringify(["Next.js", "Python", "Chart.js", "Google Ads API"]),
            category: "marketing",
            featured: true
        }
    ];

    for (const p of projects) {
        const project = await prisma.project.upsert({
            where: { slug: p.slug },
            update: {},
            create: p,
        });
        console.log(`Created project with id: ${project.id}`);
    }

    // Seed Services
    const services = [
        {
            title: "Développement Web Fullstack",
            slug: "developpement-web-fullstack",
            description: "Conception et développement d'applications web sur mesure, de la base de données à l'interface utilisateur.",
            features: JSON.stringify(["Applications Laravel / PHP", "Interfaces React / Next.js", "APIs REST & GraphQL"]),
            order: 1
        },
        {
            title: "Automatisation n8n",
            slug: "automatisation-workflows",
            description: "Création de workflows automatisés pour optimiser vos processus métier et gagner en productivité.",
            features: JSON.stringify(["Audit des processus", "Workflows sur mesure", "Intégrations API"]),
            order: 2
        }
    ];

    for (const s of services) {
        await prisma.service.upsert({
            where: { slug: s.slug },
            update: {},
            create: s
        });
    }

}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
