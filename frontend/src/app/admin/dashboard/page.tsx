"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

import { motion } from "framer-motion";
import { FaProjectDiagram, FaNewspaper, FaCogs, FaEnvelope, FaComments, FaHeart, FaKey, FaCopy, FaCheck, FaUser, FaCode } from "react-icons/fa";

interface Activity {
    id: string | number;
    type: 'contact' | 'comment' | 'article';
    title: string;
    subtitle: string;
    date: string;
    icon: any;
    color: string;
}

export default function DashboardPage() {
    const { token, logout } = useAuth();
    const [stats, setStats] = useState({ projects: 0, articles: 0, services: 0, contacts: 0, comments: 0, likes: 0 });
    const [loading, setLoading] = useState(true);
    const [apiKey, setApiKey] = useState("");
    const [copied, setCopied] = useState(false);
    const [payloadCopied, setPayloadCopied] = useState(false);
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
                const headers = { Authorization: `Bearer ${token}` };

                const responses = await Promise.all([
                    fetch(`${api_url}/projects`),
                    fetch(`${api_url}/articles`),
                    fetch(`${api_url}/services`),
                    fetch(`${api_url}/contact`, { headers }),
                    fetch(`${api_url}/comments?all=true`, { headers }),
                ]);

                // Check for 401 in protected routes
                if (responses[3].status === 401 || responses[4].status === 401) {
                    logout();
                    return;
                }

                const [projects, articles, services, contacts, comments] = await Promise.all(
                    responses.map(r => r.json())
                );

                const totalLikes = Array.isArray(articles)
                    ? articles.reduce((acc: number, curr: any) => acc + (curr.likes || 0), 0)
                    : 0;

                setStats({
                    projects: Array.isArray(projects) ? projects.length : 0,
                    articles: Array.isArray(articles) ? articles.length : 0,
                    services: Array.isArray(services) ? services.length : 0,
                    contacts: Array.isArray(contacts) ? contacts.length : 0,
                    comments: Array.isArray(comments) ? comments.length : 0,
                    likes: totalLikes,
                });

                // Create Activities Feed
                const recentActivities: Activity[] = [];

                if (Array.isArray(contacts)) {
                    contacts.slice(0, 5).forEach(c => {
                        recentActivities.push({
                            id: `contact-${c.id}`,
                            type: 'contact',
                            title: `Nouveau message de ${c.name}`,
                            subtitle: c.subject || 'Sans sujet',
                            date: c.created_at,
                            icon: FaEnvelope,
                            color: 'text-emerald-500 bg-emerald-500/10'
                        });
                    });
                }

                if (Array.isArray(comments)) {
                    comments.slice(0, 5).forEach(c => {
                        recentActivities.push({
                            id: `comment-${c.id}`,
                            type: 'comment',
                            title: `Nouveau commentaire de ${c.name}`,
                            subtitle: `Sur: ${c.article?.title || 'Article inconnu'}`,
                            date: c.created_at,
                            icon: FaComments,
                            color: 'text-amber-500 bg-amber-500/10'
                        });
                    });
                }

                if (Array.isArray(articles)) {
                    articles.slice(0, 3).forEach(a => {
                        recentActivities.push({
                            id: `article-${a.id}`,
                            type: 'article',
                            title: `Article publié: ${a.title}`,
                            subtitle: `${a.read_time} min de lecture`,
                            date: a.published_at || a.created_at,
                            icon: FaNewspaper,
                            color: 'text-blue-500 bg-blue-500/10'
                        });
                    });
                }

                // Sort by date desc
                setActivities(recentActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10));

                // Fetch API Key (simulated or from env if exposed via a secure endpoint - 
                // for now we use the one we just created since we are the agent, 
                // but in a real app this would be a secure GET /admin/settings/api-key)
                setApiKey("max_portfolio_73c4954b4cd9872f24a610d7");
            } catch (error) {
                console.error("Erreur lors du chargement des stats:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchStats();
        else {
            // Fallback for initial load if token is in localStorage
            const storedToken = localStorage.getItem("adminToken");
            if (storedToken) fetchStats();
        }
    }, [token]);

    const cards = [
        { label: "Projets Totaux", value: stats.projects.toString(), icon: FaProjectDiagram, color: "from-purple-500 to-indigo-500" },
        { label: "Articles Publiés", value: stats.articles.toString(), icon: FaNewspaper, color: "from-pink-500 to-rose-500" },
        { label: "Likes Réçus", value: stats.likes.toString(), icon: FaHeart, color: "from-red-500 to-pink-500" },
        { label: "Commentaires", value: stats.comments.toString(), icon: FaComments, color: "from-amber-500 to-orange-500" },
        { label: "Messages Reçus", value: stats.contacts.toString(), icon: FaEnvelope, color: "from-emerald-500 to-teal-500" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400">Bienvenue sur votre espace d'administration.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors"
                    >
                        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
                            <card.icon className="text-6xl text-white" />
                        </div>

                        <div className="relative z-10">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg`}>
                                <card.icon className="text-xl text-white" />
                            </div>
                            <p className="text-gray-400 text-sm font-medium">{card.label}</p>
                            <h3 className="text-3xl font-bold text-white mt-1">{loading ? "..." : card.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-6 rounded-2xl bg-[#111] border border-white/5">
                    <h2 className="text-xl font-bold text-white mb-6">Activité Récente</h2>
                    <div className="space-y-4">
                        {activities.length > 0 ? (
                            activities.map((activity, index) => (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group"
                                >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                                        <activity.icon size={16} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-white truncate group-hover:text-purple-400 transition-colors">
                                            {activity.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 truncate">{activity.subtitle}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-[10px] text-gray-600 font-medium">
                                            {new Date(activity.date).toLocaleDateString('fr-FR', {
                                                day: '2-digit',
                                                month: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="p-12 text-center text-gray-600 italic text-sm border-2 border-dashed border-white/5 rounded-2xl">
                                Aucune activité récente à afficher.
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#111] border border-white/5">
                    <h2 className="text-xl font-bold text-white mb-6">Actions Rapides</h2>
                    <div className="space-y-3">
                        <Link href="/admin/projects/editor">
                            <button className="w-full py-3 px-4 rounded-xl bg-purple-600/10 text-purple-400 border border-purple-600/20 hover:bg-purple-600/20 transition-all font-medium text-sm flex items-center justify-center gap-2 mb-3">
                                <FaProjectDiagram /> Ajouter un projet
                            </button>
                        </Link>
                        <Link href="/admin/articles/editor">
                            <button className="w-full py-3 px-4 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-600/20 hover:bg-blue-600/20 transition-all font-medium text-sm flex items-center justify-center gap-2 mb-3">
                                <FaNewspaper /> Écrire un article
                            </button>
                        </Link>
                        <Link href="/admin/comments">
                            <button className="w-full py-3 px-4 rounded-xl bg-amber-600/10 text-amber-400 border border-amber-600/20 hover:bg-amber-600/20 transition-all font-medium text-sm flex items-center justify-center gap-2">
                                <FaComments /> Modérer les commentaires
                            </button>
                        </Link>
                    </div>

                    {/* API Key Section */}
                    <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <FaKey className="text-6xl text-white" />
                        </div>
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <FaKey className="text-blue-400 text-sm" />
                            Clé API n8n
                        </h2>
                        <div className="relative group">
                            <div className="w-full bg-black/50 border border-white/10 rounded-xl p-3 font-mono text-[10px] text-blue-400 break-all pr-10">
                                {apiKey || "Chargement..."}
                            </div>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(apiKey);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all border border-white/5"
                            >
                                {copied ? <FaCheck className="text-green-500 text-xs" /> : <FaCopy size={12} />}
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-4 leading-relaxed">
                            Header : <code className="text-blue-500/80">x-api-key</code>
                        </p>
                        <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
                            <div>
                                <p className="text-[10px] text-gray-400 mb-1">URL Endpoint :</p>
                                <code className="text-[10px] text-blue-400/80 break-all bg-black/30 p-2 rounded block">
                                    {(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1')}/articles
                                </code>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-[10px] text-gray-400">Structure JSON (Body) :</p>
                                    <button
                                        onClick={() => {
                                            const payload = {
                                                title: "Titre de l'article",
                                                slug: "titre-de-l-article",
                                                excerpt: "Résumé court...",
                                                content: "<p>Contenu HTML complet...</p>",
                                                image: "https://lien-vers-image.jpg",
                                                tags: "[\"Tag1\", \"Tag2\"]",
                                                read_time: 5,
                                                published: true
                                            };
                                            navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
                                            setPayloadCopied(true);
                                            setTimeout(() => setPayloadCopied(false), 2000);
                                        }}
                                        className="text-[10px] text-gray-500 hover:text-white flex items-center gap-1 transition-colors"
                                    >
                                        {payloadCopied ? <><FaCheck className="text-green-500" /> Copié</> : <><FaCopy size={10} /> Copier</>}
                                    </button>
                                </div>
                                <pre className="text-[9px] text-gray-500 bg-black/50 p-3 rounded-xl overflow-x-auto border border-white/5 font-mono leading-relaxed">
                                    {`{
  "title": "Titre",
  "slug": "titre-slug",
  "excerpt": "Résumé",
  "content": "...",
  "image": "...",
  "tags": "[]",
  "read_time": 5,
  "published": true
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
