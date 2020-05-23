import { Injectable, NestMiddleware, NotFoundException, BadRequestException } from '@nestjs/common';
import { getConnection, createConnection, Connection } from "typeorm";

@Injectable()
export class DatabaseMiddleware implements NestMiddleware {

    async use(req: any, res: any, next: () => void) {
        const customerId = req.headers['customer-id'];
        const secretKey = req.headers['secret-key'];

        if (!customerId || !secretKey) {
            throw new BadRequestException('customer-id and secret-key headers are required!');
        }

        const databaseName = "teste";

        let connection: Connection;

        try {
            connection = getConnection(databaseName);
        } catch (error) {
            connection = await createConnection({
                name: databaseName,
                type: 'mysql',
                host: process.env.DB_HOST,
                port: Number.parseInt(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: `${process.env.DB_MAIN_DATABASE}_${databaseName}`,
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