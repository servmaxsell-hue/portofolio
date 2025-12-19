import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// Note: We might need AuthGuard later for POST/PATCH/DELETE
@Controller('projects')

export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Get()
    async findAll() {
        return this.projectsService.findAll();
    }

    @Get('featured')
    async findFeatured() {
        return this.projectsService.findFeatured();
    }

    @Get('id/:id')
    async findById(@Param('id') id: string) {
        const project = await this.projectsService.findById(+id);
        if (!project) throw new NotFoundException(`Project with ID ${id} not found`);
        return project;
    }

    @Get(':slug')
    async findOne(@Param('slug') slug: string) {
        // If slug is 'featured', it might conflict if not handled, but 'featured' is above. 
        // Express/Nest routing matches strictly top-down. 
        // Ensure 'featured' doesn't match :slug if it's caught above. Yes, it works.
        const project = await this.projectsService.findOne(slug);
        if (!project) throw new NotFoundException(`Project with slug ${slug} not found`);
        return project;
    }

    // Admin Routes
    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createProjectDto: Prisma.ProjectCreateInput) {
        return this.projectsService.create(createProjectDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() updateProjectDto: Prisma.ProjectUpdateInput) {
        return this.projectsService.update(+id, updateProjectDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: string) {
        return this.projectsService.remove(+id);
    }
}
