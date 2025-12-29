import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FaArrowLeft, FaCheck, FaCode, FaRobot, FaChartLine, FaArrowRight, FaStar, FaQuoteLeft, FaPhone, FaEnvelope } from 'react-icons/fa';
import api from '@/lib/api';
import { services as staticServices } from '@/data/services-static';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 0;

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
    code: FaCode,
    automation: FaRobot,
    chart: FaChartLine,
};

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    let service;

    try {
        const rawService = await api.getService(slug);
        service = rawService;
    } catch {
        service = staticServices.find((s) => s.slug === slug);
    }

    if (!service) {
        return { title: 'Service non trouvé' };
    }

    return {
        title: `${service.title} | Paul Maxime Dossou`,
        description: service.long_description,
        openGraph: {
            title: `${service.title} - Services`,
            description: service.description,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: service.title,
            description: service.description,
        },
    };
}

export async function generateStaticParams() {
    try {
        const services = await api.getServices();
        return services.map((service) => ({
            slug: service.slug,
        }));
    } catch {
        return staticServices.map((service) => ({
            slug: service.slug,
        }));
    }
}

// Process steps for the service
const processSteps = [
    { step: '01', title: 'Analyse', desc: 'Étude approfondie de vos besoins et objectifs' },
    { step: '02', title: 'Proposition', desc: 'Solution sur mesure avec devis détaillé' },
    { step: '03', title: 'Réalisation', desc: 'Développement avec points réguliers' },
    { step: '04', title: 'Livraison', desc: 'Mise en production et accompagnement' },
];

// FAQ items
const faqs = [
    {
        question: "Quel est le délai moyen pour un projet ?",
        answer: "Le délai varie selon la complexité. Un site vitrine prend 2-4 semaines, une application web 2-3 mois."
    },
    {
        question: "Proposez-vous un accompagnement après livraison ?",
        answer: "Oui, je propose des contrats de maintenance et un support réactif pour tous mes clients."
    },
    {
        question: "Comment se déroule la communication projet ?",
        answer: "Points hebdomadaires, accès à un espace projet dédié, et disponibilité par email/téléphone."
    },
];

export default async function ServiceDetailPage({ params }: PageProps) {
    const { slug } = await params;
    let service;
    let otherServices = [];

    try {
        const rawService = await api.getService(slug);
        service = {
            ...rawService,
            features: typeof rawService.features === 'string' ? JSON.parse(rawService.features || '[]') : (rawService.features || []),
            benefits: typeof rawService.benefits === 'string' ? JSON.parse(rawService.benefits || '[]') : (rawService.benefits || []),
            technologies: typeof rawService.technologies === 'string' ? JSON.parse(rawService.technologies || '[]') : (rawService.technologies || []),
        };
        const allServices = await api.getServices();
        otherServices = allServices.filter((s) => s.slug !== slug);
    } catch {
        service = staticServices.find((s) => s.slug === slug);
        otherServices = staticServices.filter((s) => s.slug !== slug);
    }

    if (!service) {
        notFound();
    }

    const IconComponent = iconMap[service.icon] || FaCode;

    // JSON-LD for the service
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.long_description,
        provider: {
            "@type": "Person",
            name: "Paul Maxime Dossou",
            url: "https://maximedossou.com"
        },
        areaServed: "Worldwide",
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: service.title,
            itemListElement: service.features.map((feature: string, index: number) => ({
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: feature
                },
                position: index + 1
            }))
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    {/* Breadcrumb */}
                    <nav className="mb-8" aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2 text-sm text-gray-500">
                            <li><Link href="/" className="hover:text-gray-900 transition-colors">Accueil</Link></li>
                            <li>/</li>
                            <li><Link href="/services" className="hover:text-gray-900 transition-colors">Services</Link></li>
                            <li>/</li>
                            <li className="text-gray-900 font-medium">{service.title}</li>
                        </ol>
                    </nav>

                    {/* Hero Section */}
                    <header className="max-w-5xl mx-auto mb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-[#e94560] bg-red-50 rounded-full">
                                    Service Expert
                                </span>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                    {service.title}
                                </h1>

                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    {service.long_description}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="btn-primary">
                                        Demander un devis gratuit
                                        <FaArrowRight className="ml-2" />
                                    </Link>
                                    <a href="tel:+2290166659836" className="btn-secondary">
                                        <FaPhone className="mr-2" />
                                        +229 01 66 65 98 36
                                    </a>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-32 h-32 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-3xl flex items-center justify-center shadow-2xl">
                                            <IconComponent className="text-white" size={64} />
                                        </div>
                                    </div>
                                </div>
                                {/* Decoration */}
                                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-[#e94560]/20 to-[#ff6b6b]/20 rounded-3xl -z-10" />
                                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#1a1a2e]/10 to-[#0f3460]/10 rounded-3xl -z-10" />
                            </div>
                        </div>
                    </header>

                    {/* Features & Benefits Grid */}
                    <section className="mb-20" aria-label="Ce que je propose">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ce que <span className="gradient-text">je propose</span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Une approche complète pour répondre à tous vos besoins
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Features */}
                            <div className="card p-8 bg-gradient-to-br from-white to-gray-50">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-xl flex items-center justify-center">
                                        <FaCode className="text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold">Fonctionnalités</h3>
                                </div>
                                <ul className="space-y-4">
                                    {service.features.map((feature: string, index: number) => (
                                        <li key={feature} className="flex items-start gap-4 group">
                                            <span className="w-8 h-8 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold shadow-lg group-hover:scale-110 transition-transform">
                                                {index + 1}
                                            </span>
                                            <span className="text-gray-700 pt-1">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Benefits */}
                            <div className="p-8 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] text-white rounded-2xl shadow-xl border border-white/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                                        <FaStar className="text-[#e94560]" />
                                    </div>
                                    <h3 className="text-2xl font-bold">Vos avantages</h3>
                                </div>
                                <ul className="space-y-4">
                                    {service.benefits.map((benefit: string) => (
                                        <li key={benefit} className="flex items-start gap-4">
                                            <span className="w-6 h-6 bg-[#e94560] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg shadow-red-500/20">
                                                <FaCheck className="text-white text-[10px]" />
                                            </span>
                                            <span className="text-white/90">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Technologies */}
                    <section className="mb-20" aria-label="Technologies utilisées">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Technologies <span className="gradient-text">maîtrisées</span>
                            </h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {service.technologies.map((tech: string) => (
                                <span
                                    key={tech}
                                    className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-semibold hover:border-[#1a1a2e] hover:shadow-lg transition-all cursor-default"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Process */}
                    <section className="mb-20 py-16 bg-gray-50 -mx-6 px-6 rounded-3xl" aria-label="Mon processus">
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-[#0f3460] bg-blue-50 rounded-full">
                                Méthodologie
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Mon <span className="gradient-text">processus</span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Une approche structurée pour garantir le succès de votre projet
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                            {processSteps.map((item, index) => (
                                <div key={item.step} className="text-center relative">
                                    {index < 3 && (
                                        <div className="hidden md:block absolute top-10 left-1/2 w-full h-1 bg-gradient-to-r from-[#1a1a2e] to-[#0f3460]/30 z-0" />
                                    )}
                                    <div className="relative z-10">
                                        <div className="w-20 h-20 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-xl">
                                            {item.step}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-gray-600 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="mb-20" aria-label="Questions fréquentes">
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-amber-600 bg-amber-50 rounded-full">
                                FAQ
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Questions <span className="gradient-text">fréquentes</span>
                            </h2>
                        </div>

                        <div className="max-w-3xl mx-auto space-y-4">
                            {faqs.map((faq) => (
                                <details key={faq.question} className="card p-6 group">
                                    <summary className="font-semibold text-lg cursor-pointer flex items-center justify-between list-none">
                                        {faq.question}
                                        <span className="text-[#e94560] text-2xl group-open:rotate-45 transition-transform">+</span>
                                    </summary>
                                    <p className="mt-4 text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="text-center p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#1a1a2e] via-[#0f3460] to-[#1a1a2e] text-white relative overflow-hidden" aria-label="Appel à l'action">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#e94560]/10 rounded-full blur-3xl" />
                        </div>

                        <div className="relative">
                            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                🎯 Prêt à démarrer ?
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Intéressé par ce service ?
                            </h2>
                            <p className="text-gray-300 mb-8 max-w-lg mx-auto text-lg">
                                Discutons de votre projet et voyons comment je peux vous aider à atteindre vos objectifs.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all hover:-translate-y-1 shadow-lg"
                                >
                                    Demander un devis gratuit
                                    <FaArrowRight className="ml-2" />
                                </Link>
                                <a
                                    href="mailto:contact@paulmaximedossou.com"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/10 transition-all"
                                >
                                    <FaEnvelope className="mr-2" />
                                    M&apos;envoyer un email
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Other Services */}
                    <section className="mt-20" aria-label="Autres services">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Découvrir mes <span className="gradient-text">autres services</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                            {otherServices.map((otherService) => {
                                const OtherIcon = iconMap[otherService.icon] || FaCode;
                                return (
                                    <Link
                                        key={otherService.id}
                                        href={`/services/${otherService.slug}`}
                                        className="card p-6 flex items-center gap-4 group hover:shadow-xl transition-all"
                                    >
                                        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:from-[#1a1a2e] group-hover:to-[#0f3460] transition-all">
                                            <OtherIcon className="text-gray-600 group-hover:text-white transition-colors" size={28} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg group-hover:text-[#e94560] transition-colors">
                                                {otherService.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 line-clamp-1">
                                                {otherService.description}
                                            </p>
                                        </div>
                                        <FaArrowRight className="text-gray-400 group-hover:text-[#e94560] group-hover:translate-x-1 transition-all" />
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
