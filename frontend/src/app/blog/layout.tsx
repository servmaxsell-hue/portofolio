import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog - Automatisation & Développement Web',
    description: 'Découvrez mes articles sur l\'automatisation des processus métier (n8n, Make), le développement web moderne (Next.js, NestJS) et l\'intelligence artificielle appliquée au business. Guides pratiques, études de cas et tutoriels.',
    keywords: [
        'Blog Automatisation Business',
        'Tutoriels n8n',
        'Guide Make.com',
        'Articles Développement Web',
        'Chatbot IA Tutoriel',
        'Next.js Best Practices',
        'Workflow Automation',
        'Marketing Automation Guide'
    ],
    openGraph: {
        title: 'Blog Automatisation & Dev Web | Paul Maxime Dossou',
        description: 'Articles experts sur l\'automatisation business, les chatbots IA et le développement web moderne. Guides pratiques et retours d\'expérience.',
        url: 'https://paulmaximedossou.com/blog',
        type: 'website',
        images: [
            {
                url: '/logo.png',
                width: 1200,
                height: 630,
                alt: 'Blog Paul Maxime Dossou',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog Automatisation & Dev Web',
        description: 'Articles experts sur n8n, Make, Next.js et l\'IA.',
    },
    alternates: {
        canonical: 'https://paulmaximedossou.com/blog',
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
