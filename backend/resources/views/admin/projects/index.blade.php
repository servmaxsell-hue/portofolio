<x-admin-layout>
    <x-slot name="title">Projets</x-slot>
    <x-slot name="actions">
        <a href="{{ route('admin.projects.create') }}"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            + Nouveau projet
        </a>
    </x-slot>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <table class="w-full">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Titre</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Catégorie</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Technologies</th>
                    <th class="px-6 py-4 text-center text-sm font-semibold text-gray-600">En vedette</th>
                    <th class="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y">
                @forelse($projects as $project)
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4">
                            <p class="font-semibold text-gray-800">{{ $project->title }}</p>
                            <p class="text-sm text-gray-500">{{ Str::limit($project->description, 50) }}</p>
                        </td>
                        <td class="px-6 py-4">
                            <span class="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                                {{ $project->category }}
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex flex-wrap gap-1">
                                @foreach(array_slice($project->tech_stack ?? [], 0, 3) as $tech)
                                    <span class="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">{{ $tech }}</span>
                                @endforeach
                            </div>
                        </td>
                        <td class="px-6 py-4 text-center">
                            @if($project->featured)
                                <span class="text-green-600">⭐</span>
                            @else
                                <span class="text-gray-300">○</span>
                            @endif
                        </td>
                        <td class="px-6 py-4 text-right">
                            <a href="{{ route('admin.projects.edit', $project) }}"
                                class="text-blue-600 hover:underline mr-3">Modifier</a>
                            <form action="{{ route('admin.projects.destroy', $project) }}" method="POST" class="inline"
                                onsubmit="return confirm('Supprimer ce projet ?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-600 hover:underline">Supprimer</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                            Aucun projet. <a href="{{ route('admin.projects.create') }}"
                                class="text-blue-600 hover:underline">Créer le premier</a>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="mt-6">
        {{ $projects->links() }}
    </div>
</x-admin-layout>