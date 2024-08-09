import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryEntityChanged1723065560537 implements MigrationInterface {
    name = 'CategoryEntityChanged1723065560537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "mpath"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "mpath" character varying DEFAULT ''`);
    }

}
