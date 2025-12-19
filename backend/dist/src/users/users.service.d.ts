import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(email: string): Promise<{
        id: number;
        email: string;
        name: string;
        email_verified_at: Date | null;
        password: string;
        remember_token: string | null;
        created_at: Date;
        updated_at: Date;
    } | null>;
    create(data: Prisma.UserCreateInput): Promise<{
        id: number;
        email: string;
        name: string;
        email_verified_at: Date | null;
        password: string;
        remember_token: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
}
