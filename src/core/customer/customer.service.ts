import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
    constructor(@Inject('CUSTOMER_REPOSITORY') private customerRepository: Repository<Customer>) { }

    async customerList(): Promise<Customer[]> {
        return this.customerRepository.find();
    }

    async create(name: string): Promise<Customer> {
        const baseId = Date.now().toString();
        const id = Number.parseInt(baseId.slice(baseId.length - 4, baseId.length));

        const newCustomer = this.customerRepository.create({
            id,
            name
        });

        const [createdCustomer] = await Promise.all([this.customerRepository.save(newCustomer), this.customerRepository.query(`create database ${process.env.DB_MAIN_DATABASE}_${name}`)]);

        return createdCustomer;
    }
}
