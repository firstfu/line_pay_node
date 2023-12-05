-- DropForeignKey
ALTER TABLE `OrderDetail` DROP FOREIGN KEY `OrderDetail_orderId_fkey`;

-- RenameIndex
ALTER TABLE `OrderDetail` RENAME INDEX `OrderDetail_orderId_fkey` TO `OrderDetail_orderId_idx`;
