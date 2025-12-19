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
    FaFilter,
    FaCalendarAlt,
    FaClock,
    FaNewspaper,
    FaHeart
} from "react-icons/fa";

import api, { Article } from "@/lib/api";

export default function ArticlesListPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const data = await api.getArticles();
            setArticles(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des articles:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

        try {
            // Assuming a delete method exists or using fetch directly
            const token = localStorage.getItem("adminToken");
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/articles/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setArticles(articles.filter(a => String(a.id) !== String(id)));
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            alert("Une erreur est survenue lors de la suppression.");
        }
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Articles</h1>
                    <p className="text-gray-400 mt-1">Gérez vos publications et tutoriels sur le blog.</p>
                </div>
                <Link href="/admin/articles/editor">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/20 active:scale-95">
                        <FaPlus /> Nouvel Article
                    </button>
                </Link>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Rechercher un article..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-3 bg-[#111] border border-white/5 rounded-xl text-gray-400 hover:text-white transition-colors">
                    <FaFilter /> Filtrer
                </button>
            </div>

            {/* Articles Grid/Table */}
            <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-500 font-medium tracking-wide">Chargement de vos articles...</p>
                    </div>
                ) : filteredArticles.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    <th className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">Article</th>
                                    <th className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider hidden md:table-cell">Statut</th>
                                    <th className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider hidden lg:table-cell">Date</th>
                                    <th className="px-6 py-4 text-right text-gray-400 font-semibold text-sm uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredArticles.map((article, index) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        key={article.id}
                                        className="hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-gray-800 flex-shrink-0 overflow-hidden border border-white/10">
                                                    {article.image ? (
                                                        <img src={article.image} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                                                            <FaNewspaper />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="max-w-xs md:max-w-md lg:max-w-lg overflow-hidden">
                                                    <h3 className="text-white font-semibold truncate group-hover:text-purple-400 transition-colors uppercase tracking-tight">{article.title}</h3>
                                                    <p className="text-gray-500 text-sm truncate">{article.excerpt}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 hidden md:table-cell">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${article.published
                                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                                }`}>
                                                {article.published ? "Publié" : "Brouillon"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 hidden lg:table-cell">
                                            <div className="flex flex-col">
                                                <span className="text-white text-sm flex items-center gap-2">
                                                    <FaCalendarAlt className="text-gray-600 text-xs" />
                                                    {article.published_at ? new Date(article.published_at).toLocaleDateString() : "-"}
                                                </span>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-gray-500 text-xs flex items-center gap-1.5">
                                                        <FaClock className="text-gray-700 text-[10px]" />
                                                        {article.read_time} min
                                                    </span>
                                                    <span className="text-red-400/80 text-xs flex items-center gap-1.5">
                                                        <FaHeart className="text-[10px]" />
                                                        {article.likes || 0}
                                                    </span>
                                                </div>

                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/blog/${article.slug}`} target="_blank">
                                                    <button className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg border border-white/5 transition-all">
                                                        <FaEye size={14} />
                                                    </button>
                                                </Link>
                                                <Link href={`/admin/articles/editor?id=${article.id}`}>
                                                    <button className="p-2 text-blue-400 hover:text-white hover:bg-blue-600/20 bg-blue-500/5 rounded-lg border border-blue-500/10 transition-all">
                                                        <FaEdit size={14} />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(article.id)}
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
                            <FaNewspaper className="text-2xl text-gray-600" />
                        </div>
                        <h3 className="text-white font-semibold text-lg">Aucun article trouvé</h3>
                        <p className="text-gray-500 mt-2 max-w-xs mx-auto">Commencez par créer votre premier article pour alimenter votre blog.</p>
                        <Link href="/admin/articles/editor">
                            <button className="mt-6 text-purple-400 hover:text-purple-300 font-medium flex items-center gap-2 mx-auto justify-center">
                                <FaPlus /> Créer un article
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
