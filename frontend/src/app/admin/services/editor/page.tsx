"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    FaSave,
    FaArrowLeft,
    FaPlus,
    FaTimes,
    FaCogs,
    FaCode,
    FaCheckCircle,
    FaParagraph,
    FaListUl,
    FaLightbulb,
    FaTools,
    FaTrash
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

interface ServiceFormData {
    title: string;
    description: string;
    long_description: string;
    icon: string;
    features: string[];
    benefits: string[];
    technologies: string[];
    active: boolean;
    order: number;
}

const initialFormData: ServiceFormData = {
    title: "",
    description: "",
    long_description: "",
    icon: "code",
    features: [],
    benefits: [],
    technologies: [],
    active: true,
    order: 0
};

function ServiceEditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const serviceId = searchParams.get("id");
    const { token } = useAuth();

    const [formData, setFormData] = useState<ServiceFormData>(initialFormData);
    const [loading, setLoading] = useState(!!serviceId);
    const [saving, setSaving] = useState(false);

    // Temp state for list inputs
    const [tempFeature, setTempFeature] = useState("");
    const [tempBenefit, setTempBenefit] = useState("");
    const [tempTech, setTempTech] = useState("");

    useEffect(() => {
        if (serviceId) {
            fetchService();
        }
    }, [serviceId]);

    const fetchService = async () => {
        try {
            const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
            const response = await fetch(`${api_url}/services/id/${serviceId}`);
            if (!response.ok) throw new Error("Service non trouvé");

            const service = await response.json();

            setFormData({
                title: service.title || "",
                description: service.description || "",
                long_description: service.long_description || "",
                icon: service.icon || "code",
                features: typeof service.features === 'string' ? JSON.parse(service.features || '[]') : (service.features || []),
                benefits: typeof service.benefits === 'string' ? JSON.parse(service.benefits || '[]') : (service.benefits || []),
                technologies: typeof service.technologies === 'string' ? JSON.parse(service.technologies || '[]') : (service.technologies || []),
                active: !!service.active,
                order: service.order || 0
            });
        } catch (error) {
            console.error("Erreur lors de la récupération du service:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
            const url = serviceId
                ? `${api_url}/services/${serviceId}`
                : `${api_url}/services`;

            const method = serviceId ? "PATCH" : "POST";

            // Generate slug from title
            const slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

            const payload = {
                ...formData,
                slug,
                features: JSON.stringify(formData.features),
                benefits: JSON.stringify(formData.benefits),
                technologies: JSON.stringify(formData.technologies)
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
                router.push("/admin/services");
            } else {
                const errData = await response.json();
                alert("Erreur lors de la sauvegarde: " + (errData.message || response.statusText));
            }
        } catch (error) {
            console.error("Erreurlors de la sauvegarde:", error);
            alert("Erreur technique lors de la sauvegarde.");
        } finally {
            setSaving(false);
        }
    };

    const addItem = (field: 'features' | 'benefits' | 'technologies', value: string, setter: (v: string) => void) => {
        if (value.trim() && !formData[field].includes(value.trim())) {
            setFormData({
                ...formData,
                [field]: [...formData[field], value.trim()]
            });
            setter("");
        }
    };

    const removeItem = (field: 'features' | 'benefits' | 'technologies', value: string) => {
        setFormData({
            ...formData,
            [field]: formData[field].filter(t => t !== value)
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
                    <Link href="/admin/services">
                        <button className="p-2 text-gray-400 hover:text-white bg-[#111] border border-white/5 rounded-xl transition-all">
                            <FaArrowLeft />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            {serviceId ? "Modifier le service" : "Nouveau service"}
                        </h1>
                        <p className="text-gray-400 mt-1">
                            Gérez les détails de votre offre de prestation.
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg active:scale-95"
                >
                    {saving ? "Sauvegarde..." : "Enregistrer"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="p-8 rounded-2xl bg-[#111] border border-white/5 space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <FaCogs className="text-blue-500" /> Nom du service
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors text-lg"
                                placeholder="Développement Web, SEO, etc..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-400">Description courte</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors min-h-[100px] resize-none"
                                placeholder="Résumé du service pour la liste..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <FaParagraph className="text-gray-500" /> Description détaillée
                            </label>
                            <textarea
                                value={formData.long_description}
                                onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors min-h-[200px] resize-none"
                                placeholder="Détails complets du service..."
                            />
                        </div>
                    </div>

                    {/* Lists */}
                    <div className="p-8 rounded-2xl bg-[#111] border border-white/5 space-y-8">
                        {/* Features */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <FaListUl className="text-blue-400" /> Caractéristiques (Features)
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={tempFeature}
                                    onChange={(e) => setTempFeature(e.target.value)}
                                    className="flex-1 bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-white"
                                    placeholder="Ajouter une caractéristique..."
                                />
                                <button
                                    onClick={(e) => { e.preventDefault(); addItem('features', tempFeature, setTempFeature); }}
                                    className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                            <div className="space-y-2">
                                {formData.features.map(item => (
                                    <div key={item} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 group">
                                        <span className="text-gray-300 text-sm">{item}</span>
                                        <button onClick={() => removeItem('features', item)} className="text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <FaLightbulb className="text-amber-400" /> Bénéfices clients
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={tempBenefit}
                                    onChange={(e) => setTempBenefit(e.target.value)}
                                    className="flex-1 bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-white"
                                    placeholder="Ajouter un bénéfice..."
                                />
                                <button
                                    onClick={(e) => { e.preventDefault(); addItem('benefits', tempBenefit, setTempBenefit); }}
                                    className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                            <div className="space-y-2">
                                {formData.benefits.map(item => (
                                    <div key={item} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 group">
                                        <span className="text-gray-300 text-sm">{item}</span>
                                        <button onClick={() => removeItem('benefits', item)} className="text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technologies */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <FaTools className="text-cyan-400" /> Technologies utilisées
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={tempTech}
                                    onChange={(e) => setTempTech(e.target.value)}
                                    className="flex-1 bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-white"
                                    placeholder="Ajouter une techno..."
                                />
                                <button
                                    onClick={(e) => { e.preventDefault(); addItem('technologies', tempTech, setTempTech); }}
                                    className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.technologies.map(item => (
                                    <span key={item} className="flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded-lg border border-cyan-500/20 text-sm">
                                        {item}
                                        <button onClick={() => removeItem('technologies', item)} className="hover:text-red-400">
                                            <FaTimes size={10} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-8 rounded-2xl bg-[#111] border border-white/5 space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <FaCode className="text-blue-500" /> Icône (nom react-icons)
                            </label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none"
                                placeholder="code, layout, rocket..."
                            />
                        </div>

                        <div className="pt-4 border-t border-white/5 space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-300">Service actif</label>
                                <button
                                    onClick={() => setFormData({ ...formData, active: !formData.active })}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${formData.active ? 'bg-emerald-500' : 'bg-gray-800'}`}
                                >
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.active ? 'translate-x-6' : ''}`} />
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Ordre d&apos;affichage</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ServiceEditorPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ServiceEditorContent />
        </Suspense>
    );
}
