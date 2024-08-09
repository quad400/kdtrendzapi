import { MigrationInterface, QueryRunner } from "typeorm";

export class BrandChangesUserId1723164886901 implements MigrationInterface {
    name = 'BrandChangesUserId1723164886901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "FK_2bd14c9ce10e19d290d3f6818d9"`);
        await queryRunner.query(`ALTER TABLE "brands" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "brands" RENAME CONSTRAINT "UQ_2bd14c9ce10e19d290d3f6818d9" TO "UQ_5d26f3a7d19d380538c9dd57d06"`);
        await queryRunner.query(`ALTER TABLE "brands" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "FK_5d26f3a7d19d380538c9dd57d06" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "FK_5d26f3a7d19d380538c9dd57d06"`);
        await queryRunner.query(`ALTER TABLE "brands" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brands" RENAME CONSTRAINT "UQ_5d26f3a7d19d380538c9dd57d06" TO "UQ_2bd14c9ce10e19d290d3f6818d9"`);
        await queryRunner.query(`ALTER TABLE "brands" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "FK_2bd14c9ce10e19d290d3f6818d9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
