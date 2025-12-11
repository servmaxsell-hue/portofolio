<x-admin-layout>
    <x-slot name="title">Modifier: {{ $article->title }}</x-slot>

    <div class="max-w-4xl">
        <form action="{{ route('admin.articles.update', $article) }}" method="POST" class="bg-white rounded-xl shadow-sm p-8">
            @csrf
            @method('PUT')
            
            <div class="space-y-6">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Titre *</label>
                    <input type="text" name="title" value="{{ old('title', $article->title) }}" required
                           class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    @error('title') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Extrait *</label>
                    <textarea name="excerpt" rows="2" required maxlength="500"
                              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">{{ old('excerpt', $article->excerpt) }}</textarea>
                    @error('excerpt') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Contenu *</label>
                    <textarea name="content" rows="15" required
                              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm">{{ old('content', $article->content) }}</textarea>
                    @error('content') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
                        <input type="text" name="tags" value="{{ old('tags', implode(', ', $article->tags ?? [])) }}"
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Temps de lecture (min)</label>
                        <input type="number" name="read_time" value="{{ old('read_time', $article->read_time) }}" min="1"
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                    <input type="text" name="image" value="{{ old('image', $article->image) }}"
                           class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>

                <div class="flex items-center gap-2">
                    <input type="checkbox" name="published" id="published" value="1" {{ $article->published ? 'checked' : '' }}
                           class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500">
                    <label for="published" class="text-sm font-semibold text-gray-700">✓ Publié</label>
                </div>
            </div>

            <div class="flex gap-4 mt-8 pt-6 border-t">
                <button type="submit" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Mettre à jour
                </button>
                <a href="{{ route('admin.articles.index') }}" class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                    Annuler
                </a>
            </div>
        </form>
    </div>
</x-admin-layout>
