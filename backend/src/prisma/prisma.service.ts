import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        let dbUrl = process.env.DATABASE_URL;

        if (process.env.VERCEL === '1') {
            // Test de plusieurs chemins possibles sur Vercel
            const paths = [
                join(process.cwd(), 'prisma', 'dev.db'),
                join(process.cwd(), 'backend', 'prisma', 'dev.db'),
                join(process.cwd(), 'src', 'prisma', 'dev.db'),
                '/var/task/prisma/dev.db',
                '/var/task/backend/prisma/dev.db'
            ];

            console.log('--- RECHERCHE DATABASE ---');
            for (const path of paths) {
                const exists = fs.existsSync(path);
                console.log(`Chemin : ${path} -> ${exists ? 'TROUVÉ' : 'NON TROUVÉ'}`);
                if (exists) {
                    dbUrl = `file:${path}`;
                    break;
                }
            }
        }

        super({
            datasources: {
                db: {
                    url: dbUrl
                }
            }
        });
    }

    async onModuleInit() {
        try {
            await this.$connect();
        } catch (error) {
            console.error('❌ Erreur de connexion Prisma :', error);
        }
    }
}
