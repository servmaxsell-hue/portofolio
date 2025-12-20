import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
    constructor(private prisma: PrismaService) { }

    async getSetting(key: string) {
        const setting = await this.prisma.setting.findUnique({
            where: { key },
        });
        return setting;
    }

    async getAllSettings() {
        const settings = await this.prisma.setting.findMany();
        return settings.reduce((acc: Record<string, string>, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
    }

    async updateSetting(key: string, value: string) {
        return this.prisma.setting.upsert({
            where: { key },
            update: { value },
            create: { key, value },
        });
    }

    async updateMany(settings: Record<string, string>) {
        const promises = Object.entries(settings).map(([key, value]) =>
            this.updateSetting(key, value),
        );
        return Promise.all(promises);
    }
}
