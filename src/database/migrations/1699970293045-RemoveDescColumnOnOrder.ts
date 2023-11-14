import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDescColumnOnOrder1699970293045 implements MigrationInterface {
    name = 'RemoveDescColumnOnOrder1699970293045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`desc\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`desc\` varchar(100) NOT NULL`);
    }

}
