import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('core/customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAll() {
        return this.customerService.customerList();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body('name') name) {
        return this.customerService.create(name);
    }

    @Get('secretKey')
    @UseGuards(JwtAuthGuard)
    async getSecretKey(@Query('customerId') customerId: string) {
        const secretKey = await this.customerService.getSecretKey(customerId);
        return { secretKey };
    }

    @Get('secretKey/reset')
    @UseGuards(JwtAuthGuard)
    async resetSecretKey(@Query('customerId') customerId: string) {
        const secretKey = await this.customerService.resetSecretKey(customerId);
        return { secretKey };
    }

}
