<x-admin-layout>
    <x-slot name="title">Nouveau projet</x-slot>

    <div class="max-w-3xl">
        <form action="{{ route('admin.projects.store') }}" method="POST" class="bg-white rounded-xl shadow-sm p-8">
            @csrf
            
            <div class="space-y-6">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Titre *</label>
                    <input type="text" name="title" value="{{ old('title') }}" required
                           class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    @error('title') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                    <textarea name="description" rows="4" required
                              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">{{ old('description') }}</textarea>
                    @error('description') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Technologies * (séparées par des virgules)</label>
                    <input type="text" name="tech_stack" value="{{ old('tech_stack') }}" required
                           placeholder="Laravel, Next.js, PostgreSQL"
                           class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    @error('tech_stack') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Catégorie *</label>
                        <select name="category" required class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="web">Web</option>
                            <option value="fullstack">Fullstack</option>
                            <option value="automation">Automatisation</option>
                            <option value="marketing">Marketing</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Ordre</label>
                        <input type="number" name="order" value="{{ old('order', 0) }}"
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">URL GitHub</label>
                        <input type="url" name="github_url" value="{{ old('github_url') }}"
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">URL Live</label>
                        <input type="url" name="live_url" value="{{ old('live_url') }}"
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                    <input type="text" name="image" value="{{ old('image') }}"
                           class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>

                <div class="flex items-center gap-2">
                    <input type="checkbox" name="featured" id="featured" value="1" {{ old('featured') ? 'checked' : '' }}
                           class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500">
                    <label for="featured" class="text-sm font-semibold text-gray-700">⭐ Projet en vedette</label>
                </div>
            </div>

            <div class="flex gap-4 mt-8 pt-6 border-t">
                <button type="submit" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Créer le projet
                </button>
                <a href="{{ route('admin.projects.index') }}" class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                    Annuler
                </a>
            </div>
        </form>
    </div>
</x-admin-layout>
