import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './infra/exception/http-exception.filter';

export const createDocument = function (app) {
  const config = new DocumentBuilder()
    .setTitle('Favorite List API')
    .setDescription('Documentação dos endpoints')
    .setVersion(process.env.API_VERSION ?? '1.0.0')
    .addBasicAuth({ type: 'http' })
    .build();

  return SwaggerModule.createDocument(app, config, {
    include: [],
  });
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  const document = createDocument(app);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
