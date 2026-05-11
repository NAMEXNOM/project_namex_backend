import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../admin/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
// Agregar Inyección de dependencias
// Se inyecta el UserService
constructor(private userService: UsersService, private jwtService: JwtService){
    
}

async login(credenciales: LoginAuthDto){  //el login va a recibir datos

    const  { userRFC, password } = credenciales;

    // ahora buscamos por userRFC
    const usuario = await this.userService.findOneByRfc(userRFC);
    if (!usuario){
        return new HttpException('Datos incorrectos', 404);
    }

    // verificacion de contraseña  3/19/2026 RAP
    const verificarPass = await compare(password, usuario.password);
    if (!verificarPass){
        throw new HttpException('Datos incorrectos', 401);
    }


    // IMPORTANTE JWT
    // generar JWT
    const payload = { userRFC: userRFC, empNumber: usuario.empNumber, userId: usuario.userId}

    const token = this.jwtService.sign(payload);

    return {
        access_token: token, 
        userEmail: usuario.email,
        userId: usuario.userId,
        userName: usuario.name + ' '+ usuario.firstLastName +' '+ usuario.secondLastName,
        userBalance: usuario.vacationBalance
    }
}


}
