import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, CustomerModule, UserModule],
  controllers: [],
})
export class CoreModule { }
