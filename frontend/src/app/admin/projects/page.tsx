"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaEye,
    FaSearch,
    FaProjectDiagram,
    FaStar,
    FaExternalLinkAlt,
    FaGithub,
    FaLayerGroup
} from "react-icons/fa";

import api, { Project } from "@/lib/api";

export default function ProjectsListPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await api.getProjects();
            setProjects(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des projets:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;

        try {
            const token = localStorage.getItem("adminToken");
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/projects/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjects(projects.filter(p => String(p.id) !== String(id)));
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            alert("Une erreur est survenue lors de la suppression.");
        }
    };

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Projets</h1>
                    <p className="text-gray-400 mt-1">Gérez votre portfolio et vos réalisations.</p>
                </div>
                <Link href="/admin/projects/editor">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                        <FaPlus /> Nouveau Projet
                    </button>
                </Link>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Rechercher un projet (titre, description, catégorie)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                </div>
            </div>

            {/* Projects Grid/Table */}
            <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-500 font-medium tracking-wide">Chargement de vos projets...</p>
                    </div>
                ) : filteredProjects.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    <th className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">Projet</th>
                                    <th className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider hidden md:table-cell">Catégorie</th>
                                    <th className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider hidden lg:table-cell">Stack</th>
                                    <th className="px-6 py-4 text-right text-gray-400 font-semibold text-sm uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredProjects.map((project, index) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        key={project.id}
                                        className="hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-10 rounded-lg bg-gray-800 flex-shrink-0 overflow-hidden border border-white/10">
                                                    {project.image ? (
                                                        <img src={project.image} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                                                            <FaProjectDiagram />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="max-w-xs md:max-w-md overflow-hidden">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-white font-semibold truncate group-hover:text-blue-400 transition-colors uppercase tracking-tight">{project.title}</h3>
                                                        {project.featured && <FaStar className="text-amber-500 text-xs" title="En vedette" />}
                                                    </div>
                                                    <p className="text-gray-500 text-sm truncate">{project.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 hidden md:table-cell">
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 capitalize">
                                                {project.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 hidden lg:table-cell">
                                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                {(Array.isArray(project.tech_stack) ? project.tech_stack : JSON.parse((project.tech_stack as unknown as string) || '[]')).slice(0, 3).map((tech: string) => (
                                                    <span key={tech} className="text-[10px] bg-white/5 text-gray-400 px-1.5 py-0.5 rounded border border-white/5">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {(Array.isArray(project.tech_stack) ? project.tech_stack : JSON.parse((project.tech_stack as unknown as string) || '[]')).length > 3 && (
                                                    <span className="text-[10px] text-gray-600">...</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="flex gap-1 mr-2">
                                                    {project.live_url && (
                                                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-500 hover:text-white" title="Voir le site">
                                                            <FaExternalLinkAlt size={12} />
                                                        </a>
                                                    )}
                                                    {project.github_url && (
                                                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-500 hover:text-white" title="GitHub">
                                                            <FaGithub size={12} />
                                                        </a>
                                                    )}
                                                </div>
                                                <Link href={`/admin/projects/editor?id=${project.id}`}>
                                                    <button className="p-2 text-blue-400 hover:text-white hover:bg-blue-600/20 bg-blue-500/5 rounded-lg border border-blue-500/10 transition-all">
                                                        <FaEdit size={14} />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="p-2 text-red-400 hover:text-white hover:bg-red-600/20 bg-red-500/5 rounded-lg border border-red-500/10 transition-all"
                                                >
                                                    <FaTrash size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                            <FaProjectDiagram className="text-2xl text-gray-600" />
                        </div>
                        <h3 className="text-white font-semibold text-lg">Aucun projet trouvé</h3>
                        <p className="text-gray-500 mt-2 max-w-xs mx-auto">Commencez par ajouter votre premier projet à votre portfolio.</p>
                        <Link href="/admin/projects/editor">
                            <button className="mt-6 text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 mx-auto justify-center">
                                <FaPlus /> Ajouter un projet
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
