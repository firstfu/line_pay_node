/*
  Warnings:

  - You are about to drop the column `orderNum` on the `Order` table. All the data in the column will be lost.
  - Added the required column `orderNo` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Order_orderNum_transactionId_idx` ON `Order`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `orderNum`,
    ADD COLUMN `orderNo` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Order_orderNo_transactionId_idx` ON `Order`(`orderNo`, `transactionId`);
