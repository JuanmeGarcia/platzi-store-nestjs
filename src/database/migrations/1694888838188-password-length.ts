import { MigrationInterface, QueryRunner } from "typeorm";

export class PasswordLength1694888838188 implements MigrationInterface {
    name = 'PasswordLength1694888838188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE VARCHAR(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE VARCHAR(50)`);
    }

}
