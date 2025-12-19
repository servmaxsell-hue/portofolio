import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'secretKey',
        });
    }

    async validate(payload: any) {
        console.log('JwtStrategy.validate - Payload:', payload);
        if (!payload) {
            console.error('JwtStrategy.validate - NO PAYLOAD');
            return null;
        }
        return { userId: payload.sub, email: payload.email };
    }
}
