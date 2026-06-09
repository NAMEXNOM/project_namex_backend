import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
//import { AuthGuard } from '@nestjs/passport';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';


@Controller('attendances')
@UseGuards(JwtAuthGuard)
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  
  @Get('user')
  async getRecentByUser(@Req() req: any) {

    // Extraemos el sub (ID de usuario) o el id que guarda tu estrategia JWT en la petición
    const userId = req.user.userId || req.user.id || req.user.sub;
    return this.attendancesService.findRecentByUser(userId);
  }
}
