"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { FaSave, FaFilePdf, FaLink, FaCheckCircle, FaExclamationTriangle, FaLock, FaUser } from "react-icons/fa";

export default function SettingsPage() {
    const { token, refreshProfile } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [savingAuth, setSavingAuth] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [authMessage, setAuthMessage] = useState({ type: "", text: "" });

    const [settings, setSettings] = useState({
        cv_url: "",
        github_url: "",
        linkedin_url: "",
        contact_email: "",
    });

    const [authData, setAuthData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;
            try {
                const [settingsData, profileData] = await Promise.all([
                    api.getSettings(),
                    api.getProfile(token)
                ]);

                if (settingsData) {
                    setSettings({
                        cv_url: settingsData.cv_url || "",
                        github_url: settingsData.github_url || "",
                        linkedin_url: settingsData.linkedin_url || "",
                        contact_email: settingsData.contact_email || "",
                    });
                }

                if (profileData) {
                    setAuthData(prev => ({
                        ...prev,
                        name: profileData.name || "",
                        email: profileData.email || "",
                    }));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAuthData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        setSaving(true);
        setMessage({ type: "", text: "" });

        try {
            await api.updateSettings(token, settings);
            setMessage({ type: "success", text: "Paramètres enregistrés !" });
        } catch (error) {
            setMessage({ type: "error", text: "Une erreur est survenue." });
        } finally {
            setSaving(false);
            setTimeout(() => setMessage({ type: "", text: "" }), 3000);
        }
    };

    const handleAuthSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        if (authData.password && authData.password !== authData.confirmPassword) {
            setAuthMessage({ type: "error", text: "Les mots de passe ne correspondent pas." });
            return;
        }

        setSavingAuth(true);
        setAuthMessage({ type: "", text: "" });

        try {
            const updatePayload: any = {
                name: authData.name,
                email: authData.email,
            };
            if (authData.password) {
                updatePayload.password = authData.password;
            }

            await api.updateProfile(token, updatePayload);
            await refreshProfile();
            setAuthMessage({ type: "success", text: "Accès mis à jour avec succès !" });
            setAuthData(prev => ({ ...prev, password: "", confirmPassword: "" }));
        } catch (error) {
            setAuthMessage({ type: "error", text: "Erreur lors de la mise à jour des accès." });
        } finally {
            setSavingAuth(false);
            setTimeout(() => setAuthMessage({ type: "", text: "" }), 3000);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">Paramètres</h1>
                <p className="text-gray-400">Gérez les configurations globales et vos accès de sécurité.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration Globale */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-6"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="p-8 rounded-2xl bg-[#111] border border-white/5 space-y-6">
                            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                                <FaFilePdf className="text-purple-400" /> Gestion du CV
                            </h2>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Lien du CV (URL)</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
                                        <FaLink />
                                    </div>
                                    <input
                                        type="text"
                                        name="cv_url"
                                        value={settings.cv_url}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl bg-[#111] border border-white/5 space-y-6">
                            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                                <FaLink className="text-blue-400" /> Liens & Contact
                            </h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">GitHub</label>
                                    <input type="text" name="github_url" value={settings.github_url} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-purple-500/50 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">LinkedIn</label>
                                    <input type="text" name="linkedin_url" value={settings.linkedin_url} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-purple-500/50 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Email public</label>
                                    <input type="email" name="contact_email" value={settings.contact_email} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-purple-500/50 outline-none" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 py-4 rounded-xl font-bold disabled:opacity-50">
                                {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><FaSave /> Sauvegarder</>}
                            </button>
                        </div>
                        {message.text && (
                            <div className={`p-4 rounded-xl text-sm ${message.type === "success" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                                {message.text}
                            </div>
                        )}
                    </form>
                </motion.div>

                {/* Sécurité et Accès */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    <form onSubmit={handleAuthSubmit} className="space-y-6">
                        <div className="p-8 rounded-2xl bg-[#111] border border-white/5 space-y-6">
                            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                                <FaLock className="text-rose-400" /> Sécurité & Accès
                            </h2>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Nom complet</label>
                                    <div className="relative">
                                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                                        <input type="text" name="name" value={authData.name} onChange={handleAuthChange} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:ring-2 focus:ring-rose-500/50 outline-none" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Email de connexion</label>
                                    <input type="email" name="email" value={authData.email} onChange={handleAuthChange} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-rose-500/50 outline-none" />
                                </div>

                                <div className="pt-4 border-t border-white/5">
                                    <p className="text-xs text-gray-500 mb-4 italic">Laissez vide pour conserver le mot de passe actuel.</p>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-400">Nouveau mot de passe</label>
                                            <input type="password" name="password" value={authData.password} onChange={handleAuthChange} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-rose-500/50 outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-400">Confirmer le mot de passe</label>
                                            <input type="password" name="confirmPassword" value={authData.confirmPassword} onChange={handleAuthChange} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-rose-500/50 outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button type="submit" disabled={savingAuth} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-orange-600 py-4 rounded-xl font-bold disabled:opacity-50 text-white cursor-pointer transition-all hover:scale-[1.02]">
                                {savingAuth ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><FaSave /> Mettre à jour l'accès</>}
                            </button>
                        </div>
                        {authMessage.text && (
                            <div className={`p-4 rounded-xl text-sm ${authMessage.type === "success" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                                {authMessage.type === "success" ? <FaCheckCircle /> : <FaExclamationTriangle />} {authMessage.text}
                            </div>
                        )}
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
