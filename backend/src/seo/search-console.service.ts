import { Injectable, Logger } from '@nestjs/common';
import { google, searchconsole_v1 } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Injectable()
export class SearchConsoleService {
    private readonly logger = new Logger(SearchConsoleService.name);
    private sc: searchconsole_v1.Searchconsole;
    private siteUrl: string;

    constructor(private configService: ConfigService) {
        const keyPath = path.join(process.cwd(), 'credentials', 'google-key.json');
        const auth = new google.auth.GoogleAuth({
            keyFile: keyPath,
            scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
        });

        this.sc = google.searchconsole({ version: 'v1', auth });
        this.siteUrl = this.configService.get<string>('SITE_URL');
    }

    async getTopKeywords(startDate: string, endDate: string) {
        if (!this.siteUrl) {
            this.logger.error('SITE_URL is not defined in config');
            return null;
        }

        try {
            const response = await this.sc.searchanalytics.query({
                siteUrl: this.siteUrl,
                requestBody: {
                    startDate,
                    endDate,
                    dimensions: ['query'],
                    rowLimit: 10,
                },
            });

            return response.data.rows?.map(row => ({
                keyword: row.keys[0],
                clicks: row.clicks,
                impressions: row.impressions,
                ctr: row.ctr,
                position: row.position,
            })) || [];
        } catch (error) {
            this.logger.error(`Error fetching Search Console data: ${error.message}`);
            throw error;
        }
    }
}
