import { config } from 'dotenv';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);
  const port = Number.parseInt(process.env.PORT) || 3000;

  await app.listen(port);
}
bootstrap();
