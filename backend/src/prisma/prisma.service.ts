import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { join } from 'path';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.VERCEL === '1'
                        ? `file:${join(process.cwd(), 'prisma', 'dev.db')}`
                        : process.env.DATABASE_URL
                }
            }
        });
    }

    async onModuleInit() {
        await this.$connect();
    }
}
