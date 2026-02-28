import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [

  // add db  02-28-26 de nesjs techniques-database
  TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '123456',
      database: 'portaldb',
      entities: [],
      synchronize: true,
    }),
// fin  add db  02-28-26 de nesjs techniques-database


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
