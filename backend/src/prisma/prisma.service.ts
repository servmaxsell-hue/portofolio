import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        let dbUrl = process.env.DATABASE_URL || '';

        // Nettoyage de sécurité : on enlève les guillemets et les espaces
        dbUrl = dbUrl.trim().replace(/^["'](.+)["']$/, '$1');

        if (!dbUrl && process.env.VERCEL === '1') {
            console.error('❌ DATABASE_URL est manquante sur Vercel !');
        }

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
            console.log('✅ MySQL Connecté avec succès');
        } catch (error) {
            console.error('❌ Échec de la connexion MySQL :', error.message);
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
