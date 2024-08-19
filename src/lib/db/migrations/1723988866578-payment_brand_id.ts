import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentBrandId1723988866578 implements MigrationInterface {
    name = 'PaymentBrandId1723988866578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payments_status_enum" AS ENUM('PENDING', 'COMPLETED', 'FAILED', 'CASHOUT')`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "status" "public"."payments_status_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
    }

}
