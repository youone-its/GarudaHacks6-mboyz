-- AlterTable
ALTER TABLE `Accommodation` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `amenities` JSON NULL,
    ADD COLUMN `overview` VARCHAR(191) NULL,
    ADD COLUMN `profileImage` VARCHAR(191) NULL;
