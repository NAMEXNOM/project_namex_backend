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
}