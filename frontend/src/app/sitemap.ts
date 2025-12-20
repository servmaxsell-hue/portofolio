import { MetadataRoute } from 'next';
import api from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://maximedossou.com';

    // Static routes
    const routes = [
        '',
        '/about',
        '/projects',
        '/blog',
        '/services',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    try {
        // Dynamic routes from API
        const [projects, articles] = await Promise.all([
            api.getProjects(),
            api.getArticles(),
        ]);

        const projectRoutes = projects.map((project) => ({
            url: `${baseUrl}/projects/${project.slug}`,
            lastModified: new Date(project.updated_at),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));

        const blogRoutes = articles.map((article) => ({
            url: `${baseUrl}/blog/${article.slug}`,
            lastModified: new Date(article.published_at || article.updated_at),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));

        return [...routes, ...projectRoutes, ...blogRoutes];
    } catch (error) {
        console.error('Sitemap generation error:', error);
        return routes;
    }
}
