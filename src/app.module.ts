import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from './modules/admin/configuration/configuration.module';
import { Configuration } from './modules/admin/configuration/entities/configuration.entity';

@Module({
  imports: [

  // add db  02-28-26 de nesjs techniques-database
  TypeOrmModule.forRoot({
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

  ConfigurationModule,
// fin  add db  02-28-26 de nesjs techniques-database

// db aws
    

// db aws


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
