import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) { }

    @Get()
    async findAll(@Query('includeInactive') includeInactive?: string) {
        return this.servicesService.findAll(includeInactive === 'true');
    }

    @Get('id/:id')
    async findById(@Param('id') id: string) {
        const service = await this.servicesService.findById(+id);
        if (!service) throw new NotFoundException(`Service with ID ${id} not found`);
        return service;
    }

    @Get(':slug')
    async findOne(@Param('slug') slug: string) {
        const service = await this.servicesService.findOne(slug);
        if (!service) throw new NotFoundException(`Service with slug ${slug} not found`);
        return service;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createServiceDto: Prisma.ServiceCreateInput) {
        return this.servicesService.create(createServiceDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() updateServiceDto: Prisma.ServiceUpdateInput) {
        return this.servicesService.update(+id, updateServiceDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: string) {
        return this.servicesService.remove(+id);
    }
}
