
import { Connection } from 'typeorm';
import { Customer } from './customer.entity';

export const CustomerProvider = {
    provide: 'CUSTOMER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Customer),
    inject: ['CORE_DATABASE_CONNECTION'],
}