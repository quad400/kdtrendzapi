import { MigrationInterface, QueryRunner } from "typeorm";

export class IsVerify1722950844663 implements MigrationInterface {
    name = 'IsVerify1722950844663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "is_verified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_verified"`);
    }

}
