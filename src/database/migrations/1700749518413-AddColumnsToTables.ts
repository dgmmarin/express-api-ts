import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnsToTables1700749518413 implements MigrationInterface {
    name = 'AddColumnsToTables1700749518413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD \`description\` varchar(255) NULL AFTER \`price\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`price\` int NOT NULL DEFAULT '0'  AFTER \`name\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP COLUMN \`description\``);
    }
}