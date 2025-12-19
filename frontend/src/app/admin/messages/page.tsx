"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaSearch,
    FaTrash,
    FaEnvelopeOpen,
    FaRegEnvelope,
    FaUser,
    FaCalendarAlt,
    FaReply,
    FaCheckCircle,
    FaTimes
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    read: boolean;
    created_at: string;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
            const response = await fetch(`${api_url}/contact`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des messages:", error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: number) => {
        try {
            const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
            const response = await fetch(`${api_url}/contact/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ read: true })
            });

            if (response.ok) {
                setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
                if (selectedMessage?.id === id) {
                    setSelectedMessage({ ...selectedMessage, read: true });
                }
            }
        } catch (error) {
            console.error("Erreur lors du marquage comme lu:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Supprimer ce message définitivement ?")) return;

        try {
            const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
            const response = await fetch(`${api_url}/contact/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                setMessages(messages.filter(m => m.id !== id));
                if (selectedMessage?.id === id) setSelectedMessage(null);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
        }
    };

    const filteredMessages = messages.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const unreadCount = messages.filter(m => !m.read).length;

    return (
        <div className="space-y-8 h-[calc(100vh-120px)] flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        Messages
                        {unreadCount > 0 && (
                            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full animate-pulse">
                                {unreadCount} nouveau{unreadCount > 1 ? 's' : ''}
                            </span>
                        )}
                    </h1>
                    <p className="text-gray-400 mt-1">Gérez les demandes de contact de votre portfolio.</p>
                </div>
            </div>

            <div className="flex gap-6 flex-1 overflow-hidden min-h-0">
                {/* List Side */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    <div className="relative shrink-0">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Rechercher un message..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#111] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto bg-[#111] border border-white/5 rounded-2xl scrollbar-hide">
                        {loading ? (
                            <div className="p-10 flex justify-center">
                                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : filteredMessages.length > 0 ? (
                            <div className="divide-y divide-white/5">
                                {filteredMessages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        onClick={() => {
                                            setSelectedMessage(msg);
                                            if (!msg.read) markAsRead(msg.id);
                                        }}
                                        className={`p-4 cursor-pointer transition-colors hover:bg-white/[0.03] group relative ${selectedMessage?.id === msg.id ? 'bg-white/[0.05]' : ''}`}
                                    >
                                        {!msg.read && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                                        )}
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={`text-sm font-medium truncate pr-4 ${!msg.read ? 'text-white' : 'text-gray-400'}`}>
                                                {msg.name}
                                            </span>
                                            <span className="text-[10px] text-gray-500 shrink-0">
                                                {new Date(msg.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className={`text-sm truncate ${!msg.read ? 'text-blue-400 font-semibold' : 'text-gray-300'}`}>
                                            {msg.subject || "(Sans objet)"}
                                        </h3>
                                        <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                                            {msg.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-10 text-center text-gray-500">
                                Aucun message trouvé.
                            </div>
                        )}
                    </div>
                </div>

                {/* Detail Side */}
                <div className="hidden lg:flex flex-1 bg-[#111] border border-white/5 rounded-2xl overflow-hidden flex-col">
                    <AnimatePresence mode="wait">
                        {selectedMessage ? (
                            <motion.div
                                key={selectedMessage.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col h-full"
                            >
                                {/* Header */}
                                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-blue-400 border border-blue-500/10">
                                            <FaUser size={20} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-white">{selectedMessage.name}</h2>
                                            <p className="text-blue-400 text-sm">{selectedMessage.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleDelete(selectedMessage.id)}
                                            className="p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors border border-transparent hover:border-red-500/20"
                                            title="Supprimer"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                        <span className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-blue-500/50" />
                                            Reçu le {new Date(selectedMessage.created_at).toLocaleString()}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            {selectedMessage.read ? (
                                                <><FaEnvelopeOpen className="text-emerald-500/50" /> Lu</>
                                            ) : (
                                                <><FaRegEnvelope className="text-amber-500/50" /> Non lu</>
                                            )}
                                        </span>
                                    </div>

                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                            <span className="w-1 h-6 bg-blue-500 rounded-full" />
                                            {selectedMessage.subject || "(Sans objet)"}
                                        </h3>
                                        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                            {selectedMessage.message}
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <a
                                            href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg active:scale-95"
                                        >
                                            <FaReply /> Répondre par email
                                        </a>
                                        {!selectedMessage.read && (
                                            <button
                                                onClick={() => markAsRead(selectedMessage.id)}
                                                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-semibold border border-white/10 transition-all"
                                            >
                                                <FaCheckCircle className="text-emerald-400" /> Marquer comme lu
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5 text-gray-600">
                                    <FaRegEnvelope size={40} />
                                </div>
                                <h3 className="text-white font-semibold text-xl">Sélectionnez un message</h3>
                                <p className="text-gray-500 mt-2 max-w-xs">
                                    Choisissez une conversation dans la liste de gauche pour afficher son contenu complet.
                                </p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile Overlay for Detail */}
            <AnimatePresence>
                {selectedMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        className="fixed inset-0 z-50 lg:hidden bg-[#0a0a0a] p-4 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <button onClick={() => setSelectedMessage(null)} className="p-2 text-gray-400">
                                <FaTimes size={24} />
                            </button>
                            <button onClick={() => handleDelete(selectedMessage.id)} className="p-2 text-red-400">
                                <FaTrash size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white">{selectedMessage.name}</h2>
                                <p className="text-blue-400">{selectedMessage.email}</p>
                            </div>

                            <div className="text-gray-500 text-sm italic">
                                Le {new Date(selectedMessage.created_at).toLocaleString()}
                            </div>

                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <h3 className="text-white font-bold mb-3">{selectedMessage.subject}</h3>
                                <p className="text-gray-300 whitespace-pre-wrap text-sm">{selectedMessage.message}</p>
                            </div>

                            <a
                                href={`mailto:${selectedMessage.email}`}
                                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold"
                            >
                                <FaReply /> Répondre
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
