import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1747785454645 implements MigrationInterface {
  name = 'Migration1747785454645';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(150) NOT NULL, "document" character varying(11), CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "UQ_68c9c024a07c49ad6a2072d23c6" UNIQUE ("document"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}
