import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PublishAuthGuard } from '../auth/publish-auth.guard';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    @Get()
    async findAll() {
        // For now return all to simplify admin migration, 
        // in production we should check roles/auth
        return this.articlesService.findAll(true);
    }

    @Get('latest')
    async findLatest() {
        return this.articlesService.findLatest();
    }

    @Get('id/:id')
    async findById(@Param('id') id: string) {
        const article = await this.articlesService.findById(+id);
        if (!article) throw new NotFoundException(`Article with ID ${id} not found`);
        return article;
    }

    @Get(':slug')
    async findOne(@Param('slug') slug: string) {
        const article = await this.articlesService.findOne(slug);
        if (!article) throw new NotFoundException(`Article with slug ${slug} not found`);
        return article;
    }


    @Post()
    @UseGuards(PublishAuthGuard)
    async create(@Body() createArticleDto: Prisma.ArticleCreateInput) {
        try {
            console.log('Creating article:', createArticleDto);
            return await this.articlesService.create(createArticleDto);
        } catch (error) {
            console.error('Error creating article:', error);
            throw error;
        }
    }

    @Patch(':id')
    @UseGuards(PublishAuthGuard)
    async update(@Param('id') id: string, @Body() updateArticleDto: Prisma.ArticleUpdateInput) {
        try {
            console.log('Updating article:', id, updateArticleDto);
            return await this.articlesService.update(+id, updateArticleDto);
        } catch (error) {
            console.error('Error updating article:', error);
            throw error;
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: string) {
        try {
            return await this.articlesService.remove(+id);
        } catch (error) {
            console.error('Error removing article:', error);
            throw error;
        }
    }

    @Post(':id/like')
    async like(@Param('id') id: string) {
        return this.articlesService.like(+id);
    }
}
