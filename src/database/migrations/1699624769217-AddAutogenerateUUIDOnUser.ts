import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAutogenerateUUIDOnUser1699624769217 implements MigrationInterface {
    name = 'AddAutogenerateUUIDOnUser1699624769217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles\` ADD \`uuid\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD \`uuid\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`uuid\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`uuid\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`uuid\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`uuid\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`uuid\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`uuid\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`uuid\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`uuid\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`uuid\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`uuid\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`uuid\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`uuid\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP COLUMN \`uuid\``);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`uuid\``);
    }

}
