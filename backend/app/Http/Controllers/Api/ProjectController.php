<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        $projects = Project::orderBy('order')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $projects->map(fn($p) => [
                'id' => (string) $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'description' => $p->description,
                'image' => $p->image ?? '/projects/default.jpg',
                'techStack' => $p->tech_stack ?? [],
                'githubUrl' => $p->github_url,
                'liveUrl' => $p->live_url,
                'category' => $p->category,
                'featured' => $p->featured,
            ])
        ]);
    }

    public function featured(): JsonResponse
    {
        $projects = Project::featured()
            ->orderBy('order')
            ->take(3)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $projects->map(fn($p) => [
                'id' => (string) $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'description' => $p->description,
                'image' => $p->image ?? '/projects/default.jpg',
                'techStack' => $p->tech_stack ?? [],
                'githubUrl' => $p->github_url,
                'liveUrl' => $p->live_url,
                'category' => $p->category,
                'featured' => $p->featured,
            ])
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $project = Project::where('slug', $slug)->first();

        if (!$project) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => (string) $project->id,
                'title' => $project->title,
                'slug' => $project->slug,
                'description' => $project->description,
                'image' => $project->image ?? '/projects/default.jpg',
                'techStack' => $project->tech_stack ?? [],
                'githubUrl' => $project->github_url,
                'liveUrl' => $project->live_url,
                'category' => $project->category,
                'featured' => $project->featured,
            ]
        ]);
    }
}
