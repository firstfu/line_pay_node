/*
  Warnings:

  - A unique constraint covering the columns `[orderNo]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `transactionStatus` ENUM('PENDING', 'FAILED', 'SUCCESS', 'CANCEL') NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX `Order_orderNo_key` ON `Order`(`orderNo`);
