import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

// class validator de nestjs.doc  2-Marzo-2026 RAP
  app.useGlobalPipes(new ValidationPipe({
     whitelist: true, //solo pasan los datos configurdos en DTO
     forbidNonWhitelisted: true // avisa cuales datos no deben de ir
  }));

// Fin de class validator nestjs.doc 2-Marzo-2026 RAP
  
  // Swagger  se copi de nesjs.doc  openapi  02-28-26  AHR SWAGGER

 const config = new DocumentBuilder()
    .setTitle('backend api')
    .setDescription('Backend api portal')
    .setVersion('1.0')
    .addTag('node')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  // FIN DE Swagger.  02-28-26
  // FIN DE Swagger 02-28-26
  
   // class validator 03-02-26
  app.useGlobalPipes(new ValidationPipe());

   // fin class validaor 03-02-26

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
