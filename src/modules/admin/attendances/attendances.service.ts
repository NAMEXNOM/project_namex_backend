import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    private readonly usersService: UsersService,
  ) {}

  async findRecentByUser(userId: string) {
    // 🚨 REPARADO DEFINITIVO: Usamos el nuevo método de búsqueda por ID
    const user = await this.usersService.findById(userId); 
    
    // 1. Obtenemos su día de inicio de pago asignado
    const startDay = user.startDayOfPayment || 1;
    const today = new Date();
    
    // Convertir día de JavaScript (0=Dom, 1=Lun) a nuestro estándar (1=Lun, 7=Dom)
    const currentDayOfWeek = today.getDay() === 0 ? 7 : today.getDay();

    // Calcular cuántos días restar para llegar al inicio del período actual
    let daysToSubtract = currentDayOfWeek - startDay;
    if (daysToSubtract < 0) {
      daysToSubtract += 7; 
    }

    // Fecha exacta del inicio del período de pago actual (Semana 1)
    const currentPeriodStart = new Date(today);
    currentPeriodStart.setDate(today.getDate() - daysToSubtract);
    currentPeriodStart.setHours(0, 0, 0, 0);

    // Para acumular 3 períodos completos, restamos 14 días adicionales hacia atrás
    const threeWeeksAgoStart = new Date(currentPeriodStart);
    threeWeeksAgoStart.setDate(currentPeriodStart.getDate() - 14);

    // La fecha de fin es el cierre del período actual (Inicio + 6 días)
    const currentPeriodEnd = new Date(currentPeriodStart);
    currentPeriodEnd.setDate(currentPeriodStart.getDate() + 6);
    currentPeriodEnd.setHours(23, 59, 59, 999);

    // Convertir a texto plano YYYY-MM-DD compatible con el campo DATE de Postgres
    const startDateStr = threeWeeksAgoStart.toISOString().split('T')[0];
    const endDateStr = currentPeriodEnd.toISOString().split('T')[0];

    // 2. Ejecutar consulta optimizada filtrando por el rango calculado
    const attendances = await this.attendanceRepository.find({
      where: {
        userId: userId,
        recDate: Between(startDateStr, endDateStr),
      },
      order: {
        recDate: 'ASC',
      },
    });

    // 3. Retornar los datos junto con la configuración para que el Front agrupe fácilmente
    return {
      userId,
      config: {
        startDayOfPayment: startDay,
        periodStartDate: startDateStr,
        periodEndDate: endDateStr,
      },
      attendances,
    };
  }
}
