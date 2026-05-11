import { Module } from '@nestjs/common';
import { VacationsService } from './vacations.service';
import { VacationsController } from './vacations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacation } from './entities/vacation.entity';
import { AuthModule } from '../../../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vacation]),
    AuthModule,
    ],
  controllers: [VacationsController],
  providers: [VacationsService],
})
export class VacationsModule {}
