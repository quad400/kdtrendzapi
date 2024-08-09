import { MigrationInterface, QueryRunner } from "typeorm";

export class VerificationCodeAndExpires1722942163384 implements MigrationInterface {
    name = 'VerificationCodeAndExpires1722942163384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "verification_code" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "verification_code_expires" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verification_code_expires"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verification_code"`);
    }

}
