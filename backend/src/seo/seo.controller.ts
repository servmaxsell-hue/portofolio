import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GoogleAnalyticsService } from './google-analytics.service';
import { SearchConsoleService } from './search-console.service';
import { SeoOptimizationService } from './seo-optimization.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('SEO')
@Controller('seo')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SeoController {
    constructor(
        private readonly gaService: GoogleAnalyticsService,
        private readonly scService: SearchConsoleService,
        private readonly seoOptService: SeoOptimizationService,
        private readonly prisma: PrismaService,
    ) { }

    @Get('analytics')
    @ApiOperation({ summary: 'Get Page Views from GA4' })
    async getAnalytics(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.gaService.getPageViews(startDate, endDate);
    }

    @Get('search-console')
    @ApiOperation({ summary: 'Get Top Keywords from GSC' })
    async getSearchConsole(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        return this.scService.getTopKeywords(startDate, endDate);
    }

    @Get('analyze')
    @ApiOperation({ summary: 'Run SEO analysis and generate recommendations' })
    async analyze() {
        return this.seoOptService.runAnalysis();
    }

    @Get('recommendations')
    @ApiOperation({ summary: 'Get all SEO recommendations' })
    async getRecommendations() {
        // @ts-ignore - Prisma types might not have refreshed in the IDE yet
        return this.prisma.seoRecommendation.findMany({
            orderBy: { created_at: 'desc' },
        });
    }
}
