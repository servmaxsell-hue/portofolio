"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaRegPaperPlane, FaCheckCircle, FaExclamationCircle, FaComments } from 'react-icons/fa';
import api, { BlogComment } from '@/lib/api';

interface CommentSectionProps {
    articleId: number;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
    const [comments, setComments] = useState<BlogComment[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        content: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        fetchComments();
    }, [articleId]);

    const fetchComments = async () => {
        try {
            const data = await api.getArticleComments(articleId);
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        try {
            await api.submitComment({
                ...formData,
                article_id: articleId
            });
            setStatus({
                type: 'success',
                message: 'Votre commentaire a été soumis et est en attente de validation.'
            });
            setFormData({ name: '', email: '', content: '' });
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Une erreur est survenue lors de l\'envoi du commentaire.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-16 pt-8 border-t border-gray-100">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <FaComments className="text-[#e94560]" />
                Commentaires {comments.length > 0 && `(${comments.length})`}
            </h3>

            {/* Comment Form */}
            <div className="card p-8 mb-12 bg-gray-50 border-none shadow-sm">
                <h4 className="text-lg font-semibold mb-6">Laisser un commentaire</h4>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full"
                                placeholder="Votre nom"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full"
                                placeholder="votre@email.com"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Votre message *</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full resize-none"
                            placeholder="Partagez vos réflexions sur cet article..."
                        />
                    </div>

                    <AnimatePresence>
                        {status && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}
                            >
                                {status.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                                {status.message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full md:w-auto px-8 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <span className="animate-spin text-sm">⏳</span>
                                Envoi...
                            </>
                        ) : (
                            <>
                                <FaRegPaperPlane className="text-sm" />
                                Publier le commentaire
                            </>
                        )}
                    </button>
                    <p className="text-xs text-gray-500 italic">
                        * Votre adresse email ne sera pas publiée. Les commentaires sont soumis à validation.
                    </p>
                </form>
            </div>

            {/* Comments List */}
            <div className="space-y-8">
                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin w-8 h-8 border-4 border-[#e94560] border-t-transparent rounded-full mx-auto mb-2" />
                        <p className="text-gray-500">Chargement des commentaires...</p>
                    </div>
                ) : comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm"
                        >
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                <FaUser className="text-gray-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h5 className="font-bold text-gray-900">{comment.name}</h5>
                                        <span className="text-xs text-gray-500">
                                            {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                    {comment.content}
                                </p>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 italic">Aucun commentaire pour le moment. Soyez le premier à réagir !</p>
                    </div>
                )}
            </div>
        </div>
    );
}
