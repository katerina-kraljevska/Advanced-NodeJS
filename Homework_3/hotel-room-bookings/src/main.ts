import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        exposeUnsetFields: false,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Hotel room booking Api')
    .setDescription('Api for managing hotel room bookings')
    .setVersion('1.0')
    .addTag('hotel room bookings')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('/api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
