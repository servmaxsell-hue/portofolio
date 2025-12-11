<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('order')->orderBy('created_at', 'desc')->paginate(10);
        return view('admin.projects.index', compact('projects'));
    }

    public function create()
    {
        return view('admin.projects.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'tech_stack' => 'required|string',
            'github_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'category' => 'required|in:web,automation,marketing,fullstack',
            'featured' => 'boolean',
            'order' => 'integer',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['tech_stack'] = array_map('trim', explode(',', $validated['tech_stack']));
        $validated['featured'] = $request->has('featured');

        Project::create($validated);

        return redirect()->route('admin.projects.index')
            ->with('success', 'Projet créé avec succès.');
    }

    public function edit(Project $project)
    {
        return view('admin.projects.edit', compact('project'));
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'tech_stack' => 'required|string',
            'github_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'category' => 'required|in:web,automation,marketing,fullstack',
            'featured' => 'boolean',
            'order' => 'integer',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['tech_stack'] = array_map('trim', explode(',', $validated['tech_stack']));
        $validated['featured'] = $request->has('featured');

        $project->update($validated);

        return redirect()->route('admin.projects.index')
            ->with('success', 'Projet mis à jour avec succès.');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('admin.projects.index')
            ->with('success', 'Projet supprimé avec succès.');
    }
}
