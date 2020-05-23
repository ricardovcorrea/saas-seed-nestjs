import { Module, Global } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CoreDatabaseProvider } from './_database/database.provider';

@Global()
@Module({
  imports: [AuthModule, CustomerModule, UserModule],
  providers: [CoreDatabaseProvider],
  controllers: [],
  exports: [CoreDatabaseProvider]
})
export class CoreModule { }
