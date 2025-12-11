<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'image' => 'nullable|string', // URL or path
            'tags' => 'nullable|array',
            'read_time' => 'nullable|string',
            'published' => 'boolean',
        ]);

        // Auto-generate slug if not present (handled by model boot, but good to be explicit or if we want custom)
        // Auto-calculate read_time if not provided
        if (empty($validated['read_time'])) {
            $wordCount = str_word_count(strip_tags($validated['content']));
            $minutes = ceil($wordCount / 200);
            $validated['read_time'] = $minutes . ' min read';
        }

        $validated['published_at'] = ($validated['published'] ?? true) ? now() : null;
        $validated['published'] = $validated['published'] ?? true;

        $article = Article::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Article created successfully',
            'data' => [
                'id' => (string) $article->id,
                'slug' => $article->slug,
            ]
        ], 201);
    }

    public function index(): JsonResponse
    {
        $articles = Article::published()
            ->orderBy('published_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $articles->map(fn($a) => [
                'id' => (string) $a->id,
                'title' => $a->title,
                'slug' => $a->slug,
                'excerpt' => $a->excerpt,
                'image' => $a->image ?? '/blog/default.jpg',
                'publishedAt' => $a->published_at?->format('Y-m-d'),
                'readTime' => $a->read_time,
                'tags' => $a->tags ?? [],
            ])
        ]);
    }

    public function latest(): JsonResponse
    {
        $articles = Article::published()
            ->orderBy('published_at', 'desc')
            ->take(2)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $articles->map(fn($a) => [
                'id' => (string) $a->id,
                'title' => $a->title,
                'slug' => $a->slug,
                'excerpt' => $a->excerpt,
                'image' => $a->image ?? '/blog/default.jpg',
                'publishedAt' => $a->published_at?->format('Y-m-d'),
                'readTime' => $a->read_time,
                'tags' => $a->tags ?? [],
            ])
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $article = Article::where('slug', $slug)
            ->where('published', true)
            ->first();

        if (!$article) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => (string) $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'excerpt' => $article->excerpt,
                'content' => $article->content,
                'image' => $article->image ?? '/blog/default.jpg',
                'publishedAt' => $article->published_at?->format('Y-m-d'),
                'readTime' => $article->read_time,
                'tags' => $article->tags ?? [],
            ]
        ]);
    }
}
