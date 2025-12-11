<x-admin-layout>
    <x-slot name="title">Services</x-slot>
    <x-slot name="actions">
        <a href="{{ route('admin.services.create') }}"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            + Nouveau service
        </a>
    </x-slot>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <table class="w-full">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Ordre</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Service</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Technologies</th>
                    <th class="px-6 py-4 text-center text-sm font-semibold text-gray-600">Statut</th>
                    <th class="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y">
                @forelse($services as $service)
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 text-center">
                            <span class="text-gray-500 font-mono">{{ $service->order }}</span>
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                <span class="text-2xl">
                                    @if($service->icon == 'code') 💻
                                    @elseif($service->icon == 'automation') 🤖
                                    @elseif($service->icon == 'chart') 📊
                                    @else 🛠️
                                    @endif
                                </span>
                                <div>
                                    <p class="font-semibold text-gray-800">{{ $service->title }}</p>
                                    <p class="text-sm text-gray-500">{{ Str::limit($service->description, 50) }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex flex-wrap gap-1">
                                @foreach(array_slice($service->technologies ?? [], 0, 3) as $tech)
                                    <span class="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">{{ $tech }}</span>
                                @endforeach
                            </div>
                        </td>
                        <td class="px-6 py-4 text-center">
                            @if($service->active)
                                <span
                                    class="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Actif</span>
                            @else
                                <span
                                    class="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded-full">Inactif</span>
                            @endif
                        </td>
                        <td class="px-6 py-4 text-right">
                            <a href="{{ route('admin.services.edit', $service) }}"
                                class="text-blue-600 hover:underline mr-3">Modifier</a>
                            <form action="{{ route('admin.services.destroy', $service) }}" method="POST" class="inline"
                                onsubmit="return confirm('Supprimer ce service ?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-600 hover:underline">Supprimer</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                            Aucun service. <a href="{{ route('admin.services.create') }}"
                                class="text-blue-600 hover:underline">Créer le premier</a>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="mt-6">
        {{ $services->links() }}
    </div>
</x-admin-layout>