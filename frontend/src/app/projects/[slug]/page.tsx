import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaCode, FaLaptopCode, FaPaperPlane } from 'react-icons/fa';
import api from '@/lib/api';
import { projects as staticProjects } from '@/data';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    let project;

    try {
        project = await api.getProject(slug);
    } catch {
        project = staticProjects.find((p) => p.slug === slug);
    }

    if (!project) {
        return { title: 'Projet non trouvé' };
    }

    return {
        title: `${project.title} | Paul Maxime Dossou`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: [project.image],
        },
    };
}

export async function generateStaticParams() {
    try {
        const projects = await api.getProjects();
        return projects.map((project) => ({
            slug: project.slug,
        }));
    } catch {
        // Fallback or empty if static data doesn't have slugs matching backend
        // Note: staticProjects now have slugs thanks to previous edit
        return staticProjects.map((project) => ({
            slug: project.slug,
        }));
    }
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = await params;
    let project;

    try {
        project = await api.getProject(slug);
    } catch {
        project = staticProjects.find((p) => p.slug === slug);
    }

    if (!project) {
        notFound();
    }

    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-6">
                <nav className="mb-12">
                    <Link
                        href="/projects"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" />
                        Retour aux projets
                    </Link>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Content */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium capitalize">
                                {project.category}
                            </span>
                            {project.featured && (
                                <span className="px-3 py-1 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white rounded-full text-sm font-medium">
                                    En vedette
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            {project.title}
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-8">
                            {project.live_url && (
                                <a
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                >
                                    <FaExternalLinkAlt className="mr-2" />
                                    Voir le site
                                </a>
                            )}
                            {project.github_url && (
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                >
                                    <FaGithub className="mr-2" />
                                    Accéder au code
                                </a>
                            )}
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <FaCode className="text-gray-500" />
                                Stack Technique
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {(Array.isArray(project.tech_stack) ? project.tech_stack : JSON.parse((project.tech_stack as unknown as string) || '[]')).map((tech: string) => (
                                    <span
                                        key={tech}
                                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium shadow-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative">
                        <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-2xl relative group">
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
                                    <FaLaptopCode size={64} />
                                </div>
                            )}
                        </div>
                        {/* Decorative blob */}
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-full opacity-10 blur-3xl -z-10" />
                    </div>
                </div>

                {/* Additional Info Section (Placeholder just to make it rich) */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                    <h2 className="text-2xl font-bold mb-8 text-center">Challenge & Solution</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Le Challenge</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Chaque projet présente ses défis uniques. Pour celui-ci, l&apos;objectif principal était de concevoir
                                une architecture performante capable de supporter une montée en charge rapide tout en maintenant
                                une expérience utilisateur fluide et intuitive.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">La Solution</h3>
                            <p className="text-gray-600 leading-relaxed">
                                J&apos;ai opté pour une approche moderne utilisant les dernières technologies du web.
                                L&apos;accent a été mis sur l&apos;optimisation des performances, l&apos;accessibilité et la maintenabilité
                                du code à long terme.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-20 text-center">
                    <div className="max-w-2xl mx-auto p-12 rounded-[2.5rem] bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                        <h3 className="text-3xl font-bold mb-4">Vous voulez un projet similaire ?</h3>
                        <p className="text-gray-500 mb-10 text-lg">
                            Ce projet vous inspire ? Discutons ensemble de la manière dont je peux réaliser une solution équivalente pour votre entreprise.
                        </p>
                        <Link
                            href={`/contact?project=${encodeURIComponent(project.title)}`}
                            className="btn-primary inline-flex items-center group shadow-2xl shadow-blue-500/20"
                        >
                            Démarrer un projet identique
                            <FaPaperPlane className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
