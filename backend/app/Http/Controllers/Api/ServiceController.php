<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    public function index(): JsonResponse
    {
        $services = Service::active()
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $services->map(fn($s) => [
                'id' => (string) $s->id,
                'title' => $s->title,
                'slug' => $s->slug,
                'description' => $s->description,
                'longDescription' => $s->long_description,
                'icon' => $s->icon,
                'features' => $s->features ?? [],
                'benefits' => $s->benefits ?? [],
                'technologies' => $s->technologies ?? [],
                'order' => $s->order,
            ])
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $service = Service::where('slug', $slug)
            ->where('active', true)
            ->first();

        if (!$service) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => (string) $service->id,
                'title' => $service->title,
                'slug' => $service->slug,
                'description' => $service->description,
                'longDescription' => $service->long_description,
                'icon' => $service->icon,
                'features' => $service->features ?? [],
                'benefits' => $service->benefits ?? [],
                'technologies' => $service->technologies ?? [],
                'order' => $service->order,
            ]
        ]);
    }
}
