
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { CoreModule } from './core/core.module';
import { RavenModule, RavenInterceptor } from 'nest-raven';
import { CoreDatabaseProvider } from './core/_database/database.provider';
import { CustomerProvider } from './core/customer/customer.provider';

@Global()
@Module({
  imports: [ConfigModule, RavenModule, CoreModule, CustomerModule],
  exports: [CoreDatabaseProvider, CustomerProvider],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor(),
    },
    CoreDatabaseProvider,
    CustomerProvider
  ]
})
export class AppModule { }
