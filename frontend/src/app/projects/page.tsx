"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa';
import api, { Project } from '@/lib/api';
import { projects as staticProjects } from '@/data';

const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'fullstack', label: 'Fullstack' },
    { id: 'web', label: 'Web' },
    { id: 'automation', label: 'Automatisation' },
    { id: 'marketing', label: 'Marketing' },
];

interface ProjectCardProps {
    project: Project;
    index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ delay: index * 0.05 }}
        className="card group overflow-hidden"
    >
        <div className="aspect-video bg-gray-100 relative overflow-hidden">
            {project.image ? (
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
            )}

            {project.featured && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white text-xs font-medium rounded-full z-10">
                    En vedette
                </span>
            )}

            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/90 to-[#0f3460]/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 z-20">
                <Link
                    href={`/projects/${project.slug}`}
                    className="px-6 py-2 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                    Voir le projet
                </Link>
            </div>
        </div>
        <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
                <Link href={`/projects/${project.slug}`} className="hover:text-[#e94560] transition-colors">
                    <h3 className="text-xl font-bold">
                        {project.title}
                    </h3>
                </Link>
                <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full capitalize whitespace-nowrap">
                    {project.category}
                </span>
            </div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
                {(Array.isArray(project.tech_stack) ? project.tech_stack : JSON.parse((project.tech_stack as unknown as string) || '[]')).map((tech: string) => (
                    <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-full border border-gray-200"
                    >
                        {tech}
                    </span>
                ))}
            </div>
            <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
                {project.github_url && (
                    <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1 text-sm"
                    >
                        <FaGithub /> Code
                    </a>
                )}
                {project.live_url && (
                    <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-[#e94560] transition-colors flex items-center gap-1 text-sm"
                    >
                        <FaExternalLinkAlt /> Live
                    </a>
                )}
            </div>
        </div>
    </motion.div>
);

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await api.getProjects();
                const processed = data.map(p => ({
                    ...p,
                    tech_stack: typeof p.tech_stack === 'string' ? JSON.parse(p.tech_stack || '[]') : (p.tech_stack || [])
                }));
                setProjects(processed.length > 0 ? processed : staticProjects);
            } catch {
                // Fallback to static data if API fails
                setProjects(staticProjects);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": filteredProjects.slice(0, 10).map((project, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://paulmaximedossou.com/projects/${project.slug}`,
            "name": project.title,
            "description": project.description
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center mb-16"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Mes <span className="gradient-text">Projets</span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            Expertise en <span className="font-semibold text-gray-900">Développement Fullstack</span>, <span className="font-semibold text-gray-900">Automatisation n8n</span> et <span className="font-semibold text-gray-900">Marketing Digital</span>.
                            Découvrez comment je transforme des idées en solutions performantes au Bénin.
                        </p>
                    </motion.div>

                    {/* Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === category.id
                                    ? 'bg-gradient-to-r from-[#1a1a2e] to-[#0f3460] text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <FaSpinner className="animate-spin text-4xl text-gray-400" />
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence>
                                {filteredProjects.map((project, index) => (
                                    <ProjectCard key={project.id} project={project} index={index} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* Empty State */}
                    {!loading && filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <p className="text-gray-500 text-lg">
                                Aucun projet trouvé dans cette catégorie.
                            </p>
                        </motion.div>
                    )}

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-20"
                    >
                        <h3 className="text-2xl font-bold mb-6">Un projet en tête ?</h3>
                        <Link href="/contact" className="btn-primary">
                            Parlons-en
                        </Link>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
