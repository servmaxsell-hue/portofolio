"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaChartLine,
    FaMousePointer,
    FaEye,
    FaBullseye,
    FaSortAmountUp,
    FaSync,
    FaLightbulb,
    FaCheckCircle,
    FaExclamationTriangle
} from "react-icons/fa";

interface KeywordData {
    keyword: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
}

interface AnalyticsData {
    pageViews: number;
    activeUsers: number;
}

interface Recommendation {
    id: number;
    page_path: string;
    keyword: string;
    reason: string;
    suggested_action: string;
    status: string;
    created_at: string;
}

export default function SeoPage() {
    const { token } = useAuth();
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [keywords, setKeywords] = useState<KeywordData[]>([]);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);

    const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
    const headers = { Authorization: `Bearer ${token}` };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [resAn, resSc, resRec] = await Promise.all([
                fetch(`${api_url}/seo/analytics`, { headers }),
                fetch(`${api_url}/seo/search-console`, { headers }),
                fetch(`${api_url}/seo/recommendations`, { headers })
            ]);

            const [dataAn, dataSc, dataRec] = await Promise.all([
                resAn.json(),
                resSc.json(),
                resRec.json()
            ]);

            setAnalytics(dataAn);
            setKeywords(dataSc || []);
            setRecommendations(dataRec || []);
        } catch (error) {
            console.error("Error fetching SEO data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchData();
    }, [token]);

    const runAnalysis = async () => {
        setAnalyzing(true);
        try {
            await fetch(`${api_url}/seo/analyze`, { method: 'POST', headers });
            await fetchData(); // Refresh data after analysis
        } catch (error) {
            console.error("Analysis failed:", error);
        } finally {
            setAnalyzing(false);
        }
    };

    const stats = [
        { label: "Vues de Page", value: analytics?.pageViews || 0, icon: FaEye, color: "from-blue-500 to-cyan-500" },
        { label: "Utilisateurs Actifs", value: analytics?.activeUsers || 0, icon: FaBullseye, color: "from-purple-500 to-indigo-500" },
        { label: "Clics (GSC)", value: keywords.reduce((acc, k) => acc + k.clicks, 0).toLocaleString(), icon: FaMousePointer, color: "from-emerald-500 to-teal-500" },
        { label: "Impressions", value: keywords.reduce((acc, k) => acc + k.impressions, 0).toLocaleString(), icon: FaChartLine, color: "from-amber-500 to-orange-500" },
    ];

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Performance SEO</h1>
                    <p className="text-gray-400">Analysez votre visibilité et optimisez votre contenu.</p>
                </div>
                <button
                    onClick={runAnalysis}
                    disabled={analyzing}
                    className={`
                        flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all
                        ${analyzing
                            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20"
                        }
                    `}
                >
                    <FaSync className={analyzing ? "animate-spin" : ""} />
                    {analyzing ? "Analyse en cours..." : "Lancer une Analyse"}
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden group"
                    >
                        <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity`}>
                            <stat.icon className="text-6xl text-white" />
                        </div>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                            <stat.icon className="text-xl text-white" />
                        </div>
                        <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-white mt-1">
                            {loading ? <span className="animate-pulse">...</span> : stat.value}
                        </h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Keywords Table */}
                <div className="p-6 rounded-2xl bg-[#111] border border-white/5 overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <FaSortAmountUp className="text-blue-400" />
                            Mots-clés Performants
                        </h2>
                        <span className="text-xs text-gray-500">Top 10 (Derniers 30j)</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-gray-500 text-xs border-b border-white/5">
                                    <th className="pb-3 font-medium">Mot-clé</th>
                                    <th className="pb-3 font-medium">Clics</th>
                                    <th className="pb-3 font-medium">CTR</th>
                                    <th className="pb-3 font-medium">Pos. Moy.</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.02]">
                                {keywords.length > 0 ? keywords.map((kw, i) => (
                                    <tr key={i} className="group hover:bg-white/[0.01] transition-colors">
                                        <td className="py-3 text-sm font-medium text-white">{kw.keyword}</td>
                                        <td className="py-3 text-sm text-gray-400">{kw.clicks}</td>
                                        <td className="py-3 text-sm text-gray-400">{(kw.ctr * 100).toFixed(1)}%</td>
                                        <td className="py-3 text-sm">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${kw.position <= 10 ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                                                }`}>
                                                {kw.position.toFixed(1)}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="py-10 text-center text-gray-600 italic text-sm">
                                            Aucune donnée de mot-clé disponible.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="p-6 rounded-2xl bg-[#111] border border-white/5 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <FaLightbulb className="text-amber-400" />
                            Optimisations Suggérées
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
                            IA Powered
                        </span>
                    </div>

                    <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                        {recommendations.length > 0 ? recommendations.map((rec, i) => (
                            <motion.div
                                key={rec.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/20 transition-all border-l-4 border-l-purple-500"
                            >
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <h4 className="text-sm font-bold text-white italic">"{rec.keyword}"</h4>
                                    <span className="text-[10px] text-gray-600 whitespace-nowrap">
                                        {new Date(rec.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                                    <FaExclamationTriangle className="inline mr-1 text-amber-500/50" />
                                    {rec.reason}
                                </p>
                                <div className="mt-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex gap-3 items-center">
                                    <FaCheckCircle className="text-emerald-500 flex-shrink-0" size={14} />
                                    <p className="text-[11px] text-emerald-400 font-medium">{rec.suggested_action}</p>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center border-2 border-dashed border-white/5 rounded-2xl">
                                <div className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                                    <FaLightbulb className="text-gray-600 text-xl" />
                                </div>
                                <p className="text-gray-400 text-sm font-medium">Prêt pour l'analyse</p>
                                <p className="text-xs text-gray-600 mt-1">Cliquez sur "Lancer une Analyse" pour générer des conseils.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
