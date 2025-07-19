import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // permite tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // si usas cookies o headers personalizados
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
