import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL
                }
            },
            log: ['error', 'warn'],
        });
    }

    async onModuleInit() {
        try {
            await this.$connect();
            console.log('✅ Connecté à MySQL (Hostinger)');
        } catch (error) {
            console.error('❌ Erreur de connexion MySQL :', error);
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
