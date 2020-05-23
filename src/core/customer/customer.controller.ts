import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('core/customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
        return this.customerService.customerList();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body('name') name) {
        return this.customerService.create(name);
    }
}
