"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    FaSave,
    FaArrowLeft,
    FaTimes,
    FaPlus,
    FaProjectDiagram,
    FaGithub,
    FaExternalLinkAlt,
    FaTag,
    FaLayerGroup,
    FaStar
} from "react-icons/fa";
import ImageUpload from "@/components/admin/ImageUpload";
import { useAuth } from "@/context/AuthContext";

interface ProjectFormData {
    title: string;
    description: string;
    problem: string;
    solution: string;
    result: string;
    image: string;
    tech_stack: string[];
    github_url: string;
    live_url: string;
    category: 'web' | 'automation' | 'marketing' | 'fullstack';
    featured: boolean;
    order: number;
}

const initialFormData: ProjectFormData = {
    title: "",
    description: "",
    problem: "",
    solution: "",
    result: "",
    image: "",
    tech_stack: [],
    github_url: "",
    live_url: "",
    category: 'web',
    featured: false,
    order: 0
};

function ProjectEditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectId = searchParams.get("id");
    const { token } = useAuth();

    const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
    const [loading, setLoading] = useState(!!projectId);
    const [saving, setSaving] = useState(false);
    const [newTech, setNewTech] = useState("");

    useEffect(() => {
        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    const fetchProject = async () => {
        try {
            const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
            const response = await fetch(`${api_url}/projects/id/${projectId}`);
            if (!response.ok) throw new Error("Projet non trouvé.");

            const project = await response.json();

            if (project) {
                setFormData({
                    title: project.title || "",
                    description: project.description || "",
                    problem: project.problem || "",
                    solution: project.solution || "",
                    result: project.result || "",
                    image: project.image || "",
                    tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack : JSON.parse(project.tech_stack || '[]'),
                    github_url: project.github_url || "",
                    live_url: project.live_url || "",
                    category: project.category || 'web',
                    featured: !!project.featured,
                    order: project.order || 0
                });
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du projet:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
            const url = projectId
                ? `${api_url}/projects/${projectId}`
                : `${api_url}/projects`;

            const method = projectId ? "PATCH" : "POST";

            // Generate slug from title if it's a new project
            const slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

            const payload = {
                ...formData,
                slug,
                tech_stack: JSON.stringify(formData.tech_stack)
            };

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                router.push("/admin/projects");
            } else {
                const errorData = await response.json();
                console.error("Erreur lors de la sauvegarde:", errorData);
                alert("Erreur lors de la sauvegarde: " + (errorData.message || response.statusText));
            }
        } catch (error) {
            console.error("Erreur lors de la sauvegarde:", error);
            alert("Erreur lors de la sauvegarde.");
        } finally {
            setSaving(false);
        }
    };

    const addTech = () => {
        if (newTech.trim() && !formData.tech_stack.includes(newTech.trim())) {
            setFormData({
                ...formData,
                tech_stack: [...formData.tech_stack, newTech.trim()]
            });
            setNewTech("");
        }
    };

    const removeTech = (tech: string) => {
        setFormData({
            ...formData,
            tech_stack: formData.tech_stack.filter(t => t !== tech)
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/projects">
                        <button className="p-2 text-gray-400 hover:text-white bg-[#111] border border-white/5 rounded-xl transition-all">
                            <FaArrowLeft />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            {projectId ? "Modifier le projet" : "Nouveau projet"}
                        </h1>
                        <p className="text-gray-400 mt-1">
                            {projectId ? "Éditez les détails de votre réalisation." : "Ajoutez une nouvelle réalisation à votre portfolio."}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg active:scale-95"
                >
                    {saving ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sauvegarde...
                        </>
                    ) : (
                        <>
                            <FaSave /> Enregistrer
                        </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="p-8 rounded-2xl bg-[#111] border border-white/5 space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <FaProjectDiagram className="text-blue-500" /> Titre du projet
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors text-lg"
                                placeholder="Nom de la réalisation..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-400">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors min-h-[150px] resize-none"
                                placeholder="Décrivez le projet, les défis et les solutions apportées..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-red-400 flex items-center gap-2">
                                🚫 Le Problème (Avant) <span className="text-xs bg-red-500/20 px-2 py-0.5 rounded text-red-300">Important</span>
                            </label>
                            <textarea
                                value={formData.problem}
                                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                                className="w-full bg-black/40 border border-red-500/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-red-500/50 transition-colors min-h-[120px] resize-none"
                                placeholder="Décrivez la douleur, la perte financière, le chaos avant votre intervention..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-blue-400 flex items-center gap-2">
                                ⚡ La Solution (Votre Intervention) <span className="text-xs bg-blue-500/20 px-2 py-0.5 rounded text-blue-300">Important</span>
                            </label>
                            <textarea
                                value={formData.solution}
                                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                                className="w-full bg-black/40 border border-blue-500/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors min-h-[120px] resize-none"
                                placeholder="Votre intervention technique précise, les étapes, les outils utilisés..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-green-400 flex items-center gap-2">
                                📈 Les Résultats (ROI) <span className="text-xs bg-green-500/20 px-2 py-0.5 rounded text-green-300">Important</span>
                            </label>
                            <textarea
                                value={formData.result}
                                onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                                className="w-full bg-black/40 border border-green-500/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-green-500/50 transition-colors min-h-[120px] resize-none"
                                placeholder="Les gains chiffrés (temps, argent, sérénité), le ROI mesurable..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <FaGithub className="text-gray-500" /> URL GitHub
                                </label>
                                <input
                                    type="url"
                                    value={formData.github_url}
                                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                                    placeholder="https://github.com/..."
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <FaExternalLinkAlt className="text-blue-400" /> URL Live
                                </label>
                                <input
                                    type="url"
                                    value={formData.live_url}
                                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                                    placeholder="https://mon-projet.com/..."
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <FaTag className="text-purple-400" /> Stack Technique
                            </label>

                            <div className="flex flex-wrap gap-2 p-3 bg-black/20 border border-white/10 rounded-xl min-h-[50px]">
                                {formData.tech_stack.map((tech) => (
                                    <span key={tech} className="flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-lg border border-blue-500/20 text-sm">
                                        {tech}
                                        <button onClick={() => removeTech(tech)} className="hover:text-red-400">
                                            <FaTimes size={10} />
                                        </button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={newTech}
                                    onChange={(e) => setNewTech(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                                    className="bg-transparent border-none outline-none text-white text-sm flex-1 min-w-[150px]"
                                    placeholder="Ajouter (Entrée)..."
                                />
                                <button
                                    onClick={(e) => { e.preventDefault(); addTech(); }}
                                    className="p-1 px-3 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 hover:text-white"
                                >
                                    + Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="space-y-6">
                    <div className="p-8 rounded-2xl bg-[#111] border border-white/5 space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-400">Image de couverture</label>
                            <ImageUpload
                                onUploadSuccess={(url) => setFormData({ ...formData, image: url })}
                                currentImage={formData.image}
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <FaLayerGroup className="text-cyan-400" /> Catégorie
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none cursor-pointer"
                            >
                                <option value="web" className="bg-[#111]">Web</option>
                                <option value="automation" className="bg-[#111]">Automation</option>
                                <option value="marketing" className="bg-[#111]">Marketing</option>
                                <option value="fullstack" className="bg-[#111]">Fullstack</option>
                            </select>
                        </div>

                        <div className="pt-4 border-t border-white/5 space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <FaStar className="text-amber-500" /> Projet en vedette
                                </label>
                                <button
                                    onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${formData.featured ? 'bg-amber-500' : 'bg-gray-800'}`}
                                >
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.featured ? 'translate-x-6' : ''}`} />
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Ordre d&apos;affichage</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                        <h4 className="text-blue-400 font-semibold text-sm mb-2 flex items-center gap-2">
                            <FaProjectDiagram size={12} /> Info
                        </h4>
                        <p className="text-gray-500 text-xs leading-relaxed">
                            Assurez-vous que l&apos;image est de bonne qualité. Les projets en vedette apparaîtront en priorité sur la page d&apos;accueil.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProjectEditorPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ProjectEditorContent />
        </Suspense>
    );
}
