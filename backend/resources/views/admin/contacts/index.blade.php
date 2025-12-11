<x-admin-layout>
    <x-slot name="title">Messages</x-slot>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <table class="w-full">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Expéditeur</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Message</th>
                    <th class="px-6 py-4 text-center text-sm font-semibold text-gray-600">Statut</th>
                    <th class="px-6 py-4 text-right text-sm font-semibold text-gray-600">Date</th>
                    <th class="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y">
                @forelse($contacts as $contact)
                    <tr class="hover:bg-gray-50 {{ !$contact->read ? 'bg-blue-50' : '' }}">
                        <td class="px-6 py-4">
                            <p class="font-semibold {{ !$contact->read ? 'text-blue-600' : 'text-gray-800' }}">
                                {{ $contact->name }}</p>
                            <p class="text-sm text-gray-500">{{ $contact->email }}</p>
                        </td>
                        <td class="px-6 py-4">
                            <p class="text-gray-600 truncate max-w-md">{{ $contact->message }}</p>
                        </td>
                        <td class="px-6 py-4 text-center">
                            @if($contact->read)
                                <span class="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded-full">Lu</span>
                            @else
                                <span
                                    class="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Nouveau</span>
                            @endif
                        </td>
                        <td class="px-6 py-4 text-right text-gray-500 text-sm">
                            {{ $contact->created_at->diffForHumans() }}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <a href="{{ route('admin.contacts.show', $contact) }}"
                                class="text-blue-600 hover:underline mr-3">Voir</a>
                            <form action="{{ route('admin.contacts.destroy', $contact) }}" method="POST" class="inline"
                                onsubmit="return confirm('Supprimer ce message ?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-600 hover:underline">Supprimer</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                            Aucun message reçu pour le moment.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="mt-6">
        {{ $contacts->links() }}
    </div>
</x-admin-layout>