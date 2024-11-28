import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { corsConfig } from './shared/config/cors-config';

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors(corsConfig);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Bank Aplication')
    .setDescription('Aplication documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'swagger/docs',
  });

  const port = process.env.SERVER_PORT;
  console.log('Port: ', port);

  await app.listen(port, '0.0.0.0');

  console.log(`Api documentation running on http://localhost:${port}/docs`);
}
bootstrap();
