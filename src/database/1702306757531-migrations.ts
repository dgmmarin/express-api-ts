import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1702306757531 implements MigrationInterface {
    name = 'Migrations1702306757531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`name2\` varchar(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name2\``);
    }

}
