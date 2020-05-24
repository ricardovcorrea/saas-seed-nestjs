import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { DTOCustomer } from './customer.dto';
import slugify from 'slugify';
import * as crypto from 'crypto';

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

        const slug = slugify(name.toLowerCase(), '_');
        const secretKey = await this.generateSecretKey();

        const newCustomer = this.customerRepository.create({
            name,
            slug,
            secretKey
        });

        const databaseName = `${process.env.DB_MAIN_DATABASE}_${slug}`;
        const [createdCustomer] = await Promise.all([this.customerRepository.save(newCustomer), this.customerRepository.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`)]);

        return new DTOCustomer(createdCustomer);
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
