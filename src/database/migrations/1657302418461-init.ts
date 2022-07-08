import {MigrationInterface, QueryRunner} from "typeorm";

export class init1657302418461 implements MigrationInterface {
    name = 'init1657302418461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `products` (`id` int NOT NULL, `name` varchar(255) NOT NULL, `price` int NOT NULL, `img_url` varchar(255) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `questions` (`id` int NOT NULL AUTO_INCREMENT, `type` varchar(255) NOT NULL DEFAULT 'CHOOSE_PRODUCT', `data` text NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL, `name` varchar(255) NOT NULL, `avatar_url` varchar(255) NULL, `gold` int NOT NULL DEFAULT '0', `exp` int NOT NULL DEFAULT '0', `status` tinyint NOT NULL DEFAULT '1', `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_question` (`id` int NOT NULL AUTO_INCREMENT, `date` int NOT NULL DEFAULT '1', `data` text NOT NULL, `user_id` int NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX `IDX_c94c58911ee9a4204e5ad60fdc` (`user_id`, `date`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user_question` ADD CONSTRAINT `FK_f5489bae192eec1c8f257135d97` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_question` DROP FOREIGN KEY `FK_f5489bae192eec1c8f257135d97`");
        await queryRunner.query("DROP INDEX `IDX_c94c58911ee9a4204e5ad60fdc` ON `user_question`");
        await queryRunner.query("DROP TABLE `user_question`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `questions`");
        await queryRunner.query("DROP TABLE `products`");
    }

}
