import { NextResponse } from 'next/server';
import { articles } from '@/data';

export async function GET() {
    const publishedArticles = articles.filter(a => a.published);
    return NextResponse.json(publishedArticles);
}
