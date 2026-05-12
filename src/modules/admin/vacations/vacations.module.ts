// src/modules/admin/vacations/vacations.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- Asegúrate de importar esto
import { Vacation } from './entities/vacation.entity'; // <-- Tu entidad física
import { VacationsController } from './vacations.controller';
import { VacationsService } from './vacations.service';

@Module({
  imports: [
    // ESTA LÍNEA CONECTA LA ENTIDAD CON LA BASE DE DATOS
    TypeOrmModule.forFeature([Vacation]) 
  ],
  controllers: [VacationsController],
  providers: [VacationsService],
})
export class VacationsModule {}
