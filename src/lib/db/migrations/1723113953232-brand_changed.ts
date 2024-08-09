import { MigrationInterface, QueryRunner } from "typeorm";

export class BrandChanged1723113953232 implements MigrationInterface {
    name = 'BrandChanged1723113953232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "UQ_2bd14c9ce10e19d290d3f6818d9" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "brands" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "FK_2bd14c9ce10e19d290d3f6818d9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "FK_2bd14c9ce10e19d290d3f6818d9"`);
        await queryRunner.query(`ALTER TABLE "brands" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "UQ_2bd14c9ce10e19d290d3f6818d9"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "userId"`);
    }

}
