<x-admin-layout>
    <x-slot name="title">Mon Profil</x-slot>
    <x-slot name="subtitle">Gérer vos informations personnelles et votre mot de passe</x-slot>

    <div class="max-w-3xl space-y-8">
        <!-- Profile Information -->
        <div class="content-card p-8">
            <div class="flex items-center gap-4 mb-6">
                <div
                    class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-xl font-bold text-gray-800">Informations du profil</h3>
                    <p class="text-sm text-gray-500">Mettez à jour votre nom et votre adresse email</p>
                </div>
            </div>

            <form method="post" action="{{ route('profile.update') }}" class="space-y-5">
                @csrf
                @method('patch')

                <div>
                    <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                    <input type="text" name="name" id="name" value="{{ old('name', $user->name) }}" required
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                    @error('name') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input type="email" name="email" id="email" value="{{ old('email', $user->email) }}" required
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                    @error('email') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                </div>

                <div class="flex items-center gap-4 pt-4">
                    <button type="submit"
                        class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition shadow-lg shadow-blue-500/25">
                        Enregistrer
                    </button>
                    @if (session('status') === 'profile-updated')
                        <p class="text-sm text-green-600 font-medium">✓ Profil mis à jour</p>
                    @endif
                </div>
            </form>
        </div>

        <!-- Update Password -->
        <div class="content-card p-8">
            <div class="flex items-center gap-4 mb-6">
                <div
                    class="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-xl font-bold text-gray-800">Mot de passe</h3>
                    <p class="text-sm text-gray-500">Assurez-vous d'utiliser un mot de passe sécurisé</p>
                </div>
            </div>

            <form method="post" action="{{ route('password.update') }}" class="space-y-5">
                @csrf
                @method('put')

                <div>
                    <label for="current_password" class="block text-sm font-semibold text-gray-700 mb-2">Mot de passe
                        actuel</label>
                    <input type="password" name="current_password" id="current_password"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition">
                    @error('current_password', 'updatePassword') <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">Nouveau mot de
                        passe</label>
                    <input type="password" name="password" id="password"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition">
                    @error('password', 'updatePassword') <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="password_confirmation" class="block text-sm font-semibold text-gray-700 mb-2">Confirmer
                        le mot de passe</label>
                    <input type="password" name="password_confirmation" id="password_confirmation"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition">
                </div>

                <div class="flex items-center gap-4 pt-4">
                    <button type="submit"
                        class="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition shadow-lg shadow-amber-500/25">
                        Changer le mot de passe
                    </button>
                    @if (session('status') === 'password-updated')
                        <p class="text-sm text-green-600 font-medium">✓ Mot de passe mis à jour</p>
                    @endif
                </div>
            </form>
        </div>

        <!-- Quick Links -->
        <div class="flex gap-4">
            <a href="{{ route('admin.dashboard') }}"
                class="flex-1 p-6 bg-gray-800 text-white rounded-2xl hover:bg-gray-700 transition text-center">
                <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                </svg>
                <span class="font-semibold">Retour au Dashboard</span>
            </a>
            <a href="/" target="_blank"
                class="flex-1 p-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl hover:from-rose-600 hover:to-pink-700 transition text-center">
                <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span class="font-semibold">Voir le site public</span>
            </a>
        </div>
    </div>
</x-admin-layout>