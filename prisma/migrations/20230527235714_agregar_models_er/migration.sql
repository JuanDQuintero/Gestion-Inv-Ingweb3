/*
  Warnings:

  - You are about to drop the column `fechaCreacion` on the `Material` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Material" DROP COLUMN "fechaCreacion",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
