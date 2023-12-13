import { MigrationInterface, QueryRunner } from "typeorm";

export class Cccc451702306883897 implements MigrationInterface {
    name = 'Cccc451702306883897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name2\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name22\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`name22\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`name2\` varchar(100) NOT NULL`);
    }

}
