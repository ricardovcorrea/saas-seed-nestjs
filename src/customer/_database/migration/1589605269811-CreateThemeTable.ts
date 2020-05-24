import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateThemeTable1589605269811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "theme",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: "primary",
                    type: "varchar"
                },
                {
                    name: "secondary",
                    type: "varchar"
                },
                {
                    name: "isActive",
                    type: "tinyint(1)",
                    default: false
                }
            ]
        }), true);

        await queryRunner.manager.createQueryBuilder().insert().into('theme').values({ id: "a624b05d-a7fb-480d-b12b-8fb5b9f08569", primary: "#f3f3f3", secondary: "#f1f1f1", isActive: true }).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("theme");
    }

}
