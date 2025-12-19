"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCode, FaRobot, FaChartLine, FaCheck, FaArrowRight, FaSpinner, FaRocket, FaHandshake, FaLightbulb, FaCogs, FaQuestionCircle, FaSearch, FaPencilRuler, FaLaptopCode, FaPaperPlane } from 'react-icons/fa';
import api, { Service } from '@/lib/api';
import { services as staticServices } from '@/data';

// Map icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    code: FaCode,
    automation: FaRobot,
    chart: FaChartLine,
};

// Process Steps Data
const processSteps = [
    {
        id: 1,
        icon: FaSearch,
        title: "Découverte",
        desc: "Analyse de vos besoins et objectifs pour définir la meilleure stratégie.",
        color: "from-blue-400 to-blue-600"
    },
    {
        id: 2,
        icon: FaPencilRuler,
        title: "Conception",
        desc: "Design UI/UX et validation de l'architecture technique.",
        color: "from-purple-400 to-purple-600"
    },
    {
        id: 3,
        icon: FaLaptopCode,
        title: "Développement",
        desc: "Intégration et codage avec des points d'étape réguliers.",
        color: "from-pink-400 to-pink-600"
    },
    {
        id: 4,
        icon: FaPaperPlane,
        title: "Lancement",
        desc: "Mise en ligne, tests finaux et formation à l'utilisation.",
        color: "from-green-400 to-green-600"
    },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": staticServices.map((service, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "Service",
            "name": service.title,
            "description": service.description,
            "url": `https://maximedossou.com/services/${service.slug}`
        }
    }))
};

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchServices() {
            try {
                const rawData = await api.getServices();
                const processedData = rawData.map((s: any) => ({
                    ...s,
                    features: typeof s.features === 'string' ? JSON.parse(s.features || '[]') : (s.features || []),
                }));
                setServices(processedData.length > 0 ? processedData : staticServices);
            } catch {
                setServices(staticServices);
            } finally {
                setLoading(false);
            }
        }
        fetchServices();
    }, []);

    if (loading) {
        return (
            <div className="pt-32 pb-20 flex justify-center">
                <FaSpinner className="animate-spin text-4xl text-gray-400" />
            </div>
        );
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="pt-32 pb-20 overflow-hidden">
                <div className="container mx-auto px-6">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center mb-24 relative"
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl -z-10 opacity-60" />


                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-gray-900">
                            Mes <span className="gradient-text">Services</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            J'accompagne les entreprises ambitieuses avec des solutions digitales
                            <span className="font-semibold text-gray-900"> performantes</span> et <span className="font-semibold text-gray-900">sur-mesure</span>.
                        </p>
                    </motion.div>

                    {/* Services List - Modern Cards */}
                    <div className="space-y-32 mb-32">
                        {services.map((service, index) => {
                            const IconComponent = iconMap[service.icon] || FaCode;
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                    className={`flex flex-col lg:flex-row gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                                >
                                    {/* Visual Side */}
                                    <div className="flex-1 w-full group perspective-1000">
                                        <div className="relative transform transition-transform duration-500 group-hover:rotate-y-2">
                                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-[2.5rem] transform rotate-3 opacity-70 group-hover:rotate-6 transition-transform duration-500" />
                                            <div className="relative bg-white rounded-[2rem] p-10 shadow-xl border border-gray-50 overflow-hidden">
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />

                                                <div className="w-24 h-24 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-2xl flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                                    <IconComponent className="text-white text-5xl" />
                                                </div>

                                                {/* Mini Stats/Floating cards for visual richness */}
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                            <FaCheck size={14} />
                                                        </div>
                                                        <span className="font-medium text-gray-700">Audit complet inclus</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                            <FaRocket size={14} />
                                                        </div>
                                                        <span className="font-medium text-gray-700">Optimisation performances</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="flex-1 space-y-8">
                                        <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                                            {service.title}
                                        </h2>
                                        <p className="text-xl text-gray-500 leading-relaxed">
                                            {service.description}
                                        </p>

                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-6 text-lg">Inclus dans la prestation :</h3>
                                            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                                                {service.features.map((feature) => (
                                                    <div key={feature} className="flex items-start gap-3 group/item">
                                                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover/item:bg-blue-100 transition-colors">
                                                            <FaCheck className="text-blue-600 text-xs" />
                                                        </div>
                                                        <span className="text-gray-600 group-hover/item:text-gray-900 transition-colors">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <Link
                                                href={`/services/${service.slug}`}
                                                className="btn-primary inline-flex items-center group"
                                            >
                                                Découvrir l&apos;offre
                                                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Process Section - Dynamic */}
                    <div className="mb-40">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-60"
                        >
                            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Méthodologie</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Comment on avance ?</h2>
                        </motion.div>

                        <div className="relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative">
                                {processSteps.map((step, index) => (
                                    <motion.div
                                        key={step.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.2 }}
                                        className="relative group"
                                    >
                                        {/* Step Number Badge */}
                                        <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-16 h-16 bg-white rounded-full border-4 border-gray-50 shadow-lg flex items-center justify-center font-bold text-xl text-gray-400 group-hover:border-blue-500 group-hover:text-blue-600 transition-colors z-10 mb-6 lg:mb-0 mx-auto">
                                            {step.id}
                                        </div>

                                        {/* Card content - Alternating top/bottom for fun on desktop */}
                                        <div className={`
                                            bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300
                                            lg:absolute lg:w-full lg:left-0
                                            ${index % 2 === 0 ? 'lg:bottom-[calc(50%+85px)]' : 'lg:top-[calc(50%+85px)]'}
                                        `}>
                                            <div className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white text-xl mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                                                <step.icon />
                                            </div>
                                            <h3 className="font-bold text-xl mb-3 text-gray-900">{step.title}</h3>
                                            <p className="text-gray-500 text-sm leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>

                                        {/* Spacer for desktop layout grid flow */}
                                        <div className="hidden lg:block h-96"></div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FAQ & Final CTA Split */}
                    <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
                        {/* FAQ */}
                        <div>
                            <h2 className="text-3xl font-bold mb-8">Questions Fréquentes</h2>
                            <div className="space-y-4">
                                {[
                                    { q: "Quels sont vos délais ?", a: "Pour un site vitrine, comptez 2-3 semaines. Pour des projets plus complexes, je fournis un planning détaillé après l'audit." },
                                    { q: "Travaillez-vous avec des agences ?", a: "Oui, je collabore régulièrement avec des agences en marque blanche ou en renfort d'équipe." },
                                    { q: "Incluez-vous le SEO ?", a: "Absolument. Tous mes sites sont optimisés techniquement pour le référencement naturel (Structure, Performance, Métadonnées)." },
                                ].map((faq, i) => (
                                    <div key={i} className="bg-gray-50 rounded-xl p-6 group hover:bg-white hover:shadow-md transition-all cursor-default">
                                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                            <FaQuestionCircle className="text-blue-500 opacity-50" />
                                            {faq.q}
                                        </h3>
                                        <p className="text-gray-600 text-sm pl-6">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Card */}
                        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-3xl p-10 text-white text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            <h2 className="text-3xl font-bold mb-6 relative z-10">Convaincu ?</h2>
                            <p className="text-gray-300 mb-8 relative z-10">
                                Le meilleur moment pour lancer votre projet, c&apos;est maintenant.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-block px-8 py-4 bg-white text-blue-900 font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all relative z-10"
                            >
                                Demander un devis
                            </Link>

                            <div className="mt-8 pt-8 border-t border-white/10 flex justify-center gap-8 relative z-10">
                                <div className="text-center">
                                    <div className="font-bold text-2xl">100%</div>
                                    <div className="text-xs text-gray-400">Respect délais</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-2xl">5★</div>
                                    <div className="text-xs text-gray-400">Satisfaction</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
