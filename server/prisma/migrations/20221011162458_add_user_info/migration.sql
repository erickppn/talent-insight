/*
  Warnings:

  - You are about to drop the column `avatarImgPath` on the `user_profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user_profile` DROP COLUMN `avatarImgPath`,
    ADD COLUMN `avatarKey` VARCHAR(191) NULL,
    ADD COLUMN `avatarUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
