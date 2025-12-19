"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTrash, FaUser, FaCalendar, FaNewspaper, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import api, { BlogComment } from '@/lib/api';

export default function AdminCommentsPage() {
    const { token, logout } = useAuth();
    const [comments, setComments] = useState<BlogComment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

    useEffect(() => {
        if (token) {
            fetchComments();
        }
    }, [token]);

    const fetchComments = async () => {
        try {
            const data = await api.getAllComments(token!, true);
            setComments(data);
        } catch (error: any) {
            console.error('Error fetching comments:', error);
            if (error.message?.includes('401')) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: number) => {
        try {
            await api.approveComment(token!, id);
            setComments(comments.map(c => c.id === id ? { ...c, approved: true } : c));
        } catch (error) {
            console.error('Error approving comment:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) return;

        try {
            await api.deleteComment(token!, id);
            setComments(comments.filter(c => c.id !== id));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const filteredComments = comments.filter(comment => {
        const matchesSearch =
            comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comment.article?.title.toLowerCase().includes(searchTerm.toLowerCase());

        if (filter === 'pending') return matchesSearch && !comment.approved;
        if (filter === 'approved') return matchesSearch && comment.approved;
        return matchesSearch;
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Modération des Commentaires</h1>
                    <p className="text-gray-500 mt-1">Gérez les réactions sur vos articles de blog</p>
                </div>

                <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex gap-1">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'all' ? 'bg-[#1a1a2e] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        Tous
                    </button>
                    <button
                        onClick={() => setFilter('pending')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'pending' ? 'bg-[#e94560] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        En attente
                        {comments.filter(c => !c.approved).length > 0 && (
                            <span className="ml-2 px-1.5 py-0.5 bg-white text-[#e94560] text-[10px] rounded-full font-bold">
                                {comments.filter(c => !c.approved).length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setFilter('approved')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'approved' ? 'bg-green-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        Approuvés
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <input
                        type="text"
                        placeholder="Rechercher par nom, message ou article..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border-gray-200 focus:ring-[#e94560] focus:border-[#e94560]"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">Auteur</th>
                                <th className="px-6 py-4 font-semibold">Article</th>
                                <th className="px-6 py-4 font-semibold">Commentaire</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={6} className="px-6 py-4 bg-gray-50/30">
                                            <div className="h-10 bg-gray-100 rounded"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : filteredComments.length > 0 ? (
                                filteredComments.map((comment) => (
                                    <motion.tr
                                        layout
                                        key={comment.id}
                                        className="hover:bg-gray-50/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                    <FaUser size={14} />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900">{comment.name}</div>
                                                    <div className="text-xs text-gray-500">{comment.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <FaNewspaper className="text-gray-400" />
                                                <span className="truncate max-w-[150px]">{comment.article?.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600 line-clamp-2 max-w-[250px]">
                                                {comment.content}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <FaCalendar size={12} />
                                                {new Date(comment.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {comment.approved ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Approuvé
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                                    En attente
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <div className="flex justify-end gap-2">
                                                {!comment.approved && (
                                                    <button
                                                        onClick={() => handleApprove(comment.id)}
                                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                        title="Approuver"
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(comment.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Supprimer"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 italic">
                                        Aucun commentaire trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
