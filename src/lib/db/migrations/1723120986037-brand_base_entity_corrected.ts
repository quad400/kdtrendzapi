import { MigrationInterface, QueryRunner } from "typeorm";

export class BrandBaseEntityCorrected1723120986037 implements MigrationInterface {
    name = 'BrandBaseEntityCorrected1723120986037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "created_at"`);
    }

}
