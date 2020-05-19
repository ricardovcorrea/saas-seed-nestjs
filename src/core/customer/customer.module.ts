import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerProvider } from './customer.provider';
import { CoreDatabaseProvider } from '../database/database.provider';

@Module({
  imports: [],
  providers: [CoreDatabaseProvider, CustomerService, CustomerProvider],
  controllers: [CustomerController]
})
export class CustomerModule { }
