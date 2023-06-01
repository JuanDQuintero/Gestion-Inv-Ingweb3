/*
  Warnings:

  - You are about to drop the column `price` on the `Material` table. All the data in the column will be lost.
  - Added the required column `balance` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Material" DROP COLUMN "price",
ADD COLUMN     "balance" INTEGER NOT NULL;
