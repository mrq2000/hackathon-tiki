import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateProductTable1657305476187 implements MigrationInterface {
  name = 'updateProductTable1657305476187';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `products` ADD `discount_rate` int NOT NULL DEFAULT '0'");
    await queryRunner.query('ALTER TABLE `products` ADD `rating_average` int NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `products` DROP COLUMN `rating_average`');
    await queryRunner.query('ALTER TABLE `products` DROP COLUMN `discount_rate`');
  }
}
