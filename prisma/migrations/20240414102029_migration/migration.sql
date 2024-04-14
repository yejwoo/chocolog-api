/*
  Warnings:

  - A unique constraint covering the columns `[user_name]` on the table `cc_users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `cc_logs` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `cc_users` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL DEFAULT NOW();

-- CreateIndex
CREATE UNIQUE INDEX `cc_users_user_name_key` ON `cc_users`(`user_name`);
