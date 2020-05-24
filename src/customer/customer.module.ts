import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DatabaseMiddleware } from './_database/database.middleware';
import { ThemeModule } from './theme/theme.module';

@Module({
  imports: [ThemeModule],
  providers: [],
  controllers: []
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DatabaseMiddleware).forRoutes('/customer/*');
  }
}