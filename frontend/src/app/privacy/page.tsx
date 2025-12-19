"use client";

import { motion } from 'framer-motion';

export default function PrivacyPage() {
    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-8">
                        Politique de <span className="gradient-text">Confidentialité</span>
                    </h1>

                    <div className="prose prose-lg prose-gray max-w-none space-y-8 text-gray-600">
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Collecte de l&apos;information</h2>
                            <p>
                                Nous recueillons des informations lorsque vous utilisez notre formulaire de contact.
                                Les informations recueillies incluent votre nom, votre adresse e-mail et votre numéro de téléphone.
                            </p>
                        </section>

                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Utilisation des informations</h2>
                            <p className="mb-4">Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Vous contacter par e-mail ou téléphone suite à votre demande</li>
                                <li>Améliorer notre site Web</li>
                                <li>Améliorer le service client et vos besoins de prise en charge</li>
                            </ul>
                        </section>

                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Protection des informations</h2>
                            <p>
                                Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles.
                                Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne.
                            </p>
                        </section>

                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Divulgation à des tiers</h2>
                            <p>
                                Nous ne vendons, n&apos;échangeons et ne transférons pas vos informations personnelles identifiables à des tiers.
                                Cela ne comprend pas les tierce parties de confiance qui nous aident à exploiter notre site Web, tant que ces parties conviennent de garder ces informations confidentielles.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
