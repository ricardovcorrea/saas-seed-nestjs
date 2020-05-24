import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateThemeTable1589605269811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "theme",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
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
                    type: "tinyint(1)"
                }
            ]
        }), true);

        await queryRunner.manager.createQueryBuilder().insert().into('theme').values({ id: "1", primary: "#f3f3f3", secondary: "#f1f1f1", isActive: true }).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("theme");
    }

}
