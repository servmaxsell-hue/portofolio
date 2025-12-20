import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        const rawUrl = process.env.DATABASE_URL || '';
        console.log('--- DEBUG DATABASE ---');
        console.log('URL présente :', !!rawUrl);
        if (rawUrl) {
            console.log('Début de l\'URL :', rawUrl.substring(0, 10));
        }

        // Nettoyage de l'URL
        const dbUrl = rawUrl.trim().replace(/^["'](.+)["']$/, '$1');

        super({
            datasources: {
                db: {
                    url: dbUrl
                }
            },
            log: ['error', 'warn'],
        });
    }

    async onModuleInit() {
        try {
            await this.$connect();
            console.log('✅ MySQL Connecté');
        } catch (error) {
            console.error('❌ Crash Connexion MySQL :', error.message);
            // On jette une erreur plus parlante
            throw new Error(`Prisma ne peut pas se connecter à Hostinger. Vérifiez votre DATABASE_URL sur Vercel. Détails: ${error.message}`);
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
