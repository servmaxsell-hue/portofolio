import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
    constructor(private prisma: PrismaService) { }

    async create(data: {
        name: string;
        email: string;
        content: string;
        article_id: number;
    }) {
        return this.prisma.comment.create({
            data,
        });
    }

    async findAll(includeUnapproved = false) {
        return this.prisma.comment.findMany({
            where: includeUnapproved ? {} : { approved: true },
            include: {
                article: {
                    select: {
                        title: true,
                        id: true,
                    }
                }
            },
            orderBy: { created_at: 'desc' },
        });
    }

    async findByArticle(articleId: number) {
        return this.prisma.comment.findMany({
            where: {
                article_id: articleId,
                approved: true,
            },
            orderBy: { created_at: 'desc' },
        });
    }

    async approve(id: number) {
        return this.prisma.comment.update({
            where: { id },
            data: { approved: true },
        });
    }

    async remove(id: number) {
        return this.prisma.comment.delete({
            where: { id },
        });
    }
}
