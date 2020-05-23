import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCustomerTable1589605269811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "customer",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "secretKey",
                    type: "varchar",
                    isGenerated: true,
                    generationStrategy: 'uuid'
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("customer");
    }

}
