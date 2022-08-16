/*
  Warnings:

  - The primary key for the `Coin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `coinId` on the `Coin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,userId]` on the table `Coin` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Coin` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Coin" DROP CONSTRAINT "Coin_userId_fkey";

-- AlterTable
ALTER TABLE "Coin" DROP CONSTRAINT "Coin_pkey",
DROP COLUMN "coinId",
ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Coin_id_userId_key" ON "Coin"("id", "userId");

-- AddForeignKey
ALTER TABLE "Coin" ADD CONSTRAINT "Coin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
