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

        response.status(status).json({
            statusCode: status,
            message: "ERREUR DÉTAILLÉE",
            errorName: exception.name,
            errorMessage: exception.message,
            prismaError: exception.code, // Pour voir les erreurs Prisma (ex: P2002)
            stack: process.env.NODE_ENV === 'development' ? undefined : 'Check Vercel Logs'
        });
    }
}
