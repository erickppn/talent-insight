-- CreateTable
CREATE TABLE `posts` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `thumbnailKey` VARCHAR(191) NULL,
    `thumbnailUrl` VARCHAR(191) NULL,
    `postedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `likes` INTEGER NOT NULL DEFAULT 0,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_attachment` (
    `id` VARCHAR(191) NOT NULL,
    `attachmentKey` VARCHAR(191) NOT NULL,
    `attachmentUrl` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_attachment` ADD CONSTRAINT `post_attachment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
