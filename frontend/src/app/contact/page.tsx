"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaPaperPlane, FaCheck, FaPhone } from 'react-icons/fa';
import api from '@/lib/api';

function ContactFormContent() {
    const searchParams = useSearchParams();
    const projectRef = searchParams.get('project');
    const serviceRef = searchParams.get('service');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    useEffect(() => {
        if (projectRef) {
            setFormData(prev => ({
                ...prev,
                subject: 'project',
                message: `Bonjour, j'ai vu votre projet "${projectRef}" et j'aimerais réaliser quelque chose de similaire. \n\n[Décrivez vos besoins ici...]`
            }));
        } else if (serviceRef) {
            setFormData(prev => ({
                ...prev,
                subject: 'project',
                message: `Bonjour, je suis intéressé par votre service "${serviceRef}" et j'aimerais obtenir un devis gratuit. \n\n[Décrivez votre demande ici...]`
            }));
        }
    }, [projectRef, serviceRef]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await api.submitContact({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
            });
            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Me <span className="gradient-text">Contacter</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        {projectRef ? `Discutons de votre projet inspiré par "${projectRef}"` :
                            serviceRef ? `Demandez un devis gratuit pour "${serviceRef}"` :
                                "Une question, un projet ? N'hésitez pas à me contacter."}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Informations</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaEnvelope className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Email</p>
                                        <a
                                            href="mailto:dossoumaxime888@gmail.com"
                                            className="text-gray-600 hover:text-[#e94560] transition-colors"
                                        >
                                            dossoumaxime888@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaPhone className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Téléphone</p>
                                        <a
                                            href="tel:+2290166659836"
                                            className="text-gray-600 hover:text-[#e94560] transition-colors"
                                        >
                                            +229 01 66 65 98 36
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaMapMarkerAlt className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Localisation</p>
                                        <p className="text-gray-600">Cotonou, Bénin</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold mb-4">Réseaux sociaux</h3>
                            <div className="flex gap-4">
                                <a
                                    href="https://github.com/Maxience"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-all"
                                >
                                    <FaGithub size={20} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/paul-maxime-dossou-88a516258/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0077b5] hover:text-white transition-all"
                                >
                                    <FaLinkedin size={20} />
                                </a>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] text-white">
                            <h4 className="font-bold mb-2">Disponibilité</h4>
                            <p className="text-gray-300 text-sm">
                                Je suis actuellement disponible pour de nouveaux projets.
                                Temps de réponse : sous 24h.
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <div className="card p-8">
                            <h3 className="text-2xl font-bold mb-6">Envoyez-moi un message</h3>

                            {isSubmitted && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3"
                                >
                                    <FaCheck className="text-green-500" />
                                    Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Nom complet *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Votre nom"
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="votre@email.com"
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Sujet *
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full"
                                    >
                                        <option value="">Sélectionnez un sujet</option>
                                        <option value="project">Nouveau projet</option>
                                        <option value="collaboration">Collaboration</option>
                                        <option value="question">Question générale</option>
                                        <option value="other">Autre</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        placeholder="Décrivez votre projet ou votre demande..."
                                        className="w-full resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="animate-spin mr-2">⏳</span>
                                            Envoi en cours...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="mr-2" />
                                            Envoyer le message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <Suspense fallback={
            <div className="pt-32 pb-20 flex items-center justify-center min-h-screen bg-white">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <ContactFormContent />
        </Suspense>
    );
}
