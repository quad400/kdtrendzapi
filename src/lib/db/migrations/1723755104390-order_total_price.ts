import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderTotalPrice1723755104390 implements MigrationInterface {
    name = 'OrderTotalPrice1723755104390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "totalPrice" TO "total_price"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "total_price" TO "totalPrice"`);
    }

}
