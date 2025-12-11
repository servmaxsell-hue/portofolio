<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message - Portfolio</title>
</head>

<body
    style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 20px 0 30px 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"
                    style="border-collapse: collapse; max-width: 600px; min-width: 320px;">
                    <!-- Brand Header -->
                    <tr>
                        <td align="center"
                            style="padding: 30px 0; background: linear-gradient(to right, #1a1a2e, #16213e); border-radius: 12px 12px 0 0;">
                            <h1
                                style="color: #ffffff; font-size: 24px; margin: 0; font-weight: bold; letter-spacing: 1px;">
                                Portfolio <span style="color: #e94560;">Contact</span>
                            </h1>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td bgcolor="#ffffff"
                            style="padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td
                                        style="color: #111827; font-size: 18px; font-weight: bold; padding-bottom: 20px;">
                                        Nouveau message reçu ! 📬
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="color: #4b5563; font-size: 16px; line-height: 24px; padding-bottom: 30px;">
                                        Vous avez reçu une nouvelle demande de contact via votre site web. Voici les
                                        détails :
                                    </td>
                                </tr>

                                <!-- Info Card -->
                                <tr>
                                    <td
                                        style="background-color: #f9fafb; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td width="30%"
                                                    style="color: #6b7280; font-size: 14px; padding: 5px 0; font-weight: bold;">
                                                    De :</td>
                                                <td style="color: #111827; font-size: 14px;">{{ $data['name'] }}</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="color: #6b7280; font-size: 14px; padding: 5px 0; font-weight: bold;">
                                                    Email :</td>
                                                <td style="color: #111827; font-size: 14px;">
                                                    <a href="mailto:{{ $data['email'] }}"
                                                        style="color: #2563eb; text-decoration: none;">{{ $data['email'] }}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="color: #6b7280; font-size: 14px; padding: 5px 0; font-weight: bold;">
                                                    Sujet :</td>
                                                <td style="color: #111827; font-size: 14px;">
                                                    {{ $data['subject'] ?? 'Non spécifié' }}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Message Body -->
                                <tr>
                                    <td style="padding-top: 30px;">
                                        <p
                                            style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; margin-bottom: 10px;">
                                            Message :</p>
                                        <div
                                            style="background-color: #ffffff; border-left: 4px solid #e94560; padding: 15px 20px; color: #374151; font-size: 16px; line-height: 1.6; font-style: italic;">
                                            {!! nl2br(e($data['message'])) !!}
                                        </div>
                                    </td>
                                </tr>

                                <!-- Action Button -->
                                <tr>
                                    <td align="center" style="padding-top: 40px;">
                                        <a href="mailto:{{ $data['email'] }}?subject=RE: {{ $data['subject'] ?? 'Votre message sur mon portfolio' }}"
                                            style="background-color: #2563eb; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; font-size: 16px;">
                                            Répondre maintenant
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 0 0 0; text-align: center;">
                            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                                Cet email a été envoyé automatiquement depuis votre portfolio.
                            </p>
                            <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0 0;">
                                &copy; {{ date('Y') }} Paul Maxime Dossou. Tous droits réservés.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>