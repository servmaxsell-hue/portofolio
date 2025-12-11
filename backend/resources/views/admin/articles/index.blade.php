<x-admin-layout>
    <x-slot name="title">Articles</x-slot>
    <x-slot name="actions">
        <a href="{{ route('admin.articles.create') }}"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            + Nouvel article
        </a>
    </x-slot>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <table class="w-full">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Titre</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tags</th>
                    <th class="px-6 py-4 text-center text-sm font-semibold text-gray-600">Statut</th>
                    <th class="px-6 py-4 text-center text-sm font-semibold text-gray-600">Lecture</th>
                    <th class="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y">
                @forelse($articles as $article)
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4">
                            <p class="font-semibold text-gray-800">{{ $article->title }}</p>
                            <p class="text-sm text-gray-500">{{ Str::limit($article->excerpt, 50) }}</p>
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex flex-wrap gap-1">
                                @foreach(array_slice($article->tags ?? [], 0, 2) as $tag)
                                    <span class="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">{{ $tag }}</span>
                                @endforeach
                            </div>
                        </td>
                        <td class="px-6 py-4 text-center">
                            @if($article->published)
                                <span
                                    class="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Publié</span>
                            @else
                                <span
                                    class="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">Brouillon</span>
                            @endif
                        </td>
                        <td class="px-6 py-4 text-center text-gray-500">
                            {{ $article->read_time }} min
                        </td>
                        <td class="px-6 py-4 text-right">
                            <a href="{{ route('admin.articles.edit', $article) }}"
                                class="text-blue-600 hover:underline mr-3">Modifier</a>
                            <form action="{{ route('admin.articles.destroy', $article) }}" method="POST" class="inline"
                                onsubmit="return confirm('Supprimer cet article ?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-600 hover:underline">Supprimer</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                            Aucun article. <a href="{{ route('admin.articles.create') }}"
                                class="text-blue-600 hover:underline">Créer le premier</a>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="mt-6">
        {{ $articles->links() }}
    </div>
</x-admin-layout>