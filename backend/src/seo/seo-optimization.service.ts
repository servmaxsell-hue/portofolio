import { Injectable, Logger } from '@nestjs/common';
import { GoogleAnalyticsService } from './google-analytics.service';
import { SearchConsoleService } from './search-console.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeoOptimizationService {
    private readonly logger = new Logger(SeoOptimizationService.name);

    constructor(
        private gaService: GoogleAnalyticsService,
        private scService: SearchConsoleService,
        private prisma: PrismaService,
    ) { }

    async runAnalysis() {
        this.logger.log('Starting SEO Analysis...');

        // Default range: last 30 days
        const startDate = '2025-12-10'; // Using absolute dates for safety in testing
        const endDate = '2026-01-10';

        try {
            const keywords = await this.scService.getTopKeywords(startDate, endDate);

            if (!keywords || keywords.length === 0) {
                this.logger.warn('No keywords found to analyze.');
                return { message: 'No keywords found' };
            }

            const recommendations = [];

            for (const kw of keywords) {
                const impressions = kw.impressions || 0;
                const ctr = kw.ctr || 0;
                const position = kw.position || 0;

                // Analysis 1: High Impressions, Low CTR
                if (impressions > 100 && ctr < 0.02) {
                    recommendations.push({
                        page_path: kw.keyword || 'unknown',
                        keyword: kw.keyword || 'unknown',
                        reason: `High impressions (${impressions}) but low CTR (${(ctr * 100).toFixed(2)}%).`,
                        suggested_action: 'Improve Meta Title and Description to increase click-through rate.',
                    });
                }

                // Analysis 2: Ranking in position 11-20 (Page 2)
                if (position > 10 && position <= 20) {
                    recommendations.push({
                        page_path: kw.keyword || 'unknown',
                        keyword: kw.keyword || 'unknown',
                        reason: `Keyword is on page 2 (average position: ${position.toFixed(1)}).`,
                        suggested_action: 'Improve content depth or add more internal links to reach Page 1.',
                    });
                }
            }

            // Save recommendations to DB
            for (const rec of recommendations) {
                // @ts-ignore - Prisma types might not have refreshed in the IDE yet
                await this.prisma.seoRecommendation.create({ data: rec });
            }

            this.logger.log(`Analysis complete. Generated ${recommendations.length} recommendations.`);
            return { count: recommendations.length, recommendations };
        } catch (error) {
            this.logger.error(`SEO Analysis failed: ${error.message}`);
            throw error;
        }
    }
}
