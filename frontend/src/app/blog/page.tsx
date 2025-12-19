"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaClock, FaTag, FaSpinner, FaHeart } from 'react-icons/fa';
import api, { Article } from '@/lib/api';
import { articles as staticArticles } from '@/data';

export default function BlogPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const data = await api.getArticles();
                if (data.length > 0) {
                    setArticles(data.map(a => ({
                        ...a,
                        tags: Array.isArray(a.tags) ? a.tags : JSON.parse((a.tags as unknown as string) || '[]')
                    })));
                } else {
                    setArticles(staticArticles.filter(a => a.published).map(a => ({
                        id: a.id,
                        title: a.title,
                        slug: a.slug,
                        excerpt: a.excerpt,
                        image: a.image,
                        published: a.published,
                        published_at: a.published_at,
                        created_at: a.published_at,
                        read_time: a.read_time,
                        likes: a.likes,
                        tags: a.tags,
                    })));
                }
            } catch {
                setArticles(staticArticles.filter(a => a.published).map(a => ({
                    id: a.id,
                    title: a.title,
                    slug: a.slug,
                    excerpt: a.excerpt,
                    image: a.image,
                    published: a.published,
                    published_at: a.published_at,
                    created_at: a.published_at,
                    read_time: a.read_time,
                    likes: a.likes,
                    tags: a.tags,
                })));
            } finally {
                setLoading(false);
            }
        }
        fetchArticles();
    }, []);

    const sortedArticles = [...articles]
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

    if (loading) {
        return (
            <div className="pt-32 pb-20 flex justify-center">
                <FaSpinner className="animate-spin text-4xl text-gray-400" />
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Mon <span className="gradient-text">Blog</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        Articles, tutoriels et réflexions sur le développement web et le marketing digital
                    </p>
                </motion.div>

                {/* Featured Article */}
                {sortedArticles.length > 0 && (
                    <motion.article
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-16"
                    >
                        <Link href={`/blog/${sortedArticles[0].slug}`}>
                            <div className="card overflow-hidden group cursor-pointer">
                                <div className="grid md:grid-cols-2 gap-0">
                                    <div className="aspect-video md:aspect-auto bg-gray-100 relative overflow-hidden">
                                        {sortedArticles[0].image ? (
                                            <img
                                                src={sortedArticles[0].image}
                                                alt={sortedArticles[0].title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
                                        )}
                                        <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white text-xs font-medium rounded-full z-10">
                                            Article Récent
                                        </span>
                                    </div>
                                    <div className="p-8 flex flex-col justify-center">
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                            <span className="flex items-center gap-1">
                                                <FaClock size={12} />
                                                {sortedArticles[0].read_time} min
                                            </span>
                                            {sortedArticles[0].likes > 0 && (
                                                <>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1 text-red-500 font-medium">
                                                        <FaHeart size={10} />
                                                        {sortedArticles[0].likes}
                                                    </span>
                                                </>
                                            )}
                                            <span>•</span>
                                            <span>{new Date(sortedArticles[0].published_at).toLocaleDateString('fr-FR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-[#e94560] transition-colors">
                                            {sortedArticles[0].title}
                                        </h2>
                                        <p className="text-gray-600 mb-6">
                                            {sortedArticles[0].excerpt}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {sortedArticles[0].tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full flex items-center gap-1"
                                                >
                                                    <FaTag size={10} />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="inline-flex items-center text-sm font-semibold text-gray-900 group-hover:text-[#e94560] transition-colors">
                                            Lire l&apos;article
                                            <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.article>
                )}

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedArticles.slice(1).map((article, index) => (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card group"
                        >
                            <Link href={`/blog/${article.slug}`}>
                                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                    {article.image ? (
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f3460]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                                        <span className="text-white font-semibold">Lire l&apos;article</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                        <span className="flex items-center gap-1">
                                            <FaClock size={12} />
                                            {article.read_time} min
                                        </span>
                                        {article.likes > 0 && (
                                            <span className="flex items-center gap-1 text-red-500 font-medium">
                                                <FaHeart size={10} />
                                                {article.likes}
                                            </span>
                                        )}
                                        <span>•</span>
                                        <span>{new Date(article.published_at).toLocaleDateString('fr-FR')}</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 group-hover:text-[#e94560] transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {article.tags.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>

                {sortedArticles.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-gray-500 text-lg">
                            Aucun article publié pour le moment.
                        </p>
                    </motion.div>
                )}

                {/* Newsletter CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-20 p-12 rounded-3xl bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] text-white"
                >
                    <h3 className="text-2xl font-bold mb-4">
                        Restez informé
                    </h3>
                    <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                        Recevez mes derniers articles et conseils directement dans votre boîte mail.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Votre email"
                            className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                        />
                        <button type="submit" className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors">
                            S&apos;abonner
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
