import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT: number = Number(process.env.PORT) || 5000;

  const CLIENT_URL: string =
    (process.env.CLIENT_URL as string) || 'http://localhost:3000';

  const app: INestApplication = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/enshi_api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  });

  await app.listen(PORT, () => {
    console.log(`APP running, port - ${PORT}`);
  });
}
bootstrap();
