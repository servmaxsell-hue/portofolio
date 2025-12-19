import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class PublishAuthGuard extends AuthGuard('jwt') implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];

        // If API Key is provided, check it
        if (apiKey) {
            return apiKey === process.env.API_KEY_N8N;
        }

        // Otherwise fallback to JWT (for admin panel)
        try {
            const isJwtValid = await super.canActivate(context);
            return !!isJwtValid;
        } catch (e) {
            return false;
        }
    }
}
