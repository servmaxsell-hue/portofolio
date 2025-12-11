<x-admin-layout>
    <x-slot name="title">Message de {{ $contact->name }}</x-slot>

    <div class="max-w-3xl">
        <div class="bg-white rounded-xl shadow-sm p-8">
            <div class="flex items-start justify-between mb-8 pb-6 border-b">
                <div>
                    <h3 class="text-xl font-bold text-gray-800">{{ $contact->name }}</h3>
                    <a href="mailto:{{ $contact->email }}"
                        class="text-blue-600 hover:underline">{{ $contact->email }}</a>
                </div>
                <div class="text-right text-gray-500">
                    <p>{{ $contact->created_at->format('d/m/Y à H:i') }}</p>
                    <p class="text-sm">{{ $contact->created_at->diffForHumans() }}</p>
                </div>
            </div>

            @if($contact->subject)
                <div class="mb-4">
                    <h4 class="text-sm font-semibold text-gray-500 mb-1">Sujet</h4>
                    <p class="text-gray-800">{{ $contact->subject }}</p>
                </div>
            @endif

            <div class="mb-8">
                <h4 class="text-sm font-semibold text-gray-500 mb-2">Message</h4>
                <div class="bg-gray-50 rounded-lg p-6">
                    <p class="text-gray-700 whitespace-pre-wrap">{{ $contact->message }}</p>
                </div>
            </div>

            <div class="flex gap-4 pt-6 border-t">
                <a href="mailto:{{ $contact->email }}"
                    class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    ✉️ Répondre par email
                </a>
                <a href="{{ route('admin.contacts.index') }}"
                    class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                    Retour à la liste
                </a>
            </div>
        </div>
    </div>
</x-admin-layout>