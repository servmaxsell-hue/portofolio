import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('upload')
export class UploadController {
    @Post('image')
    @UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage(),
        fileFilter: (req, file, cb) => {
            console.log('Incoming file upload:', file?.originalname, file?.mimetype);
            if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
                return cb(new BadRequestException('Seuls les fichiers images sont autorisés'), false);
            }
            cb(null, true);
        },
        limits: {
            fileSize: 10 * 1024 * 1024 // Increase to 10MB
        }
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            console.error('Upload failed: No file provided in the request');
            throw new BadRequestException('Aucun fichier téléchargé (champ attendu: "file")');
        }

        // Sur Vercel, on transforme l'image en Base64 pour la stocker dans MySQL
        const base64Data = file.buffer.toString('base64');
        const imageUrl = `data:${file.mimetype};base64,${base64Data}`;

        return {
            url: imageUrl
        };
    }
}
