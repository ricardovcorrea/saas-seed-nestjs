import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1589605269811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: "email",
                    type: "varchar"
                },
                {
                    name: "password",
                    type: "varchar"
                },
            ]
        }), true);

        await queryRunner.manager.createQueryBuilder().insert().into('user').values({ id: "a624b05d-a7fb-5842-b12b-8fb5b9f06963", email: "admin@saas.com", password: "$2b$12$62r9abT1dOVhv96nLcnAOOn6jPxlTAgoNf0.gdqz86ZLLTqghkTji" }).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("user");
    }

}
