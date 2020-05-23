import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerProvider } from './customer.provider';

@Module({
  imports: [],
  providers: [CustomerService, CustomerProvider],
  controllers: [CustomerController]
})
export class CustomerModule { }
