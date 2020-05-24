import { Injectable, NestMiddleware, NotFoundException, BadRequestException, Inject, UnauthorizedException } from '@nestjs/common';
import { getConnection, createConnection, Connection, Repository } from "typeorm";
import { Customer } from 'src/core/customer/customer.entity';

@Injectable()
export class DatabaseMiddleware implements NestMiddleware {

    constructor(@Inject('CUSTOMER_REPOSITORY') private customerRepository: Repository<Customer>) { }

    async use(req: any, res: any, next: () => void) {
        const customerId = req.headers['customer-id'];
        const secretKey = req.headers['secret-key'];

        if (!customerId || !secretKey) {
            throw new BadRequestException('customer-id and secret-key headers are required!');
        }

        const customer = await this.customerRepository.findOne({ id: customerId });

        if (!customer) {
            throw new NotFoundException('Customer not found!');
        }

        if (customer.secretKey != secretKey) {
            throw new UnauthorizedException('Invalid secret key');
        }

        req.customer = customer;

        let connection: Connection;

        try {
            connection = getConnection(customer.id.toString());
        } catch (error) {
            connection = await createConnection({
                name: customer.id.toString(),
                type: 'mysql',
                host: process.env.DB_HOST,
                port: Number.parseInt(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: `${process.env.DB_MAIN_DATABASE}_${customer.slug}`,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                migrations: [
                    __dirname + '/migration/*{.ts,.js}',
                ]
            });
        }

        if (!connection.isConnected) {
            await connection.connect();
        }

        await connection.runMigrations();

        next();
    }

}