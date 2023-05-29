/*
  Warnings:

  - You are about to drop the column `quantity` on the `Movement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movement" DROP COLUMN "quantity",
ADD COLUMN     "quantityIn" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantityOut" INTEGER NOT NULL DEFAULT 0;
