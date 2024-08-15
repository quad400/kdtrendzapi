import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageEntityId1723276851054 implements MigrationInterface {
    name = 'ImageEntityId1723276851054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id")`);
    }

}
