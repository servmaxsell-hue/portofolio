"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    FaRobot,
    FaCheck,
    FaArrowRight,
    FaClock,
    FaChartLine,
    FaLightbulb,
    FaCogs,
    FaDatabase,
    FaEnvelope,
    FaShoppingCart,
    FaSlack,
    FaGoogle,
    FaTachometerAlt,
    FaShieldAlt
} from 'react-icons/fa';
import { SiMake, SiZapier } from 'react-icons/si';

// Use cases data
const useCases = [
    {
        icon: FaEnvelope,
        title: "Email Marketing Automatisé",
        description: "Synchronisez vos contacts, envoyez des campagnes personnalisées et suivez les performances en temps réel.",
        benefits: ["Gain de temps : 10h/semaine", "Taux d'engagement +45%", "ROI amélioré"],
        tools: ["n8n", "Make", "Mailchimp", "Brevo"]
    },
    {
        icon: FaDatabase,
        title: "Sync CRM & Bases de Données",
        description: "Centralisez vos données clients entre plusieurs plateformes sans intervention manuelle.",
        benefits: ["Données à jour en temps réel", "Zéro erreur de saisie", "Vision 360° client"],
        tools: ["n8n", "PostgreSQL", "Airtable", "Google Sheets"]
    },
    {
        icon: FaShoppingCart,
        title: "E-commerce & Gestion Stocks",
        description: "Automatisez la gestion des commandes, stocks et notifications clients.",
        benefits: ["Réduction erreurs : 95%", "Traitement instantané", "Satisfaction client +30%"],
        tools: ["Make", "WooCommerce", "Shopify", "Slack"]
    },
    {
        icon: FaSlack,
        title: "Notifications & Alertes",
        description: "Recevez des alertes intelligentes sur les événements critiques de votre business.",
        benefits: ["Réactivité maximale", "Aucun événement manqué", "Équipe synchronisée"],
        tools: ["n8n", "Slack", "Discord", "Telegram"]
    },
    {
        icon: FaGoogle,
        title: "Automatisation Ads & Analytics",
        description: "Générez des rapports automatiques et optimisez vos campagnes publicitaires.",
        benefits: ["Rapports quotidiens auto", "Décisions data-driven", "Budget optimisé"],
        tools: ["Make", "Google Ads", "Facebook Ads", "Data Studio"]
    },
    {
        icon: FaChartLine,
        title: "Lead Nurturing Intelligent",
        description: "Qualifiez et nourrissez automatiquement vos leads selon leur comportement.",
        benefits: ["Conversion +60%", "Pipeline structuré", "Scoring automatique"],
        tools: ["n8n", "HubSpot", "Pipedrive", "ActiveCampaign"]
    }
];

// Tools comparison
const toolsComparison = [
    {
        name: "n8n",
        logo: "🔹",
        best: "Open-source, Self-hosted, Flexibilité maximale",
        price: "Gratuit (self-hosted) ou à partir de 20$/mois",
        ideal: "Startups tech, Développeurs, Projets complexes"
    },
    {
        name: "Make.com",
        logo: "🟣",
        best: "Interface visuelle intuitive, Templates riches",
        price: "À partir de 9$/mois (+ free tier généreux)",
        ideal: "PME, Agences, Marketing teams"
    },
    {
        name: "Zapier",
        logo: "🟠",
        best: "5000+ intégrations, Setup ultra-rapide",
        price: "À partir de 19.99$/mois",
        ideal: "Non-techniques, Besoin ponctuel, Rapidité"
    }
];

// Benefits stats
const benefits = [
    {
        icon: FaClock,
        stat: "80%",
        label: "Gain de temps",
        desc: "Réduisez les tâches manuelles répétitives"
    },
    {
        icon: FaTachometerAlt,
        stat: "95%",
        label: "Précision",
        desc: "Éliminez les erreurs humaines"
    },
    {
        icon: FaChartLine,
        stat: "3x",
        label: "ROI",
        desc: "Retour sur investissement moyen en 6 mois"
    },
    {
        icon: FaShieldAlt,
        stat: "24/7",
        label: "Disponibilité",
        desc: "Workflows qui tournent en continu"
    }
];

// FAQ data
const faqs = [
    {
        q: "L'automatisation va-t-elle remplacer mon équipe ?",
        a: "Non ! L'automatisation libère votre équipe des tâches répétitives pour qu'elle se concentre sur des missions à haute valeur ajoutée : stratégie, créativité, relation client."
    },
    {
        q: "Combien de temps pour mettre en place une automatisation ?",
        a: "Selon la complexité : de quelques heures pour un workflow simple (sync email → CRM) à 2-3 semaines pour un système complet multi-plateformes."
    },
    {
        q: "Quels sont les coûts ?",
        a: "Variable selon l'outil choisi et le volume. n8n peut être gratuit (self-hosted), Make démarre à 9€/mois, Zapier à 20€/mois. J'optimise pour votre budget."
    },
    {
        q: "Puis-je automatiser sans compétences techniques ?",
        a: "Oui grâce aux solutions no-code comme Make ou Zapier. Mais pour des besoins avancés, mon expertise technique vous garantit des workflows robustes et évolutifs."
    },
    {
        q: "Comment mesurer le ROI de l'automatisation ?",
        a: "Calcul simple : (Heures économisées × Coût horaire) - Coût des outils. En moyenne, mes clients observent un ROI positif dès le 3ème mois."
    }
];

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Automatisation de Processus Métier",
    "provider": {
        "@type": "Person",
        "name": "Paul Maxime Dossou",
        "url": "https://paulmaximedossou.com"
    },
    "areaServed": {
        "@type": "Country",
        "name": "Bénin"
    },
    "description": "Services d'automatisation de processus métier avec n8n, Make.com et Zapier pour optimiser vos workflows et gagner en productivité.",
    "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "USD",
        "priceRange": "$$"
    }
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
        }
    }))
};

export default function AutomatisationPage() {
    const [activeTab, setActiveTab] = useState<string>("n8n");

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <div className="pt-32 pb-20 overflow-hidden">
                <div className="container mx-auto px-6">

                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-5xl mx-auto text-center mb-24 relative"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100 rounded-full blur-3xl -z-10 opacity-50" />

                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-purple-600 bg-purple-50 rounded-full">
                            Automatisation & No-Code
                        </span>

                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-gray-900">
                            Automatisez vos <span className="gradient-text">Processus Métier</span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                            Gagnez jusqu'à <strong>20 heures par semaine</strong> en automatisant vos tâches répétitives
                            avec <strong>n8n</strong>, <strong>Make.com</strong> ou <strong>Zapier</strong>.
                            Je conçois des workflows intelligents qui transforment votre façon de travailler.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                                Audit gratuit de vos processus
                                <FaArrowRight className="ml-2" />
                            </Link>
                            <a href="#use-cases" className="btn-secondary text-lg px-8 py-4">
                                Découvrir les cas d'usage
                            </a>
                        </div>
                    </motion.div>

                    {/* Benefits Stats */}
                    <section className="mb-32">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="card p-6 text-center group hover:shadow-xl transition-all"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform">
                                        <benefit.icon />
                                    </div>
                                    <div className="text-4xl font-bold gradient-text mb-2">{benefit.stat}</div>
                                    <div className="font-semibold text-gray-800 mb-1">{benefit.label}</div>
                                    <div className="text-sm text-gray-500">{benefit.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Use Cases Section */}
                    <section id="use-cases" className="mb-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
                                Cas d'Usage
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Ce que je peux <span className="gradient-text">automatiser</span> pour vous
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Des workflows sur mesure adaptés à vos besoins métier
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {useCases.map((useCase, index) => (
                                <motion.div
                                    key={useCase.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="card p-8 group hover:shadow-2xl transition-all"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-3xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all">
                                        <useCase.icon />
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 text-gray-900">{useCase.title}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{useCase.description}</p>

                                    <div className="space-y-2 mb-6">
                                        {useCase.benefits.map((benefit) => (
                                            <div key={benefit} className="flex items-center gap-2 text-sm text-gray-700">
                                                <FaCheck className="text-green-500 flex-shrink-0" />
                                                <span>{benefit}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex flex-wrap gap-2">
                                            {useCase.tools.map((tool) => (
                                                <span key={tool} className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Tools Comparison */}
                    <section className="mb-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                <span className="gradient-text">Quel outil</span> d'automatisation choisir ?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Je vous aide à sélectionner la solution la plus adaptée à vos besoins
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {toolsComparison.map((tool, index) => (
                                <motion.div
                                    key={tool.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="card p-8 relative overflow-hidden group hover:shadow-2xl transition-all"
                                >
                                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{tool.logo}</div>

                                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{tool.name}</h3>

                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <div className="text-sm font-semibold text-gray-500 mb-1">Points forts</div>
                                            <div className="text-gray-700">{tool.best}</div>
                                        </div>

                                        <div>
                                            <div className="text-sm font-semibold text-gray-500 mb-1">Prix</div>
                                            <div className="text-gray-700">{tool.price}</div>
                                        </div>

                                        <div>
                                            <div className="text-sm font-semibold text-gray-500 mb-1">Idéal pour</div>
                                            <div className="text-gray-700">{tool.ideal}</div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-gray-50 to-transparent rounded-full" />
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl text-center"
                        >
                            <FaLightbulb className="text-4xl text-blue-600 mx-auto mb-4" />
                            <h4 className="text-xl font-bold mb-2">Pas sûr de votre choix ?</h4>
                            <p className="text-gray-600 mb-4">Je vous recommande la solution optimale selon votre budget, volume et complexité.</p>
                            <Link href="/contact" className="btn-primary inline-flex items-center">
                                Demander conseil
                                <FaArrowRight className="ml-2" />
                            </Link>
                        </motion.div>
                    </section>

                    {/* FAQ Section */}
                    <section className="mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Questions <span className="gradient-text">Fréquentes</span>
                            </h2>
                        </motion.div>

                        <div className="max-w-4xl mx-auto space-y-6">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="card p-8"
                                >
                                    <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-start gap-3">
                                        <span className="text-purple-500 flex-shrink-0">Q.</span>
                                        {faq.q}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed pl-7">{faq.a}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Final CTA */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

                        <FaRobot className="text-6xl mx-auto mb-6 relative z-10" />
                        <h2 className="text-4xl font-bold mb-6 relative z-10">
                            Prêt à automatiser votre business ?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
                            Commençons par un audit gratuit de vos processus actuels.
                            Je vous montre le potentiel d'automatisation et le ROI prévisible.
                        </p>

                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all relative z-10"
                        >
                            <FaEnvelope />
                            Demander un audit gratuit
                            <FaArrowRight />
                        </Link>

                        <div className="mt-10 pt-10 border-t border-white/10 grid grid-cols-3 gap-8 max-w-2xl mx-auto relative z-10">
                            <div>
                                <div className="text-3xl font-bold mb-1">48h</div>
                                <div className="text-sm text-gray-400">Réponse garantie</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-1">100%</div>
                                <div className="text-sm text-gray-400">Sur mesure</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-1">5★</div>
                                <div className="text-sm text-gray-400">Satisfaction</div>
                            </div>
                        </div>
                    </motion.section>

                </div>
            </div>
        </>
    );
}
