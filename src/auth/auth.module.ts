// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy'; // Importa tu estrategia
import { UsersModule } from '../modules/admin/users/users.module'; // 1. Importa el módulo de usuarios

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Configura el default
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy], // <-- ¡ESTO ES VITAL!
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}