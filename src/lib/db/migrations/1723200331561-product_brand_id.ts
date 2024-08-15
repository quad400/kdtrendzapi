import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductBrandId1723200331561 implements MigrationInterface {
    name = 'ProductBrandId1723200331561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "brandId" TO "brand_id"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "brand_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "brand_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "brand_id" TO "brandId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
