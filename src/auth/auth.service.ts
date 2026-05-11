import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../modules/admin/users/users.service';  // Asegúrate de que la ruta sea correcta

@Injectable()
export class AuthService {
  // Inyectamos el servicio de usuarios que ya tiene conexión a la DB
  constructor(private usersService: UsersService) {}

  // backend/src/auth/auth.service.ts
async login(body: any) {
  const { userRFC, password } = body;

  const user = await this.usersService.findOneByRfc(userRFC);

  if (user && user.password === password) {
    // 1. Unimos las 3 partes del nombre
    const nombreCompleto = `${user.name} ${user.firstLastName} ${user.secondLastName}`.trim();

    // 2. Obtenemos el nombre del rol (asumiendo que un usuario tiene un rol principal)
    // Si 'roles' es un array, tomamos el primero; si es un objeto, directo.
    const nombreRol = user.roles?.[0]?.name || 'sin-rol'; 

    return {
      userName: nombreCompleto, // React verá "Juan Perez Lopez"
      role: nombreRol,          // React verá "admin"
      token: 'tu-token-jwt-real'
    };
  }

  throw new UnauthorizedException('RFC o contraseña incorrectos');
}

}
