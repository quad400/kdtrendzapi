import { MigrationInterface, QueryRunner } from "typeorm";

export class ColorSizeUniquess1723171810299 implements MigrationInterface {
    name = 'ColorSizeUniquess1723171810299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_colors_colors" DROP CONSTRAINT "FK_c2d8b6cd911f827638d49486e5e"`);
        await queryRunner.query(`ALTER TABLE "colors" DROP CONSTRAINT "PK_3a62edc12d29307872ab1777ced"`);
        await queryRunner.query(`ALTER TABLE "colors" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "colors" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "colors" ADD CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "colors" ADD CONSTRAINT "UQ_cf12321fa0b7b9539e89c7dfeb7" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" DROP CONSTRAINT "FK_ed24d3dcac72d9085e194354b4e"`);
        await queryRunner.query(`ALTER TABLE "sizes" DROP CONSTRAINT "PK_09ffc681886e25eb5ce3b319fab"`);
        await queryRunner.query(`ALTER TABLE "sizes" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sizes" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "sizes" ADD CONSTRAINT "PK_09ffc681886e25eb5ce3b319fab" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "sizes" ADD CONSTRAINT "UQ_9fc6e663546e7a6cfdc465e86df" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" DROP CONSTRAINT "PK_4a65be4f135cf89ed96ff568d24"`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" ADD CONSTRAINT "PK_6fb2fb028d941cdf524c915f90c" PRIMARY KEY ("productsId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c2d8b6cd911f827638d49486e5"`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" DROP COLUMN "colorsId"`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" ADD "colorsId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" DROP CONSTRAINT "PK_6fb2fb028d941cdf524c915f90c"`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" ADD CONSTRAINT "PK_4a65be4f135cf89ed96ff568d24" PRIMARY KEY ("productsId", "colorsId")`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" DROP CONSTRAINT "PK_20480f058320e42168b1916b130"`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" ADD CONSTRAINT "PK_0801efda070836503c4d2fe8610" PRIMARY KEY ("productsId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed24d3dcac72d9085e194354b4"`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" DROP COLUMN "sizesId"`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" ADD "sizesId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" DROP CONSTRAINT "PK_0801efda070836503c4d2fe8610"`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" ADD CONSTRAINT "PK_20480f058320e42168b1916b130" PRIMARY KEY ("productsId", "sizesId")`);
        await queryRunner.query(`CREATE INDEX "IDX_c2d8b6cd911f827638d49486e5" ON "products_colors_colors" ("colorsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ed24d3dcac72d9085e194354b4" ON "products_sizes_sizes" ("sizesId") `);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" ADD CONSTRAINT "FK_c2d8b6cd911f827638d49486e5e" FOREIGN KEY ("colorsId") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" ADD CONSTRAINT "FK_ed24d3dcac72d9085e194354b4e" FOREIGN KEY ("sizesId") REFERENCES "sizes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" DROP CONSTRAINT "FK_ed24d3dcac72d9085e194354b4e"`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" DROP CONSTRAINT "FK_c2d8b6cd911f827638d49486e5e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed24d3dcac72d9085e194354b4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c2d8b6cd911f827638d49486e5"`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" DROP CONSTRAINT "PK_20480f058320e42168b1916b130"`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" ADD CONSTRAINT "PK_0801efda070836503c4d2fe8610" PRIMARY KEY ("productsId")`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" DROP COLUMN "sizesId"`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" ADD "sizesId" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_ed24d3dcac72d9085e194354b4" ON "products_sizes_sizes" ("sizesId") `);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" DROP CONSTRAINT "PK_0801efda070836503c4d2fe8610"`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" ADD CONSTRAINT "PK_20480f058320e42168b1916b130" PRIMARY KEY ("productsId", "sizesId")`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" DROP CONSTRAINT "PK_4a65be4f135cf89ed96ff568d24"`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" ADD CONSTRAINT "PK_6fb2fb028d941cdf524c915f90c" PRIMARY KEY ("productsId")`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" DROP COLUMN "colorsId"`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" ADD "colorsId" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_c2d8b6cd911f827638d49486e5" ON "products_colors_colors" ("colorsId") `);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" DROP CONSTRAINT "PK_6fb2fb028d941cdf524c915f90c"`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" ADD CONSTRAINT "PK_4a65be4f135cf89ed96ff568d24" PRIMARY KEY ("productsId", "colorsId")`);
        await queryRunner.query(`ALTER TABLE "sizes" DROP CONSTRAINT "UQ_9fc6e663546e7a6cfdc465e86df"`);
        await queryRunner.query(`ALTER TABLE "sizes" DROP CONSTRAINT "PK_09ffc681886e25eb5ce3b319fab"`);
        await queryRunner.query(`ALTER TABLE "sizes" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sizes" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sizes" ADD CONSTRAINT "PK_09ffc681886e25eb5ce3b319fab" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "products_sizes_sizes" ADD CONSTRAINT "FK_ed24d3dcac72d9085e194354b4e" FOREIGN KEY ("sizesId") REFERENCES "sizes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "colors" DROP CONSTRAINT "UQ_cf12321fa0b7b9539e89c7dfeb7"`);
        await queryRunner.query(`ALTER TABLE "colors" DROP CONSTRAINT "PK_3a62edc12d29307872ab1777ced"`);
        await queryRunner.query(`ALTER TABLE "colors" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "colors" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "colors" ADD CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "products_colors_colors" ADD CONSTRAINT "FK_c2d8b6cd911f827638d49486e5e" FOREIGN KEY ("colorsId") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
