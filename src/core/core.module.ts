import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [CustomerModule],
  providers: [],
  controllers: [],
})
export class CoreModule { }
