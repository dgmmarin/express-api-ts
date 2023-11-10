import { MigrationInterface, QueryRunner } from "typeorm";

export class LinkOrdersToOrderProducts1699630111026 implements MigrationInterface {
    name = 'LinkOrdersToOrderProducts1699630111026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD \`orderOrderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD \`orderProductId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD CONSTRAINT \`FK_925362f8f16310d3bec19040eea\` FOREIGN KEY (\`orderId\`, \`orderOrderId\`, \`orderProductId\`) REFERENCES \`order_products\`(\`id\`,\`orderId\`,\`productId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP FOREIGN KEY \`FK_925362f8f16310d3bec19040eea\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP COLUMN \`orderProductId\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP COLUMN \`orderOrderId\``);
    }

}
