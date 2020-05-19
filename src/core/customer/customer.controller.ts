import { Controller, Inject, Get, Post, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get()
    async findAll() {
        return this.customerService.customerList();
    }

    @Post()
    async create(@Body('name') name) {
        return this.customerService.create(name);
    }
}
