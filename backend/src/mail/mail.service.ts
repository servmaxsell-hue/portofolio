import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'contact@paulmaximedossou.com',
        pass: 'seut zddm qtei dkyz',
      },
    });
  }

  async sendContactEmail(data: { name: string; email: string; subject?: string; message: string }) {
    const date = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const mailOptions = {
      from: `"Paul Maxime Dossou - Portfolio" <contact@paulmaximedossou.com>`,
      to: 'contact@paulmaximedossou.com',
      replyTo: data.email,
      subject: `🚀 Nouveau Contact : ${data.subject || 'Sans sujet'}`,
      html: `
        <div style="background-color: #f8fafc; padding: 40px 20px; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Nouveau Message</h1>
              <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 14px;">Reçu le ${date}</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px;">
              <div style="margin-bottom: 30px;">
                <h3 style="color: #6366f1; text-transform: uppercase; font-size: 12px; font-weight: 700; letter-spacing: 1px; margin-bottom: 15px;">Détails de l'expéditeur</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 100px;">Nom</td>
                    <td style="padding: 8px 0; color: #1e293b; font-size: 15px; font-weight: 600;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td>
                    <td style="padding: 8px 0; color: #6366f1; font-size: 15px; font-weight: 600;"><a href="mailto:${data.email}" style="color: #6366f1; text-decoration: none;">${data.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Sujet</td>
                    <td style="padding: 8px 0; color: #1e293b; font-size: 15px; font-weight: 600;">${data.subject || 'N/A'}</td>
                  </tr>
                </table>
              </div>

              <div style="margin-top: 30px; padding: 25px; background-color: #f1f5f9; border-radius: 12px; border-left: 4px solid #6366f1;">
                <h3 style="color: #1e293b; font-size: 14px; margin-top: 0; margin-bottom: 12px; font-weight: 700;">Message :</h3>
                <p style="color: #334155; font-size: 15px; margin: 0; white-space: pre-wrap;">${data.message}</p>
              </div>

              <div style="margin-top: 40px; text-align: center;">
                <a href="mailto:${data.email}" style="display: inline-block; background-color: #6366f1; color: #ffffff; padding: 14px 28px; border-radius: 10px; font-weight: 600; text-decoration: none; font-size: 14px; transition: background-color 0.2s;">Répondre directement</a>
              </div>
            </div>

            <!-- Footer -->
            <div style="padding: 20px; text-align: center; border-top: 1px solid #f1f5f9; background-color: #fafafa;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">Ceci est une notification automatique de votre portfolio Paul Maxime Dossou</p>
            </div>
          </div>
        </div>
      `,
    };


    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
