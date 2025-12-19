import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticlesService {
    constructor(private prisma: PrismaService) { }

    async findAll(includeUnpublished = false) {
        return this.prisma.article.findMany({
            where: includeUnpublished ? {} : { published: true },
            orderBy: { published_at: 'desc' },
        });
    }

    async findLatest() {
        return this.prisma.article.findMany({
            take: 3,
            where: { published: true },
            orderBy: { published_at: 'desc' },
        });
    }

    async findOne(slug: string) {
        return this.prisma.article.findUnique({
            where: { slug },
        });
    }

    async findById(id: number) {
        return this.prisma.article.findUnique({
            where: { id },
        });
    }


    async create(data: Prisma.ArticleCreateInput) {
        if (data.published && !data.published_at) {
            data.published_at = new Date();
        }
        return this.prisma.article.create({ data });
    }

    async update(id: number, data: Prisma.ArticleUpdateInput) {
        if (data.published && !data.published_at) {
            data.published_at = new Date();
        }
        return this.prisma.article.update({
            where: { id },
            data,
        });
    }


    async remove(id: number) {
        return this.prisma.article.delete({
            where: { id },
        });
    }

    async like(id: number) {
        return this.prisma.article.update({
            where: { id },
            data: {
                likes: {
                    increment: 1,
                },
            },
        });
    }
}
