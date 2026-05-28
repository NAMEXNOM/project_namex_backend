import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // <-- 1. Importa esto
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

// Elimiamos la linea vieja de require('dotenv')

@Module({
  imports: [
    // <-- 2. Colócalo SIEMPRE como el primer elemento de los imports
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el .env esté disponible en AuthModule y la DB sin importarlo de nuevo
    }),

    // Configuración de la DB AWS (ahora leerá los process.env de forma segura)
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Configuration,
        User,
        Permission,
        Role,
        Vacation,
      ],
      synchronize: false,
      ssl: {
        rejectUnauthorized: false
      }
    }),

    ConfigurationModule,
    UsersModule,
    AuthModule, // <-- Ahora este módulo recibirá correctamente las variables de IONOS
    PermissionsModule,
    RolesModule,
    VacationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
