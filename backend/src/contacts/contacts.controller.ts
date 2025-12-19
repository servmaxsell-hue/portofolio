import { Controller, Get, Post, Body, Param, Delete, NotFoundException, UseGuards, Patch } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contact') // Singular 'contact' to match old API found in routes/api.php
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) { }

    @Post()
    async create(@Body() createContactDto: Prisma.ContactCreateInput) {
        return this.contactsService.create(createContactDto);
    }

    // Admin only
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.contactsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const contact = await this.contactsService.findOne(+id);
        if (!contact) throw new NotFoundException(`Contact with id ${id} not found`);
        return contact;
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateContactDto: Prisma.ContactUpdateInput) {
        return this.contactsService.update(+id, updateContactDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.contactsService.remove(+id);
    }
}
