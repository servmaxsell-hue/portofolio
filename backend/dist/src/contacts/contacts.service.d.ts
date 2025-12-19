import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ContactsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ContactCreateInput): Promise<{
        name: string;
        email: string;
        subject: string | null;
        message: string;
        read: boolean;
        replied_at: Date | null;
        created_at: Date;
        updated_at: Date;
        id: number;
    }>;
    findAll(): Promise<{
        name: string;
        email: string;
        subject: string | null;
        message: string;
        read: boolean;
        replied_at: Date | null;
        created_at: Date;
        updated_at: Date;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        email: string;
        subject: string | null;
        message: string;
        read: boolean;
        replied_at: Date | null;
        created_at: Date;
        updated_at: Date;
        id: number;
    } | null>;
    update(id: number, data: Prisma.ContactUpdateInput): Promise<{
        name: string;
        email: string;
        subject: string | null;
        message: string;
        read: boolean;
        replied_at: Date | null;
        created_at: Date;
        updated_at: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        email: string;
        subject: string | null;
        message: string;
        read: boolean;
        replied_at: Date | null;
        created_at: Date;
        updated_at: Date;
        id: number;
    }>;
}
