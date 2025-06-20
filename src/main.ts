import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common/pipes';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/QueryFailedError';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
  }))

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(
      Reflector
    ))
  )

  app.useGlobalFilters(
    new GlobalExceptionFilter
  )

  const config = new DocumentBuilder()
    .setTitle('Platzi Store')
    .setDescription('Platzi Store API for learning nestjs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();

  await app.listen(process.env.PORT || 8081);
}
bootstrap();
