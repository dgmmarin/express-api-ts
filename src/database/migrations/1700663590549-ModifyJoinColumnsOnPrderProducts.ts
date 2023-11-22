import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyJoinColumnsOnPrderProducts1700663590549 implements MigrationInterface {
    name = 'ModifyJoinColumnsOnPrderProducts1700663590549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP FOREIGN KEY \`FK_2d58e8bd11dc840b39f99824d84\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP FOREIGN KEY \`FK_f258ce2f670b34b38630914cf9e\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP COLUMN \`order_id\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP COLUMN \`product_id\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` CHANGE \`price\` \`price\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD CONSTRAINT \`FK_28b66449cf7cd76444378ad4e92\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD CONSTRAINT \`FK_27ca18f2453639a1cafb7404ece\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP FOREIGN KEY \`FK_27ca18f2453639a1cafb7404ece\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP FOREIGN KEY \`FK_28b66449cf7cd76444378ad4e92\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` CHANGE \`price\` \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD \`product_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD \`order_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD CONSTRAINT \`FK_f258ce2f670b34b38630914cf9e\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD CONSTRAINT \`FK_2d58e8bd11dc840b39f99824d84\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
