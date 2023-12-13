import { MigrationInterface, QueryRunner } from "typeorm";

export class Cccc1702306807129 implements MigrationInterface {
    name = 'Cccc1702306807129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`name2\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`name22\` varchar(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name22\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name2\``);
    }

}
