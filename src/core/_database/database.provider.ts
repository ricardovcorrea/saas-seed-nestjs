import { createConnection, getConnection, Connection } from 'typeorm';

export const CoreDatabaseProvider = {
    provide: 'CORE_DATABASE_CONNECTION',
    useFactory: async () => {

        let connection: Connection;

        try {
            connection = getConnection();
        } catch (e) {
            connection = await createConnection({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: Number.parseInt(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_MAIN_DATABASE,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                migrations: [
                    __dirname + '/migration/*{.ts,.js}',
                ],
                synchronize: false
            });
        }

        if (!connection.isConnected) {
            await connection.connect();
        }

        await connection.runMigrations();

        return connection;
    },
};