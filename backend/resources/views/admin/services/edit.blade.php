<x-admin-layout>
    <x-slot name="title">Modifier: {{ $service->title }}</x-slot>

    <div class="max-w-3xl">
        <form action="{{ route('admin.services.update', $service) }}" method="POST"
            class="bg-white rounded-xl shadow-sm p-8">
            @csrf
            @method('PUT')

            <div class="space-y-6">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Titre *</label>
                        <input type="text" name="title" value="{{ old('title', $service->title) }}" required
                            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                        @error('title') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Icône *</label>
                        <select name="icon" required
                            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="code" {{ $service->icon == 'code' ? 'selected' : '' }}>💻 Code</option>
                            <option value="automation" {{ $service->icon == 'automation' ? 'selected' : '' }}>🤖
                                Automatisation</option>
                            <option value="chart" {{ $service->icon == 'chart' ? 'selected' : '' }}>📊 Marketing</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Description courte *</label>
                    <textarea name="description" rows="2" required
                        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">{{ old('description', $service->description) }}</textarea>
                    @error('description') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Description longue</label>
                    <textarea name="long_description" rows="4"
                        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">{{ old('long_description', $service->long_description) }}</textarea>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Fonctionnalités * (une par
                        ligne)</label>
                    <textarea name="features" rows="5" required
                        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm">{{ old('features', implode("\n", $service->features ?? [])) }}</textarea>
                    @error('features') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Avantages (un par ligne)</label>
                    <textarea name="benefits" rows="5"
                        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm">{{ old('benefits', implode("\n", $service->benefits ?? [])) }}</textarea>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Technologies</label>
                        <input type="text" name="technologies"
                            value="{{ old('technologies', implode(', ', $service->technologies ?? [])) }}"
                            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Ordre</label>
                        <input type="number" name="order" value="{{ old('order', $service->order) }}"
                            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <input type="checkbox" name="active" id="active" value="1" {{ $service->active ? 'checked' : '' }}
                        class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500">
                    <label for="active" class="text-sm font-semibold text-gray-700">✓ Service actif</label>
                </div>
            </div>

            <div class="flex gap-4 mt-8 pt-6 border-t">
                <button type="submit" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Mettre à jour
                </button>
                <a href="{{ route('admin.services.index') }}"
                    class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                    Annuler
                </a>
            </div>
        </form>
    </div>
</x-admin-layout>