"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    FaArrowLeft,
    FaSave,
    FaTrash,
    FaImage,
    FaTag,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaEye,
    FaCode
} from "react-icons/fa";
import api, { Article } from "@/lib/api";
import ImageUpload from "@/components/admin/ImageUpload";


function ArticleForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const isEditing = !!id;

    const [loading, setLoading] = useState(isEditing ? true : false);
    const [saving, setSaving] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);

    const [formData, setFormData] = useState<Partial<Article>>({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        image: "",
        tags: [],
        read_time: 5,
        published: false
    });

    useEffect(() => {
        if (isEditing) {
            fetchArticle();
        }
    }, [isEditing]);

    const fetchArticle = async () => {
        try {
            // Small trick: api.getArticle expects a slug, but here we might have an ID
            // If our backend getOne works with ID, we use it.
            const token = localStorage.getItem("adminToken");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/articles/id/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                // Convert tags from string to array if needed (Prisma SQLite fix)
                let processedTags = data.tags;
                if (typeof data.tags === 'string') {
                    try { processedTags = JSON.parse(data.tags); } catch { processedTags = data.tags.split(',').map((t: string) => t.trim()); }
                }
                setFormData({
                    ...data,
                    tags: processedTags || []
                });

            }
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = () => {
        if (!formData.title) return;
        const slug = formData.title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
        setFormData(prev => ({ ...prev, slug }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = localStorage.getItem("adminToken");
            const method = isEditing ? "PATCH" : "POST";
            const url = isEditing
                ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/articles/${id}`
                : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/articles`;

            // Sanitize data: remove read-only fields
            const { id: _, published_at, created_at, updated_at, ...cleanData } = formData as any;

            // map to Prisma snake_case
            const body = {
                ...cleanData,
                tags: JSON.stringify(formData.tags || [])
            };



            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });


            if (response.ok) {
                router.push("/admin/articles");
            } else {
                const err = await response.json();
                alert(err.message || "Erreur lors de l'enregistrement");
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert("Une erreur technique est survenue.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
                <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-500">Chargement de l'éditeur...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/10">
                        <FaArrowLeft size={14} />
                    </div>
                    Retour
                </button>
                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        form="article-form"
                        disabled={saving}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/20 active:scale-95 disabled:opacity-50"
                    >
                        {saving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <FaSave />
                        )}
                        Sauvegarder
                    </button>
                </div>
            </div>

            <form id="article-form" onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                {/* Main Editor */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="p-6 md:p-8 rounded-2xl bg-[#111] border border-white/5 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Titre de l'article</label>
                            <input
                                required
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                onBlur={generateSlug}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white text-xl font-bold focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-600"
                                placeholder="Entrez un titre captivant..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Slug (URL)</label>
                            <input
                                required
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-gray-400 text-sm font-mono focus:outline-none focus:border-purple-500/50 transition-all"
                                placeholder="mon-super-article"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Extrait (Excerpt)</label>
                            <textarea
                                required
                                rows={3}
                                value={formData.excerpt}
                                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-white focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                                placeholder="Une courte description pour le scroll..."
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Contenu</label>
                                <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                                    <button
                                        type="button"
                                        onClick={() => setPreviewMode(false)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${!previewMode ? "bg-purple-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
                                    >
                                        <FaCode /> Éditeur
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPreviewMode(true)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${previewMode ? "bg-purple-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
                                    >
                                        <FaEye /> Aperçu
                                    </button>
                                </div>
                            </div>

                            {previewMode ? (
                                <div className="w-full bg-white/5 border border-white/10 rounded-xl py-6 px-8 text-white min-h-[400px] prose-interprete admin-preview overflow-y-auto max-h-[600px]">
                                    {formData.content ? (
                                        <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                                    ) : (
                                        <p className="text-gray-500 italic">Rien à afficher pour le moment...</p>
                                    )}
                                </div>

                            ) : (
                                <textarea
                                    required
                                    rows={15}
                                    value={formData.content}
                                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white font-mono text-sm focus:outline-none focus:border-purple-500/50 transition-all min-h-[400px]"
                                    placeholder="Écrivez en HTML ou Markdown..."
                                />
                            )}
                        </div>

                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Status Card */}
                    <div className="p-6 rounded-2xl bg-[#111] border border-white/5 space-y-4">
                        <h3 className="text-white font-bold flex items-center gap-2">
                            <FaCheckCircle className="text-purple-500" /> Publication
                        </h3>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-gray-400 text-sm">Publier l'article</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.published}
                                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 transition-colors"></div>
                            </label>
                        </div>
                        <div className="pt-2 text-xs text-gray-500 italic">
                            {isEditing ? "Dernière modification : Aujourd'hui" : "L'article sera enregistré en tant que brouillon par défaut."}
                        </div>
                    </div>

                    {/* Media Card */}
                    <div className="p-6 rounded-2xl bg-[#111] border border-white/5 space-y-4">
                        <h3 className="text-white font-bold flex items-center gap-2">
                            <FaImage className="text-blue-500" /> Image de couverture
                        </h3>
                        <ImageUpload
                            currentImage={formData.image}
                            onUploadSuccess={(url) => setFormData(prev => ({ ...prev, image: url }))}
                        />
                        <div className="space-y-1">
                            <label className="text-[10px] text-gray-500 uppercase font-bold">Ou URL directe</label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-xs focus:outline-none focus:border-blue-500 shadow-inner"
                                placeholder="https://..."
                            />
                        </div>
                    </div>


                    {/* Settings Card */}
                    <div className="p-6 rounded-2xl bg-[#111] border border-white/5 space-y-5">
                        <h3 className="text-white font-bold">Paramètres</h3>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                                <FaClock /> Temps de lecture
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="1"
                                    max="60"
                                    value={formData.read_time}
                                    onChange={(e) => setFormData(prev => ({ ...prev, read_time: parseInt(e.target.value) }))}
                                    className="flex-1 accent-purple-500 h-1 bg-white/10 rounded-lg appearance-none"
                                />
                                <span className="text-white font-mono text-sm">{formData.read_time} min</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                                <FaTag /> Tags (séparés par des virgules)
                            </label>
                            <input
                                type="text"
                                value={Array.isArray(formData.tags) ? formData.tags.join(", ") : ""}
                                onChange={(e) => {
                                    const tags = e.target.value.split(",").map(t => t.trim()).filter(t => t !== "");
                                    setFormData(prev => ({ ...prev, tags }));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white text-sm focus:outline-none focus:border-purple-500"
                                placeholder="React, Nextjs, Web..."
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default function ArticleFormPage() {
    return (
        <Suspense fallback={<div className="p-20 text-center text-gray-400">Loading editor...</div>}>
            <ArticleForm />
        </Suspense>
    );
}

