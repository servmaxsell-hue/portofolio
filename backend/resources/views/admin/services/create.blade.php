<x-admin-layout>
    <x-slot name="title">Nouveau service</x-slot>

    <div class="max-w-3xl">
        <form action="{{ route('admin.services.store') }}" method="POST" class="bg-white rounded-xl shadow-sm p-8">
            @csrf
            
            <div class="space-y-6">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Titre *</label>
                        <input type="text" name="title" value="{{ old('title') }}" required
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                        @error('title') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Icône *</label>
                        <select name="icon" required class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="code">💻 Code</option>
                            <option value="automation">🤖 Automatisation</option>
                            <option value="chart">📊 Marketing</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Description courte *</label>
                    <textarea name="description" rows="2" required
                              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">{{ old('description') }}</textarea>
                    @error('description') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Description longue</label>
                    <textarea name="long_description" rows="4"
                              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">{{ old('long_description') }}</textarea>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Fonctionnalités * (une par ligne)</label>
                    <textarea name="features" rows="5" required placeholder="Applications Laravel / PHP&#10;Interfaces React / Next.js&#10;APIs REST & GraphQL"
                              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm">{{ old('features') }}</textarea>
                    @error('features') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Avantages (un par ligne)</label>
                    <textarea name="benefits" rows="5" placeholder="Code propre et maintenable&#10;Performance optimisée&#10;Support post-livraison"
                              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm">{{ old('benefits') }}</textarea>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Technologies (séparées par virgules)</label>
                        <input type="text" name="technologies" value="{{ old('technologies') }}" placeholder="Laravel, Next.js, Docker"
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Ordre d'affichage</label>
                        <input type="number" name="order" value="{{ old('order', 0) }}"
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <input type="checkbox" name="active" id="active" value="1" {{ old('active', true) ? 'checked' : '' }}
                           class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500">
                    <label for="active" class="text-sm font-semibold text-gray-700">✓ Service actif</label>
                </div>
            </div>

            <div class="flex gap-4 mt-8 pt-6 border-t">
                <button type="submit" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Créer le service
                </button>
                <a href="{{ route('admin.services.index') }}" class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                    Annuler
                </a>
            </div>
        </form>
    </div>
</x-admin-layout>
