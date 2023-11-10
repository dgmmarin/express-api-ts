import { MigrationInterface, QueryRunner } from "typeorm";

export class LinkOrdersToOrderProducts21699630443760 implements MigrationInterface {
    name = 'LinkOrdersToOrderProducts21699630443760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP FOREIGN KEY \`FK_925362f8f16310d3bec19040eea\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP COLUMN \`orderOrderId\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP COLUMN \`orderProductId\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD \`order_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD \`product_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD CONSTRAINT \`FK_f258ce2f670b34b38630914cf9e\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD CONSTRAINT \`FK_2d58e8bd11dc840b39f99824d84\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP FOREIGN KEY \`FK_2d58e8bd11dc840b39f99824d84\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP FOREIGN KEY \`FK_f258ce2f670b34b38630914cf9e\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP COLUMN \`product_id\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP COLUMN \`order_id\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD \`orderProductId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD \`orderOrderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD CONSTRAINT \`FK_925362f8f16310d3bec19040eea\` FOREIGN KEY (\`orderId\`, \`orderOrderId\`, \`orderProductId\`) REFERENCES \`order_products\`(\`id\`,\`orderId\`,\`productId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
