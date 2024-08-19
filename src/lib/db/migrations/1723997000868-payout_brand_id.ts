import { MigrationInterface, QueryRunner } from "typeorm";

export class PayoutBrandId1723997000868 implements MigrationInterface {
    name = 'PayoutBrandId1723997000868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payouts" ADD "transaction_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payouts" DROP CONSTRAINT "FK_5c91c5e0b8561e208fccfb87991"`);
        await queryRunner.query(`ALTER TABLE "payouts" ALTER COLUMN "brand_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payouts" ADD CONSTRAINT "FK_5c91c5e0b8561e208fccfb87991" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payouts" DROP CONSTRAINT "FK_5c91c5e0b8561e208fccfb87991"`);
        await queryRunner.query(`ALTER TABLE "payouts" ALTER COLUMN "brand_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payouts" ADD CONSTRAINT "FK_5c91c5e0b8561e208fccfb87991" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payouts" DROP COLUMN "transaction_id"`);
    }

}
