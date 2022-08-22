/*
  Warnings:

  - You are about to drop the column `aboutMe` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `artName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `avatarImgPath` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `aboutMe`,
    DROP COLUMN `artName`,
    DROP COLUMN `avatarImgPath`;

-- CreateTable
CREATE TABLE `user_profile` (
    `id` VARCHAR(191) NOT NULL,
    `artName` VARCHAR(191) NULL,
    `aboutMe` VARCHAR(191) NULL,
    `avatarImgPath` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_profile` ADD CONSTRAINT `user_profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
