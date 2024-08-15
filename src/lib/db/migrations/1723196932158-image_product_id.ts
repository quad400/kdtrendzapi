import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageProductId1723196932158 implements MigrationInterface {
    name = 'ImageProductId1723196932158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_7af50639264735c79e918af6089"`);
        await queryRunner.query(`ALTER TABLE "images" RENAME COLUMN "productId" TO "product_id"`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "product_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_96fabbb1202770b8e6a58bf6f1d" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_96fabbb1202770b8e6a58bf6f1d"`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "product_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" RENAME COLUMN "product_id" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_7af50639264735c79e918af6089" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
