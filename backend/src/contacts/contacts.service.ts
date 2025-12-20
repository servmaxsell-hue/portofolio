import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ContactsService {
    constructor(
        private prisma: PrismaService,
        private mailService: MailService
    ) { }

    async create(data: Prisma.ContactCreateInput) {
        const contact = await this.prisma.contact.create({ data });

        // Send email notification
        await this.mailService.sendContactEmail({
            name: contact.name,
            email: contact.email,
            subject: contact.subject || undefined,
            message: contact.message
        });

        return contact;
    }

    async findAll() {
        return this.prisma.contact.findMany({
            orderBy: { created_at: 'desc' },
        });
    }

    async findOne(id: number) {
        return this.prisma.contact.findUnique({
            where: { id },
        });
    }

    async update(id: number, data: Prisma.ContactUpdateInput) {
        return this.prisma.contact.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        return this.prisma.contact.delete({
            where: { id },
        });
    }
}
