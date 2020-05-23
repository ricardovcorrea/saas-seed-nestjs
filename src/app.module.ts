
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { CoreModule } from './core/core.module';
import { RavenModule, RavenInterceptor } from 'nest-raven';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RavenModule, CoreModule, CustomerModule],
  controllers: [],
  providers: [{
    provide: APP_INTERCEPTOR,
    useValue: new RavenInterceptor(),
  }],
})
export class AppModule { }
