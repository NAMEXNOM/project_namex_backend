import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(body: any) {
    const { email, password } = body;

    // Simulación de validación (Luego lo conectas a tu DB)
    if (email === 'admin@admin.com' && password === '123456') {
      return {
        userName: 'Usuario Administrador',
        token: 'token-falso-de-prueba', // Después configuraremos JWT real
        role: 'admin'
      };
    }

    throw new UnauthorizedException('Credenciales incorrectas');
  }
}