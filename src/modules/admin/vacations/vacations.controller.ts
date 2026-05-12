import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { VacationsService } from './vacations.service';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { AuthGuard } from './../../auth/auth.guard';
//import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)


@ApiBearerAuth()
@UseGuards(AuthGuard)   // Este decorador hace que se habiliten los guardias de las autorizaciones.
@Controller('vacations')
export class VacationsController {
  constructor(private readonly vacationsService: VacationsService) {}

  @Post()
  create(@Body() createVacationDto: CreateVacationDto) {
    return this.vacationsService.create(createVacationDto);
  }

  @Get()
  findAll() {
    return this.vacationsService.findAll();
  }
/*
  @Get('mis-vacaciones') // O simplemente @Get() si es el único GET
  @UseGuards(JwtAuthGuard) 
  findAllByUser(@Req() req) {
    console.log("Usuario decodificado del JWT:", req.user);
    // req.user.userId debe existir en tu Payload del JWT
    return this.vacationsService.findAllByUserId(req.user.userId); 
}
*/


  @Get(':userId')
  @ApiOperation({ 
    summary: 'Busca un userId específico',
    description: 'Devuelve todos los valores coincidentes con el userId'
  })
  findAllByUserId(@Param('userId') userId: string) {
  return this.vacationsService.findAllByUserId(userId); // 
  }





 /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateVacationDto: UpdateVacationDto) {
    return this.vacationsService.update(+id, updateVacationDto);
  }*/


  @Delete('all')
  @ApiOperation({ 
    summary: 'Borra todos los registros y reinicia el ID',
    description: 'Ejecuta un TRUNCATE en Postgres para vaciar la tabla y resetear el contador identity a 1.' 
  })
  @ApiResponse({ status: 200, description: 'Tabla reseteada con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async borrarTodo() {
    return await this.vacationsService.clearAndResetTable();
  }


 // @Delete('user/:userId')
  @Delete(':userId')
  @ApiOperation({ summary: 'Borra todos los detalles de vaciones de un userId específico'})
  remove(@Param('userId') userId: string) {
    return this.vacationsService.remove(userId);
  }

/*  @Delete('all/danger')
  @ApiOperation({summary: 'Borra TODOS los registros de la tabla Vacaciones, proceder con PRECAUCION'})
  async removeAll(){
    return await this.vacationsService.removeAll();
  }
*/


}
