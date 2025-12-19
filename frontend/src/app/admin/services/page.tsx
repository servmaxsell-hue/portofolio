"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch,
    FaCogs,
    FaCheckCircle,
    FaTimesCircle,
    FaEye
} from "react-icons/fa";

import { useAuth } from "@/context/AuthContext";

interface Service {
    id: number;
    title: string;
    slug: string;
    description: string;
    icon: string;
    active: boolean;
    order: number;
}

export default function ServicesListPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { token } = useAuth();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
            const response = await fetch(`${api_url}/services?includeInactive=true`);
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des services:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) return;

        try {
            const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
            await fetch(`${api_url}/services/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setServices(services.filter(s => s.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            alert("Une erreur est survenue lors de la suppression.");
        }
    };

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Services</h1>
                    <p className="text-gray-400 mt-1">Gérez les services que vous proposez.</p>
                </div>
                <Link href="/admin/services/editor">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg active:scale-95">
                        <FaPlus /> Nouveau Service
                    </button>
                </Link>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Rechercher un service..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                </div>
            </div>

            {/* Services Grid/Table */}
            <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-500 font-medium">Chargement de vos services...</p>
                    </div>
                ) : filteredServices.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    <th className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">Statut</th>
                                    <th className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredServices.map((service, index) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        key={service.id}
                                        className="hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                                    <FaCogs size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">{service.title}</h3>
                                                    <p className="text-gray-500 text-sm truncate max-w-xs md:max-w-md">{service.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            {service.active ? (
                                                <span className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                                                    <FaCheckCircle size={14} /> Actif
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                                                    <FaTimesCircle size={14} /> Inactif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/services/editor?id=${service.id}`}>
                                                    <button className="p-2 text-blue-400 hover:text-white hover:bg-blue-600/20 bg-blue-500/5 rounded-lg border border-blue-500/10 transition-all">
                                                        <FaEdit size={14} />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(service.id)}
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
                            <FaCogs className="text-2xl text-gray-600" />
                        </div>
                        <h3 className="text-white font-semibold text-lg">Aucun service trouvé</h3>
                        <p className="text-gray-500 mt-2 max-w-xs mx-auto">Commencez par ajouter votre premier service.</p>
                        <Link href="/admin/services/editor">
                            <button className="mt-6 text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 mx-auto justify-center">
                                <FaPlus /> Ajouter un service
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
