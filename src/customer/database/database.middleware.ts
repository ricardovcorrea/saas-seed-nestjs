import { Injectable, NestMiddleware } from '@nestjs/common';
import { getConnection, createConnection, Connection } from "typeorm";

@Injectable()
export class DatabaseMiddleware implements NestMiddleware {

    async use(req: any, res: any, next: () => void) {
        const databaseName = req.headers['x-client'];

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

        if (!connection.connect) {
            await connection.connect();
        }

        await connection.runMigrations();

        next();
    }

}