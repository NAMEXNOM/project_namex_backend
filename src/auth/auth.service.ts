import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../modules/admin/users/users.service';  
import { JwtService } from '@nestjs/jwt'; 
import { MailerService } from '@nestjs-modules/mailer'; // Importar el servicio de correos
import * as crypto from 'crypto'; // Librería nativa de Node para generar texto aleatorio

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService // 1. Inyectamos el servicio de correos
  ) {}

  async login(body: any) {
    const { userRFC, password } = body;

    if (!userRFC || !password) {
      throw new UnauthorizedException('RFC y contraseña son requeridos');
    }

    const user = await this.usersService.findOneByRfc(userRFC);

    if (!user || !user.password || user.password !== password) {
      throw new UnauthorizedException('RFC o contraseña incorrectos'); 
    }

    const nombreCompleto = `${user.name || ''} ${user.firstLastName || ''} ${user.secondLastName || ''}`.trim();
    const nombreRol = user.roles?.[0]?.name || 'sin-rol';
  
    // Agregamos el rol y estado al payload del token por seguridad
    const payload = { sub: user.userId, rfc: user.userRFC, role: nombreRol };

    return {
      userId:  user.userId, 
      userName: nombreCompleto,
      role: nombreRol,
      userBalance: user.vacationBalance || 0,
      // 🚨 ENVIAMOS ESTOS CAMPOS PARA QUE EL FRONTEND SEPA SI DEBE FORZAR EL CAMBIO DE CLAVE
      firstTimeLoad: user.firstTimeLoad, 
      status: user.status,
      access_token: await this.jwtService.signAsync(payload)  
    };
  }

  // 2. NUEVO MÉTODO: Genera la contraseña temporal y envía el correo electrónico
  async sendTemporaryPassword(body: any) {
    const { userRFC, email } = body;

    if (!userRFC || !email) {
      throw new UnauthorizedException('RFC y correo electrónico son requeridos');
    }

    // Buscar al usuario por RFC y correo en la DB
    const user = await this.usersService.findByRfcAndEmail(userRFC, email);

    if (!user) {
      throw new NotFoundException('Los datos ingresados no coinciden con nuestros registros');
    }

    // Generar una contraseña temporal aleatoria de 8 caracteres en mayúsculas
    const tempPassword = crypto.randomBytes(4).toString('hex').toUpperCase(); 

    // Guardar la contraseña temporal y activar las banderas en la base de datos
    await this.usersService.setTemporaryPassword(user.userId, tempPassword);

    // Enviar el correo electrónico al usuario
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Tu contraseña temporal de acceso',
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 500px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #2c3e50; text-align: center;">Hola, ${user.name}</h2>
            <p>Se ha solicitado una contraseña temporal para tu cuenta debido a un olvido o por ser tu primer inicio de sesión.</p>
            <p>Tu contraseña provisoria es:</p>
            <div style="background: #f4f6f7; padding: 15px; font-size: 24px; font-weight: bold; letter-spacing: 3px; text-align: center; border-radius: 5px; color: #2c3e50; margin: 20px 0;">
              ${tempPassword}
            </div>
            <p style="color: #e74c3c; font-weight: bold;">Importante: Por motivos de seguridad, el sistema te obligará a cambiar esta contraseña inmediatamente después de ingresar.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <small style="color: #7f8c8d; display: block; text-align: center;">Si tú no solicitaste este proceso, ignora este correo o contacta a soporte.</small>
          </div>
        `,
      });
    } catch (mailError) {
      // Si el correo falla, lanzamos un error interno para no confundir al cliente externo
      throw new Error('Error al enviar el correo electrónico de recuperación.');
    }

    return { 
      message: 'Se ha enviado una contraseña temporal a tu correo electrónico registrado.' 
    };
  }

  async changePasswordDefinitivo(body: any) {
    const { userId, password } = body;

    if (!userId || !password) {
      throw new UnauthorizedException('El identificador de usuario y la contraseña son requeridos');
    }

    // Llamamos al método del servicio de usuarios que encripta con bcrypt y cambia a estatus 'ACTIVO'
    await this.usersService.updateToFinalPassword(userId, password);

    return {
      message: 'Tu contraseña definitiva ha sido guardada con éxito.'
    };
  }

}


//

/*import { Injectable, UnauthorizedException } from '@nestjs/common';
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
  */
