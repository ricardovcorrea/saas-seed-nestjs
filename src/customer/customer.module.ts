import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseMiddleware } from './_database/database.middleware';

@Module({
  imports: [ConfigurationModule],
  providers: [],
  controllers: []
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DatabaseMiddleware).forRoutes('/customer/*');
  }
}