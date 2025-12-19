import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.project.findMany({
            orderBy: { order: 'asc' },
        });
    }

    async findFeatured() {
        return this.prisma.project.findMany({
            where: { featured: true },
            orderBy: { order: 'asc' },
        });
    }

    async findOne(slug: string) {
        return this.prisma.project.findUnique({
            where: { slug },
        });
    }

    async findById(id: number) {
        return this.prisma.project.findUnique({
            where: { id },
        });
    }

    async create(data: Prisma.ProjectCreateInput) {
        return this.prisma.project.create({ data });
    }

    async update(id: number, data: Prisma.ProjectUpdateInput) {
        return this.prisma.project.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        return this.prisma.project.delete({
            where: { id },
        });
    }
}
