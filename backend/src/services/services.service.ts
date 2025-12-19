import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServicesService {
    constructor(private prisma: PrismaService) { }

    async findAll(includeInactive = false) {
        return this.prisma.service.findMany({
            where: includeInactive ? {} : { active: true },
            orderBy: { order: 'asc' },
        });
    }

    async findById(id: number) {
        return this.prisma.service.findUnique({
            where: { id },
        });
    }

    async findOne(slug: string) {
        return this.prisma.service.findUnique({
            where: { slug },
        });
    }

    async create(data: Prisma.ServiceCreateInput) {
        return this.prisma.service.create({ data });
    }

    async update(id: number, data: Prisma.ServiceUpdateInput) {
        return this.prisma.service.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        return this.prisma.service.delete({
            where: { id },
        });
    }
}
