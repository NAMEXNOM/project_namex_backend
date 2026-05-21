// src/auth/auth.module.ts
/*
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

*/ 

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../modules/admin/users/users.module'; 
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    // 1. Vinculación con tu base de datos de usuarios
    UsersModule, 

    // 2. Estrategia de seguridad por defecto
    PassportModule.register({ defaultStrategy: 'jwt' }), 

    // 3. Configuración del Token de seguridad
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'CLAVE_SECRETA_POR_DEFECTO',
      signOptions: { expiresIn: '1h' },
    }),

    // 4. Configuración del Servidor de correos leyendo tu archivo .env
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT || '465'),
        secure: true, 
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: process.env.MAIL_FROM || '"Soporte Sistema" <no-reply@tuempresa.com>',
      },
    }),
  ],
  controllers: [AuthController], 
  providers: [AuthService], // 🟢 Limpio: Quitamos JwtStrategy
  exports: [AuthService],   // 🟢 Limpio: Quitamos JwtStrategy
})
export class AuthModule {}
