/*
  Warnings:

  - The primary key for the `cc_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `cc_users` table. All the data in the column will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_email]` on the table `cc_users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `cc_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cc_users` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `uid` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`uid`);

-- DropTable
DROP TABLE `Test`;

-- CreateTable
CREATE TABLE `cc_logs` (
    `lid` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `choco_name` VARCHAR(100) NOT NULL,
    `choco_country` CHAR(2) NOT NULL,
    `kakao_type` CHAR(1) NOT NULL DEFAULT 'M',
    `product_type` VARCHAR(20) NOT NULL DEFAULT 'raw',
    `choco_type` VARCHAR(10) NOT NULL DEFAULT '',
    `choco_desc` VARCHAR(72) NOT NULL DEFAULT '',
    `ratings` INTEGER NOT NULL DEFAULT 0,
    `image_url` VARCHAR(255) NOT NULL DEFAULT '',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`lid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `cc_users_user_email_key` ON `cc_users`(`user_email`);
