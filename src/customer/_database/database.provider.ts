import { REQUEST } from "@nestjs/core";
import { getManager } from 'typeorm';

export const CustomerDatabaseProvider = {
    provide: 'CUSTOMER_DATABASE_CONNECTION',
    useFactory: async (request: Request) => getManager(request['customer'].id),
    inject: [REQUEST]
}