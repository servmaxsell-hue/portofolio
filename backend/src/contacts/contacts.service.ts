import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContactsService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.ContactCreateInput) {
        return this.prisma.contact.create({ data });
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
