import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1722869888640 implements MigrationInterface {
    name = 'Initial1722869888640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "fullName" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying NOT NULL DEFAULT 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg', "roles" "public"."users_roles_enum" array NOT NULL DEFAULT '{user}', "account_type" "public"."users_account_type_enum" NOT NULL DEFAULT 'buyer', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
