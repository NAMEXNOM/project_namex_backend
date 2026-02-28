import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
