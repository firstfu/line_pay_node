-- CreateIndex
CREATE INDEX `Order_orderNum_transactionId_idx` ON `Order`(`orderNum`, `transactionId`);
