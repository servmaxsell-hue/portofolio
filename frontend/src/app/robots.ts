import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: '/admin/',
                crawlDelay: 0,
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: '/admin/',
                crawlDelay: 0,
            },
            {
                userAgent: '*',
                allow: '/',
                disallow: '/admin/',
            },
        ],
        sitemap: 'https://paulmaximedossou.com/sitemap.xml',
        host: 'https://paulmaximedossou.com',
    };
}
