import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() signInDto: Record<string, any>) {
        console.log(`Tentative de connexion pour : ${signInDto.email}`);
        const user = await this.authService.validateUser(signInDto.email, signInDto.password);
        if (!user) {
            console.warn(`Échec de connexion pour : ${signInDto.email}`);
            throw new UnauthorizedException('Invalid credentials');
        }
        console.log(`Connexion réussie pour : ${signInDto.email}`);
        return this.authService.login(user);
    }

}
