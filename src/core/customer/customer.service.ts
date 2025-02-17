import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { DTOCustomer } from './customer.dto';
import slugify from 'slugify';
import * as crypto from 'crypto';
import { CrudService } from '../../shared/crud/crud.service';

@Injectable()
export class CustomerService extends CrudService<DTOCustomer> {

    constructor(@Inject('CUSTOMER_REPOSITORY') private customerRepository: Repository<Customer>) {
        super(customerRepository, DTOCustomer);
    }

    async create(customer: DTOCustomer): Promise<DTOCustomer> {
        const existingCustomer = await this.customerRepository.findOne({ name: customer.name });
        if (existingCustomer) {
            throw new BadRequestException('A customer with this name already exists!');
        }

        const slug = slugify(customer.name.toLowerCase(), '_');
        const secretKey = await this.generateSecretKey();

        const newCustomer = this.customerRepository.create({
            name: customer.name,
            slug,
            secretKey
        });

        const [createdCustomer] = await Promise.all([this.customerRepository.save(newCustomer), this.customerRepository.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_MAIN_DATABASE}_${slug}`)]);

        return new DTOCustomer(createdCustomer);
    }

    async getSecretKey(customerId: string): Promise<string> {
        const customer = await this.customerRepository.findOne({ id: customerId });
        if (!customer) {
            throw new NotFoundException('Customer not found!');
        }

        return customer.secretKey;
    }

    async resetSecretKey(customerId: string): Promise<string> {
        const customer = await this.customerRepository.findOne({ id: customerId });
        if (!customer) {
            throw new NotFoundException('Customer not found!');
        }

        customer.secretKey = await this.generateSecretKey();

        await this.customerRepository.save(customer);

        return customer.secretKey;
    }

    async generateSecretKey(): Promise<string> {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(32, (err, buffer) => {
                if (err) {
                    reject(err);
                }

                resolve(buffer.toString('hex'));
            })
        });
    }
}
