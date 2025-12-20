import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
    UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as fs from 'fs';

// Helper to determine storage
const isVercel = process.env.VERCEL === '1';
const storage = isVercel
    ? memoryStorage()
    : diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            callback(null, `${uniqueSuffix}${ext}`);
        },
    });

@Controller('upload')
export class UploadController {
    @Post('image')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: storage,
            fileFilter: (req, file, callback) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                    return callback(new BadRequestException('Only image files are allowed!'), false);
                }
                callback(null, true);
            },
            limits: {
                fileSize: 5 * 1024 * 1024, // 5MB
            },
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File is required');
        }

        if (isVercel) {
            // Note: In Vercel, we don't have a persistent filesystem.
            // This is just to prevent the crash. For real usage, cloud storage is needed.
            return {
                url: 'data:' + file.mimetype + ';base64,' + file.buffer.toString('base64'),
                filename: file.originalname,
                note: "Stored in memory (Base64) because of Vercel read-only filesystem"
            };
        }

        return {
            url: `/uploads/${file.filename}`,
            filename: file.filename,
        };
    }
}
