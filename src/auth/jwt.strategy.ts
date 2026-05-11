// src/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extrae el token del header "Authorization: Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // DEBE ser la misma clave que usaste en el AuthModule
      secretOrKey: 'TU_CLAVE_SECRETA_SUPER_SEGURA', 
    });
  }

  async validate(payload: any) {
    // Lo que retornes aquí se inyectará en req.user
    // Asegúrate de que los nombres coincidan con tu JWT (ej: userId, userRFC)
    return { 
        userId: payload.userId, 
        userRFC: payload.userRFC 
    };
  }
}