import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1747835661485 implements MigrationInterface {
    name = 'Migration1747835661485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "image" character varying(255) NOT NULL, "price" numeric NOT NULL, "review_rate" numeric, "review_count" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_products_title" ON "products" ("title") `);
        await queryRunner.query(`CREATE INDEX "idx_customers_email" ON "customers" ("email") `);
        await queryRunner.query(`CREATE INDEX "idx_customers_document" ON "customers" ("document") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_customers_document"`);
        await queryRunner.query(`DROP INDEX "public"."idx_customers_email"`);
        await queryRunner.query(`DROP INDEX "public"."idx_products_title"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
