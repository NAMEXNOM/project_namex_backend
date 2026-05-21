import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
  // Deja que el servicio responda directamente. 
  // Si el servicio lanza un error, NestJS lo enviará con su código HTTP correcto de forma automática.
  return await this.authService.login(body);
}

@Post('recover-password')
async recoverPassword(@Body() body: any) {
  // Llama al método que configuramos en tu auth.service
  return await this.authService.sendTemporaryPassword(body);
}


@Post('change-password')
async changePassword(@Body() body: any) {
  return await this.authService.changePasswordDefinitivo(body);
}

}