import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../modules/admin/users/users.service';  
import { JwtService } from '@nestjs/jwt'; 

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService 
  ) {}

  async login(body: any) {
    const { userRFC, password } = body;

    if (!userRFC || !password) {
      throw new UnauthorizedException('RFC y contraseña son requeridos');
    }

    const user = await this.usersService.findOneByRfc(userRFC);

    // 🚨 CONTROL HERMÉTICO: Verificamos que 'user' exista, tenga una propiedad password real 
    // y que coincida exactamente con lo enviado por el usuario.
    if (!user || !user.password || user.password !== password) {
      throw new UnauthorizedException('RFC o contraseña incorrectos'); 
    }

    const nombreCompleto = `${user.name || ''} ${user.firstLastName || ''} ${user.secondLastName || ''}`.trim();
    const nombreRol = user.roles?.[0]?.name || 'sin-rol';
  
    // 🚨 CORRECCIÓN: Usar 'user.id' que es el estándar de TypeORM, o verifica si tu entidad usa 'userId'
    const payload = { sub: user.userId, rfc: user.userRFC };

    return {
      userId:  user.userId, // Sincronizado
      userName: nombreCompleto,
      role: nombreRol,
      userBalance: user.vacationBalance || 0, 
      access_token: await this.jwtService.signAsync(payload)  
    };
  }
}
