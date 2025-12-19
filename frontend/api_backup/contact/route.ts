import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// In a production app, you would:
// 1. Save to database
// 2. Send email notification
// 3. Integrate with a CRM

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormData = await request.json();

        // Validate required fields
        if (!body.name || !body.email || !body.subject || !body.message) {
            return NextResponse.json(
                { error: 'Tous les champs sont requis' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: 'Format d\'email invalide' },
                { status: 400 }
            );
        }

        // Here you would typically:
        // 1. Save the contact to a database
        // 2. Send an email notification
        // For now, we'll just log it and return success

        console.log('New contact form submission:', {
            name: body.name,
            email: body.email,
            subject: body.subject,
            message: body.message,
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json({
            success: true,
            message: 'Message envoyé avec succès !',
        });
    } catch {
        return NextResponse.json(
            { error: 'Erreur lors de l\'envoi du message' },
            { status: 500 }
        );
    }
}
