import { Injectable, Logger } from '@nestjs/common';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Injectable()
export class GoogleAnalyticsService {
    private readonly logger = new Logger(GoogleAnalyticsService.name);
    private client: BetaAnalyticsDataClient;
    private propertyId: string;

    constructor(private configService: ConfigService) {
        const keyPath = path.join(process.cwd(), 'credentials', 'google-key.json');
        this.client = new BetaAnalyticsDataClient({
            keyFilename: keyPath,
        });
        // We will need the GA4 Property ID, usually stored in env
        this.propertyId = this.configService.get<string>('GA4_PROPERTY_ID') || '';
    }

    async getPageViews(startDate: string = '30daysAgo', endDate: string = 'today') {
        if (!this.propertyId) {
            this.logger.error('GA4_PROPERTY_ID is not defined');
            return null;
        }

        try {
            const [response] = await this.client.runReport({
                property: `properties/${this.propertyId}`,
                dateRanges: [
                    {
                        startDate,
                        endDate,
                    },
                ],
                dimensions: [
                    {
                        name: 'pagePath',
                    },
                ],
                metrics: [
                    {
                        name: 'screenPageViews',
                    },
                    {
                        name: 'activeUsers',
                    },
                ],
            });

            if (!response || !response.rows) {
                return [];
            }

            return response.rows.map(row => ({
                path: row.dimensionValues?.[0]?.value || '',
                views: row.metricValues?.[0]?.value || '0',
                users: row.metricValues?.[1]?.value || '0',
            }));
        } catch (error) {
            this.logger.error(`Error fetching GA4 data: ${error.message}`);
            throw error;
        }
    }
}
