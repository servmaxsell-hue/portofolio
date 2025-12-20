import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all settings' })
    async findAll() {
        return {
            success: true,
            data: await this.settingsService.getAllSettings(),
        };
    }

    @Get(':key')
    @ApiOperation({ summary: 'Get a specific setting' })
    async findOne(@Param('key') key: string) {
        const setting = await this.settingsService.getSetting(key);
        return {
            success: true,
            data: setting ? setting.value : null,
        };
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update many settings' })
    async updateMany(@Body() settings: Record<string, string>) {
        await this.settingsService.updateMany(settings);
        return {
            success: true,
            message: 'Settings updated successfully',
        };
    }
}
