import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projets & Réalisations - Automatisation & Web',
    description: 'Découvrez mes projets d\'automatisation business : prospection LinkedIn automatique, chatbots WhatsApp IA, workflows n8n/Make, dashboards financiers. Études de cas détaillées avec ROI mesurable.',
    keywords: [
        'Portfolio Automatisation',
        'Projets n8n',
        'Chatbot WhatsApp Réalisations',
        'Prospection LinkedIn Automatisée',
        'Workflow Automation Exemples',
        'Dashboard No-Code',
        'Projets Développement Web'
    ],
    openGraph: {
        title: 'Projets & Réalisations | Paul Maxime Dossou',
        description: 'Portfolio complet : automatisations business, chatbots IA, applications web. Découvrez comment j\'ai aidé mes clients à gagner du temps et de l\'argent.',
        url: 'https://paulmaximedossou.com/projects',
        type: 'website',
        images: [
            {
                url: '/logo.png',
                width: 1200,
                height: 630,
                alt: 'Portfolio Paul Maxime Dossou',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Portfolio Automatisation & Web',
        description: 'Mes réalisations en automatisation et développement.',
    },
    alternates: {
        canonical: 'https://paulmaximedossou.com/projects',
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
