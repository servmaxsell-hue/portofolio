// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

interface ApiResponse<T> {
    success?: boolean;
    data?: T;
    message?: string;
}

// Generic fetch wrapper
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options?.headers,
        },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const json = await response.json();
    return json.data || json;
}


// Project types
export interface Project {
    id: number;
    title: string;
    slug: string;
    image: string;
    tech_stack: string[];
    description: string;
    problem?: string;
    solution?: string;
    result?: string;
    github_url?: string;
    live_url?: string;
    category: 'web' | 'automation' | 'marketing' | 'fullstack';
    featured: boolean;
    created_at?: string;
    updated_at?: string;
}

// Article types
export interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content?: string;
    image: string;
    published: boolean;
    published_at: string;
    created_at: string;
    read_time: number;
    likes: number;
    tags: string[];
    updated_at?: string;
}


// Service types
export interface Service {
    id: number;
    title: string;
    slug: string;
    description: string;
    long_description: string;
    icon: string;
    features: string[];
    benefits: string[];
    technologies: string[];
    order: number;
}

// Contact type
export interface ContactForm {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

// Comment type
export interface BlogComment {
    id: number;
    name: string;
    email: string;
    content: string;
    approved: boolean;
    article_id: number;
    created_at: string;
    article?: {
        id: number;
        title: string;
    };
}

// API Functions
export const api = {
    // Projects
    getProjects: () => fetchApi<Project[]>('/projects'),
    getFeaturedProjects: () => fetchApi<Project[]>('/projects/featured'),
    getProject: (slug: string) => fetchApi<Project>(`/projects/${slug}`),

    // Articles
    getArticles: () => fetchApi<Article[]>('/articles'),
    getLatestArticles: () => fetchApi<Article[]>('/articles/latest'),
    getArticle: (slug: string) => fetchApi<Article>(`/articles/${slug}`),
    likeArticle: (id: number) => fetchApi<Article>(`/articles/${id}/like`, { method: 'POST' }),

    // Services
    getServices: () => fetchApi<Service[]>('/services'),
    getService: (slug: string) => fetchApi<Service>(`/services/${slug}`),

    // Contact
    submitContact: (data: ContactForm) =>
        fetchApi<{ id: number }>('/contact', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    // Comments
    getArticleComments: (articleId: number) => fetchApi<BlogComment[]>(`/comments/article/${articleId}`),
    submitComment: (data: { name: string; email: string; content: string; article_id: number }) =>
        fetchApi<BlogComment>('/comments', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
    getAllComments: (token: string, all = false) =>
        fetchApi<BlogComment[]>(`/comments?all=${all}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }),
    approveComment: (token: string, id: number) =>
        fetchApi<BlogComment>(`/comments/${id}/approve`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }),
    deleteComment: (token: string, id: number) =>
        fetchApi<{ success: boolean }>(`/comments/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }),

    // Settings
    getSettings: () => fetchApi<Record<string, string>>('/settings'),
    updateSettings: (token: string, settings: Record<string, string>) =>
        fetchApi<Record<string, string>>('/settings', {
            method: 'POST',
            body: JSON.stringify(settings),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }),

    // User Profile
    getProfile: (token: string) =>
        fetchApi<any>('/users/profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }),
    updateProfile: (token: string, data: { name?: string; email?: string; password?: string }) =>
        fetchApi<any>('/users/profile', {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }),
};

export default api;
