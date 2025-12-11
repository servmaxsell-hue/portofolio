<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::orderBy('created_at', 'desc')->paginate(10);
        return view('admin.articles.index', compact('articles'));
    }

    public function create()
    {
        return view('admin.articles.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'tags' => 'nullable|string',
            'read_time' => 'integer|min:1',
            'published' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['tags'] = $validated['tags'] ? array_map('trim', explode(',', $validated['tags'])) : [];
        $validated['published'] = $request->has('published');

        if ($validated['published']) {
            $validated['published_at'] = now();
        }

        Article::create($validated);

        return redirect()->route('admin.articles.index')
            ->with('success', 'Article créé avec succès.');
    }

    public function edit(Article $article)
    {
        return view('admin.articles.edit', compact('article'));
    }

    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'tags' => 'nullable|string',
            'read_time' => 'integer|min:1',
            'published' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['tags'] = $validated['tags'] ? array_map('trim', explode(',', $validated['tags'])) : [];
        $validated['published'] = $request->has('published');

        if ($validated['published'] && !$article->published_at) {
            $validated['published_at'] = now();
        }

        $article->update($validated);

        return redirect()->route('admin.articles.index')
            ->with('success', 'Article mis à jour avec succès.');
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return redirect()->route('admin.articles.index')
            ->with('success', 'Article supprimé avec succès.');
    }
}
