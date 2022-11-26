/*
  Warnings:

  - Added the required column `type` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `posts` ADD COLUMN `type` VARCHAR(191) NOT NULL;
