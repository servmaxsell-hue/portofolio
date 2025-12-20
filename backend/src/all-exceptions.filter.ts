import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        console.error('--- EXCEPTION DÉTECTÉE ---');
        console.error(exception);

        // On renvoie un objet très détaillé pour le débug
        response.status(status).json({
            statusCode: status,
            message: "ERREUR DÉTAILLÉE",
            errorDetails: {
                name: exception.name,
                message: exception.message,
                code: exception.code,
                // On vérifie juste si le lien commence bien (sans afficher le mot de passe)
                url_check: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 15) : 'MANQUANT'
            }
        });
    }
}
