import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../admin/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    // Agregamos el modulo de JWT  03/15/2026 RAP
    JwtModule.register({   
      global: true,
      secret: jwtConstants.secret,    // texto que se va a usaro como codigo secreto
     // secret: 'MI_CODIGO_SECRETO',
      signOptions: { expiresIn: '60s' },
    }),


  ],   // se debe imprtar aqui el UsersModule para que pueda usarlo en la auth. 03/15/2026 RAP
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
