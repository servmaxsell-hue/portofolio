import { ContactsService } from './contacts.service';
import { Prisma } from '@prisma/client';
export declare class ContactsController {
    private readonly contactsService;
    constructor(contactsService: ContactsService);
    create(createContactDto: Prisma.ContactCreateInput): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateContactDto: Prisma.ContactUpdateInput): Promise<{
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
    remove(id: string): Promise<{
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
