import { MigrationInterface, QueryRunner } from "typeorm";

export class BrandAvatarNunnable1723102186716 implements MigrationInterface {
    name = 'BrandAvatarNunnable1723102186716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" ALTER COLUMN "avatar" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" ALTER COLUMN "avatar" SET NOT NULL`);
    }

}
