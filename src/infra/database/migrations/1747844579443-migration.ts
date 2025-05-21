import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1747844579443 implements MigrationInterface {
    name = 'Migration1747844579443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "external_id" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "idx_products_external_id" ON "products" ("external_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_products_external_id"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "external_id"`);
    }

}
