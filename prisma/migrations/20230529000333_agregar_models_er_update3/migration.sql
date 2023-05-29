/*
  Warnings:

  - You are about to drop the column `quantityIn` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the column `quantityOut` on the `Movement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movement" DROP COLUMN "quantityIn",
DROP COLUMN "quantityOut",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'IN';
