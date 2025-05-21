import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1747849637000 implements MigrationInterface {
    name = 'Migration1747849637000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "customer_id" integer, "product_id" integer, CONSTRAINT "uq_customer_product" UNIQUE ("customer_id", "product_id"), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_favorites_customer_id" ON "favorites" ("customer_id") `);
        await queryRunner.query(`CREATE INDEX "idx_favorites_product_id" ON "favorites" ("product_id") `);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_910d46f0ab3b071255bedd1732b" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_003e599a9fc0e8f154b6313639f" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_003e599a9fc0e8f154b6313639f"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_910d46f0ab3b071255bedd1732b"`);
        await queryRunner.query(`DROP INDEX "public"."idx_favorites_product_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_favorites_customer_id"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
    }

}
