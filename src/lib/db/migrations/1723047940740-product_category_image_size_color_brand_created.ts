import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCategoryImageSizeColorBrandCreated1723047940740 implements MigrationInterface {
    name = 'ProductCategoryImageSizeColorBrandCreated1723047940740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "mpath" character varying DEFAULT '', "parentId" uuid, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "productId" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "colors" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sizes" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_09ffc681886e25eb5ce3b319fab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "previous_price" numeric(10,2) NOT NULL DEFAULT '0', "stock" integer NOT NULL, "categoryId" uuid, "brandId" uuid, CONSTRAINT "UQ_c30f00a871de74c8e8c213acc4a" UNIQUE ("title"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brands" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "avatar" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name"), CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_colors_colors" ("productsId" uuid NOT NULL, "colorsId" integer NOT NULL, CONSTRAINT "PK_4a65be4f135cf89ed96ff568d24" PRIMARY KEY ("productsId", "colorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6fb2fb028d941cdf524c915f90" ON "products_colors_colors" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c2d8b6cd911f827638d49486e5" ON "products_colors_colors" ("colorsId") `);
        await queryRunner.query(`CREATE TABLE "products_sizes_sizes" ("productsId" uuid NOT NULL, "sizesId" integer NOT NULL, CONSTRAINT "PK_20480f058320e42168b1916b130" PRIMARY KEY ("productsId", "sizesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0801efda070836503c4d2fe861" ON "products_sizes_sizes" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ed24d3dcac72d9085e194354b4" ON "products_sizes_sizes" ("sizesId") `);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_7af50639264735c79e918af6089" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" ADD CONSTRAINT "FK_6fb2fb028d941cdf524c915f90c" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" ADD CONSTRAINT "FK_c2d8b6cd911f827638d49486e5e" FOREIGN KEY ("colorsId") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" ADD CONSTRAINT "FK_0801efda070836503c4d2fe8610" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" ADD CONSTRAINT "FK_ed24d3dcac72d9085e194354b4e" FOREIGN KEY ("sizesId") REFERENCES "sizes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" DROP CONSTRAINT "FK_ed24d3dcac72d9085e194354b4e"`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" DROP CONSTRAINT "FK_0801efda070836503c4d2fe8610"`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" DROP CONSTRAINT "FK_c2d8b6cd911f827638d49486e5e"`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" DROP CONSTRAINT "FK_6fb2fb028d941cdf524c915f90c"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_7af50639264735c79e918af6089"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed24d3dcac72d9085e194354b4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0801efda070836503c4d2fe861"`);
        await queryRunner.query(`DROP TABLE "products_sizes_sizes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c2d8b6cd911f827638d49486e5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6fb2fb028d941cdf524c915f90"`);
        await queryRunner.query(`DROP TABLE "products_colors_colors"`);
        await queryRunner.query(`DROP TABLE "brands"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "sizes"`);
        await queryRunner.query(`DROP TABLE "colors"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
