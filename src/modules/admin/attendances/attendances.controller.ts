/*
import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
//import { AuthGuard } from '@nestjs/passport';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger/dist';


@ApiBearerAuth()
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
*/

import { Controller, Get, Post, Delete, Body, Req, UseGuards, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@ApiBearerAuth()
@Controller('attendances')
@UseGuards(JwtAuthGuard)
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Get('user')
  @ApiOperation({ summary: 'Obtener las asistencias recientes del usuario autenticado' })
  async getRecentByUser(@Req() req: any) {
    const userId = req.user.userId || req.user.id || req.user.sub;
    return this.attendancesService.findRecentByUser(userId);
  }

    @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Insertar un registro de asistencia completo desde sistema externo' })
  @ApiResponse({ status: 201, description: 'Asistencia insertada con éxito.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return await this.attendancesService.createAttendanceCompleto(createAttendanceDto);
  }


  // 2. 🟢 NUEVO - MÉTODO DELETE: Eliminar un registro de asistencia por ID (Ej: para Administradores)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un registro de asistencia específico' })
  @ApiResponse({ status: 200, description: 'Registro de asistencia eliminado con éxito.' })
  @ApiResponse({ status: 404, description: 'El registro de asistencia no existe.' })
  async remove(@Param('id') id: string) { // Cambia a 'number' si tus IDs en la DB son autoincrementables
    return await this.attendancesService.deleteAttendance(id);
  }
}
