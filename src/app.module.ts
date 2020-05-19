import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
