"use client";

import { motion } from 'framer-motion';

export default function LegalPage() {
    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-8">
                        Mentions <span className="gradient-text">Légales</span>
                    </h1>

                    <div className="prose prose-lg prose-gray max-w-none space-y-8 text-gray-600">
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Édition du site</h2>
                            <p className="mb-4">
                                En vertu de l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique,
                                il est précisé aux utilisateurs du site internet <strong>maximedossou.com</strong> l&apos;identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
                            </p>
                            <ul className="space-y-2">
                                <li><strong>Propriétaire du site :</strong> Paul Maxime Dossou</li>
                                <li><strong>Contact :</strong> dossoumaxime888@gmail.com</li>
                                <li><strong>Hébergeur :</strong> Vercel Inc. - 440 N Barranca Ave #4133 Covina, CA 91723</li>
                            </ul>
                        </section>

                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Propriété intellectuelle</h2>
                            <p>
                                <strong>Paul Maxime Dossou</strong> est propriétaire des droits de propriété intellectuelle et détient les droits d’usage sur tous les éléments accessibles sur le site internet,
                                notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.
                            </p>
                            <p className="mt-4">
                                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé,
                                est interdite, sauf autorisation écrite préalable.
                            </p>
                        </section>

                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Limitations de responsabilité</h2>
                            <p>
                                <strong>Paul Maxime Dossou</strong> ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l’utilisateur,
                                lors de l’accès au site.
                            </p>
                            <p className="mt-4">
                                <strong>Paul Maxime Dossou</strong> décline toute responsabilité quant à l’utilisation qui pourrait être faite des informations et contenus présents sur le site.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
