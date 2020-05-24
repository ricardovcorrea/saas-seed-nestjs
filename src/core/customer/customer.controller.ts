import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CrudController } from '../../shared/crud/crud.controller';
import { DTOCustomer } from './customer.dto';

@Controller('core/customer')
@UseGuards(JwtAuthGuard)
export class CustomerController extends CrudController<DTOCustomer> {
    constructor(private readonly customerService: CustomerService) {
        super(customerService);
    }

    @Get('secretKey')
    async getSecretKey(@Query('customerId') customerId: string) {
        const secretKey = await this.customerService.getSecretKey(customerId);
        return { secretKey };
    }

    @Get('secretKey/reset')
    async resetSecretKey(@Query('customerId') customerId: string) {
        const secretKey = await this.customerService.resetSecretKey(customerId);
        return { secretKey };
    }

}
