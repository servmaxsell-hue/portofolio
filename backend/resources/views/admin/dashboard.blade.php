<x-admin-layout>
    <x-slot name="title">Tableau de bord</x-slot>
    <x-slot name="subtitle">Bienvenue dans votre espace d'administration</x-slot>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="stat-card">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-500 text-sm font-medium">Projets</p>
                    <p class="text-3xl font-bold text-gray-800 mt-1">{{ $stats['projects'] }}</p>
                </div>
                <div
                    class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
            </div>
            <a href="{{ route('admin.projects.index') }}"
                class="inline-block mt-4 text-blue-600 text-sm font-medium hover:underline">
                Gérer →
            </a>
        </div>

        <div class="stat-card">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-500 text-sm font-medium">Articles</p>
                    <p class="text-3xl font-bold text-gray-800 mt-1">{{ $stats['articles'] }}</p>
                    <p class="text-xs text-green-600 font-medium">{{ $stats['published_articles'] }} publiés</p>
                </div>
                <div
                    class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                </div>
            </div>
            <a href="{{ route('admin.articles.index') }}"
                class="inline-block mt-4 text-green-600 text-sm font-medium hover:underline">
                Gérer →
            </a>
        </div>

        <div class="stat-card">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-500 text-sm font-medium">Services</p>
                    <p class="text-3xl font-bold text-gray-800 mt-1">{{ $stats['services'] }}</p>
                </div>
                <div
                    class="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
            </div>
            <a href="{{ route('admin.services.index') }}"
                class="inline-block mt-4 text-purple-600 text-sm font-medium hover:underline">
                Gérer →
            </a>
        </div>

        <div class="stat-card">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-500 text-sm font-medium">Messages</p>
                    <p class="text-3xl font-bold text-gray-800 mt-1">{{ $stats['contacts'] }}</p>
                    @if($stats['unread_contacts'] > 0)
                        <p class="text-xs text-red-600 font-medium">{{ $stats['unread_contacts'] }} non lus</p>
                    @endif
                </div>
                <div
                    class="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
            </div>
            <a href="{{ route('admin.contacts.index') }}"
                class="inline-block mt-4 text-rose-600 text-sm font-medium hover:underline">
                Voir →
            </a>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Contacts -->
        <div class="content-card">
            <div class="p-6 border-b">
                <h3 class="text-lg font-bold text-gray-800">Messages récents</h3>
            </div>
            <div class="divide-y">
                @forelse($recentContacts as $contact)
                    <a href="{{ route('admin.contacts.show', $contact) }}"
                        class="block p-4 hover:bg-gray-50 transition {{ !$contact->read ? 'bg-blue-50/50' : '' }}">
                        <div class="flex justify-between items-start mb-1">
                            <p class="font-semibold {{ !$contact->read ? 'text-blue-600' : 'text-gray-800' }}">
                                {{ $contact->name }}
                                @if(!$contact->read)
                                    <span class="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">Nouveau</span>
                                @endif
                            </p>
                            <span class="text-xs text-gray-400">{{ $contact->created_at->diffForHumans() }}</span>
                        </div>
                        <p class="text-sm text-gray-500">{{ $contact->email }}</p>
                        <p class="text-sm text-gray-600 mt-2 line-clamp-1">{{ $contact->message }}</p>
                    </a>
                @empty
                    <div class="p-8 text-center text-gray-500">
                        <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Aucun message pour le moment.
                    </div>
                @endforelse
            </div>
        </div>

        <!-- Recent Articles -->
        <div class="content-card">
            <div class="p-6 border-b flex items-center justify-between">
                <h3 class="text-lg font-bold text-gray-800">Articles récents</h3>
                <a href="{{ route('admin.articles.create') }}"
                    class="text-sm text-blue-600 font-medium hover:underline">
                    + Nouveau
                </a>
            </div>
            <div class="divide-y">
                @forelse($recentArticles as $article)
                    <a href="{{ route('admin.articles.edit', $article) }}" class="block p-4 hover:bg-gray-50 transition">
                        <div class="flex justify-between items-start mb-1">
                            <p class="font-semibold text-gray-800">{{ $article->title }}</p>
                            <span class="text-xs text-gray-400">{{ $article->created_at->diffForHumans() }}</span>
                        </div>
                        <p class="text-sm">
                            @if($article->published)
                                <span class="text-green-600 font-medium">✓ Publié</span>
                            @else
                                <span class="text-yellow-600 font-medium">○ Brouillon</span>
                            @endif
                            <span class="text-gray-400 mx-2">•</span>
                            <span class="text-gray-500">{{ $article->read_time }} min de lecture</span>
                        </p>
                    </a>
                @empty
                    <div class="p-8 text-center text-gray-500">
                        <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <p class="mb-3">Aucun article pour le moment.</p>
                        <a href="{{ route('admin.articles.create') }}" class="text-blue-600 font-medium hover:underline">
                            Créer votre premier article
                        </a>
                    </div>
                @endforelse
            </div>
        </div>
    </div>

    <!-- Quick Actions -->
    <div class="mt-8 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl text-white">
        <h3 class="text-lg font-bold mb-4">Actions rapides</h3>
        <div class="flex flex-wrap gap-3">
            <a href="{{ route('admin.projects.create') }}"
                class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition font-medium">
                + Nouveau projet
            </a>
            <a href="{{ route('admin.articles.create') }}"
                class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition font-medium">
                + Nouvel article
            </a>
            <a href="{{ route('admin.services.create') }}"
                class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition font-medium">
                + Nouveau service
            </a>
            <a href="/" target="_blank"
                class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition font-medium">
                👁️ Voir le site
            </a>
        </div>
    </div>

    <!-- API Configuration (n8n) -->
    <div class="mt-8 p-6 bg-white border border-gray-200 rounded-2xl">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Configuration Automatisation (n8n)
            </h3>
            <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Pour développeurs</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">URL de l'API (Articles)</label>
                <div class="flex items-center gap-2">
                    <code
                        class="flex-1 bg-gray-100 p-3 rounded-lg text-sm font-mono text-gray-800 select-all border border-gray-200">
                        {{ url('/api/v1/articles') }}
                    </code>
                </div>
                <p class="text-xs text-gray-400 mt-1">À utiliser dans le nœud HTTP Request (Method: POST)</p>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">Authentification (Header)</label>
                <div class="space-y-2">
                    <div class="flex justify-between items-center text-sm border-b border-gray-100 pb-1">
                        <span class="text-gray-600">Header Name :</span>
                        <code class="font-mono text-blue-600 font-bold">X-API-KEY</code>
                    </div>
                    <div>
                        <span class="text-gray-600 text-sm block mb-1">Value :</span>
                        <code
                            class="block w-full bg-gray-100 p-3 rounded-lg text-sm font-mono text-gray-800 select-all border border-gray-200 break-all">
                            @php echo env('N8N_API_KEY', 'Clé non configurée'); @endphp
                        </code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-admin-layout>