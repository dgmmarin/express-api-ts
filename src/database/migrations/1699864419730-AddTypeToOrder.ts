import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTypeToOrder1699864419730 implements MigrationInterface {
    name = 'AddTypeToOrder1699864419730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`type\` varchar(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`type\``);
    }

}
