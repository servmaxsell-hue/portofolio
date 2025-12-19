import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaClock, FaTag } from 'react-icons/fa';
import api, { Article } from '@/lib/api';
import ShareButtons from '@/components/blog/ShareButtons';
import CommentSection from '@/components/blog/CommentSection';
import LikeButton from '@/components/blog/LikeButton';
import { articles as staticArticles } from '@/data';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    try {
        const articles = await api.getArticles();
        return articles.map((article) => ({
            slug: article.slug,
        }));
    } catch {
        // Fallback to static data
        return staticArticles
            .filter(a => a.published)
            .map((article) => ({
                slug: article.slug,
            }));
    }
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    let article: Article | undefined;

    try {
        article = await api.getArticle(slug);
    } catch {
        // Fallback to static data
        article = staticArticles.find((a) => a.slug === slug && a.published);

        if (article) {
            // Map static article to API shape if needed or use as is if types match
            // The types are slightly different in api.ts vs data/index.ts (content vs no content in list)
            // But for static data we have content in the object usually.
        }
    }

    if (!article) {
        notFound();
    }

    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8"
                    >
                        <FaArrowLeft className="mr-2" />
                        Retour au blog
                    </Link>

                    {/* Article Header */}
                    <article>
                        <header className="mb-12">
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                <span className="flex items-center gap-1">
                                    <FaClock size={14} />
                                    {article?.read_time || 0} min de lecture
                                </span>
                                <span>•</span>
                                <span>
                                    {new Date(article?.published_at || article?.created_at || new Date()).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                {article?.title}
                            </h1>

                            <p className="text-xl text-gray-600 mb-6">
                                {article?.excerpt}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {(Array.isArray(article?.tags) ? article.tags : JSON.parse((article?.tags as string || '[]'))).map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-1.5 text-sm font-medium bg-gray-100 text-gray-700 rounded-full flex items-center gap-2"
                                    >
                                        <FaTag size={12} />
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Featured Image */}
                            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden relative">
                                {article?.image && !article.image.includes('default') && (
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                        </header>

                        {/* Article Content */}
                        <div className="prose-interprete max-w-none">
                            {article?.content ? (
                                <div dangerouslySetInnerHTML={{ __html: article.content }} />
                            ) : (
                                <p>Contenu non disponible.</p>
                            )}
                        </div>



                        {/* Likes Section */}
                        <div className="mt-16 flex flex-col items-center justify-center py-12 border-t border-b border-gray-100 bg-gray-50/50 rounded-3xl">
                            <h3 className="text-xl font-bold mb-8 text-gray-900">Vous avez aimé cet article ?</h3>
                            <LikeButton articleId={article.id} initialLikes={article.likes || 0} />
                        </div>

                        {/* Share Section */}
                        <div className="mt-12 pt-8">
                            <h3 className="text-lg font-semibold mb-4">Partager cet article</h3>
                            <ShareButtons title={article.title} url={`/blog/${article.slug}`} />
                        </div>

                        {/* Comments Section */}
                        <CommentSection articleId={article.id} />
                    </article>
                </div>
            </div>
        </div>
    );
}
