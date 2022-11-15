-- AlterTable
ALTER TABLE `user_profile` ADD COLUMN `bannerKey` VARCHAR(191) NULL,
    ADD COLUMN `bannerUrl` VARCHAR(191) NULL,
    MODIFY `aboutMe` VARCHAR(300) NULL;
