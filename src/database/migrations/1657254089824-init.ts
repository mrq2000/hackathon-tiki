import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1657254089824 implements MigrationInterface {
  name = 'init1657254089824';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `products` (`id` int NOT NULL, `name` varchar(255) NOT NULL, `price` int NOT NULL, `img_url` varchar(255) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      "CREATE TABLE `questions` (`id` int NOT NULL AUTO_INCREMENT, `type` varchar(255) NOT NULL DEFAULT 'ABCD_QUESTION', `data` text NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      "CREATE TABLE `users` (`id` int NOT NULL, `gold` int NOT NULL, `exp` int NOT NULL, `status` tinyint NOT NULL DEFAULT '1', `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `users`');
    await queryRunner.query('DROP TABLE `questions`');
    await queryRunner.query('DROP TABLE `products`');
  }
}
