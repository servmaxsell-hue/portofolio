<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Mail\ContactFormSubmitted;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|min:10',
        ]);

        $contact = Contact::create($validated);

        // Send email to admin
        try {
            Mail::to('dossoumaxime888@gmail.com')->send(new ContactFormSubmitted($validated));
        } catch (\Exception $e) {
            // Log error but don't fail the request
            \Illuminate\Support\Facades\Log::error('Failed to send contact email: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Message envoyé avec succès !',
            'data' => [
                'id' => $contact->id,
            ]
        ], 201);
    }
}
