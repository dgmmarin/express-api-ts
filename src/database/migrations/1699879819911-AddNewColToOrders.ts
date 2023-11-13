import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewColToOrders1699879819911 implements MigrationInterface {
    name = 'AddNewColToOrders1699879819911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`desc\` varchar(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`desc\``);
    }

}
