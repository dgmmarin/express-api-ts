import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnsToTables1700750554786 implements MigrationInterface {
    name = 'AddColumnsToTables1700750554786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD \`isReady\` tinyint NULL AFTER \`price\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD \`status\` varchar(255) NULL AFTER \`isReady\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP COLUMN \`isReady\``);
    }

}
