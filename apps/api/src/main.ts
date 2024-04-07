import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // ---------------for hbs--------------
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule, {
    snapshot: true,
  }
  );
  app.enableCors({
    origin: "*",
    optionsSuccessStatus: 200,
  });
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    whitelist: true
  }));


  const config = new DocumentBuilder()
    .setTitle('Todo example')
    .setDescription('The posts API description')
    .setVersion('1.0')
    .addTag('todos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(4048);
}
bootstrap();
