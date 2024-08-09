import { MigrationInterface, QueryRunner } from "typeorm";

export class IsAccountBlocked1722996316990 implements MigrationInterface {
    name = 'IsAccountBlocked1722996316990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "is_account_blocked" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_account_blocked"`);
    }

}
