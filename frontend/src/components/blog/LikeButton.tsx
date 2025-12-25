"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import api from '@/lib/api';

interface LikeButtonProps {
    articleId: number;
    initialLikes: number;
}

export default function LikeButton({ articleId, initialLikes }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Check local storage to see if article was already liked
        const likedArticles = JSON.parse(localStorage.getItem('liked_articles') || '[]');
        const wasLiked = likedArticles.includes(articleId);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsLiked(wasLiked);

        // Only update likes count if user hasn't liked yet
        // This prevents the counter from resetting after a like
        if (!wasLiked) {
            setLikes(initialLikes);
        }
    }, [articleId, initialLikes]);

    const handleLike = async () => {
        if (isLiked) return;

        try {
            setIsAnimating(true);
            const updatedArticle = await api.likeArticle(articleId);

            console.log('Like response:', updatedArticle);
            console.log('New likes count:', updatedArticle.likes);

            setLikes(updatedArticle.likes);
            setIsLiked(true);

            // Save to local storage
            const likedArticles = JSON.parse(localStorage.getItem('liked_articles') || '[]');
            likedArticles.push(articleId);
            localStorage.setItem('liked_articles', JSON.stringify(likedArticles));

            setTimeout(() => setIsAnimating(false), 1000);
        } catch (error) {
            console.error('Error liking article:', error);
            setIsAnimating(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <motion.button
                whileHover={!isLiked ? { scale: 1.1 } : {}}
                whileTap={!isLiked ? { scale: 0.9 } : {}}
                onClick={handleLike}
                disabled={isLiked}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${isLiked
                    ? 'bg-red-50 text-red-500 border-2 border-red-500/20 shadow-red-500/10'
                    : 'bg-white text-gray-400 border border-gray-100 hover:border-red-500/30 hover:text-red-400 group'
                    }`}
            >
                <AnimatePresence mode="wait">
                    {isLiked ? (
                        <motion.div
                            key="liked"
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="relative z-10"
                        >
                            <FaHeart size={28} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="unliked"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            className="relative z-10"
                        >
                            <FaRegHeart size={28} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Particle effects on click */}
                {isAnimating && (
                    <ParticleEffects />
                )}
            </motion.button>
            <span className={`font-bold text-lg ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                {likes}
            </span>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                {isLiked ? 'Article aimé' : 'J\'aime'}
            </p>
        </div>
    );
}

function ParticleEffects() {
    // Generate static random values for this render cycle
    // Using simple values to avoid purity issues, or a separate component could use state
    // For visual effects, hardcoding a few variations or using stable indices is fine
    const particles = [
        { x: 20, y: -20 }, { x: -20, y: -20 }, { x: 20, y: 20 },
        { x: -20, y: 20 }, { x: 0, y: -30 }, { x: 0, y: 30 }
    ];

    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                    animate={{
                        opacity: 0,
                        scale: 1,
                        x: p.x,
                        y: p.y
                    }}
                    transition={{ duration: 0.6 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500"
                >
                    <FaHeart size={10} />
                </motion.div>
            ))}
        </div>
    );
}
