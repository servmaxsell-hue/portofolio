<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::orderBy('order')->paginate(10);
        return view('admin.services.index', compact('services'));
    }

    public function create()
    {
        return view('admin.services.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'long_description' => 'nullable|string',
            'icon' => 'required|string',
            'features' => 'required|string',
            'benefits' => 'nullable|string',
            'technologies' => 'nullable|string',
            'order' => 'integer',
            'active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['features'] = array_map('trim', explode("\n", $validated['features']));
        $validated['benefits'] = $validated['benefits'] ? array_map('trim', explode("\n", $validated['benefits'])) : [];
        $validated['technologies'] = $validated['technologies'] ? array_map('trim', explode(',', $validated['technologies'])) : [];
        $validated['active'] = $request->has('active');

        Service::create($validated);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service créé avec succès.');
    }

    public function edit(Service $service)
    {
        return view('admin.services.edit', compact('service'));
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'long_description' => 'nullable|string',
            'icon' => 'required|string',
            'features' => 'required|string',
            'benefits' => 'nullable|string',
            'technologies' => 'nullable|string',
            'order' => 'integer',
            'active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['features'] = array_map('trim', explode("\n", $validated['features']));
        $validated['benefits'] = $validated['benefits'] ? array_map('trim', explode("\n", $validated['benefits'])) : [];
        $validated['technologies'] = $validated['technologies'] ? array_map('trim', explode(',', $validated['technologies'])) : [];
        $validated['active'] = $request->has('active');

        $service->update($validated);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service mis à jour avec succès.');
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->route('admin.services.index')
            ->with('success', 'Service supprimé avec succès.');
    }
}
