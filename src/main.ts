import * as Sentry from '@sentry/node';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const port = Number.parseInt(configService.get('PORT')) || 3000;
  
  const sentryDSN = configService.get('SENTRY_DSN');
  Sentry.init({ dsn: sentryDSN });

  await app.listen(port);
}
bootstrap();
