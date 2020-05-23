import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { DTOCustomer } from './customer.dto';

@Injectable()
export class CustomerService {
    constructor(@Inject('CUSTOMER_REPOSITORY') private customerRepository: Repository<Customer>) { }

    async customerList(): Promise<DTOCustomer[]> {
        const foundCustomers = await this.customerRepository.find();
        return foundCustomers.map((customer) => new DTOCustomer(customer));
    }

    async create(name: string): Promise<DTOCustomer> {
        const existingCustomer = await this.customerRepository.findOne({ name });
        if (existingCustomer) {
            throw new BadRequestException('A customer with this name already exists!');
        }
        
        const newCustomer = this.customerRepository.create({
            name
        });

        const [createdCustomer] = await Promise.all([this.customerRepository.save(newCustomer), this.customerRepository.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_MAIN_DATABASE}_${name}`)]);

        return new DTOCustomer(createdCustomer);
    }
}
