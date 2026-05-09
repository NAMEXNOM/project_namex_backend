import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from './modules/admin/configuration/configuration.module';
import { Configuration } from './modules/admin/configuration/entities/configuration.entity';
import { UsersModule } from './modules/admin/users/users.module';
import { User } from './modules/admin/users/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { PermissionsModule } from './modules/admin/permissions/permissions.module';
import { RolesModule } from './modules/admin/roles/roles.module';
import { Permission } from './modules/admin/permissions/entities/permission.entity';
import { Role } from './modules/admin/roles/entities/role.entity';
import { VacationsModule } from './modules/admin/vacations/vacations.module';
import { Vacation } from './modules/admin/vacations/entities/vacation.entity';
//import { AuthModule } from './auth/auth.module';

require('dotenv').config();

@Module({
  imports: [

  // add db  02-28-26 de nesjs techniques-database
  /*TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '123456',
      database: 'portaldb',
      entities: [
        Configuration
      ],
      synchronize: true,
    }),

  ConfigurationModule, */
// fin  add db  02-28-26 de nesjs techniques-database

// db aws
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [  //necesario para generar las tablas automaticamente RAP ****************************
        Configuration,
        User,
        Permission,
        Role,
        Vacation,
      ],
      synchronize: false,
      ssl: {
        rejectUnauthorized: false // Requerido para conectar a AWS RDS con certificados autofirmados
  }
    }),


    ConfigurationModule,


    UsersModule,


    AuthModule,


    PermissionsModule,


    RolesModule,


    VacationsModule
// db aws


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
