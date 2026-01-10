import { Module } from '@nestjs/common';
import { GoogleAnalyticsService } from './google-analytics.service';
import { SearchConsoleService } from './search-console.service';
import { SeoOptimizationService } from './seo-optimization.service';
import { SeoController } from './seo.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [ConfigModule, PrismaModule],
    providers: [GoogleAnalyticsService, SearchConsoleService, SeoOptimizationService],
    controllers: [SeoController],
    exports: [GoogleAnalyticsService, SearchConsoleService, SeoOptimizationService],
})
export class SeoModule { }
