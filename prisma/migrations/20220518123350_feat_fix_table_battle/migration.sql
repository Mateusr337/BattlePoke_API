/*
  Warnings:

  - You are about to drop the column `winner` on the `battles` table. All the data in the column will be lost.
  - Added the required column `winnerId` to the `battles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "battles" DROP CONSTRAINT "battles_winner_fkey";

-- AlterTable
ALTER TABLE "battles" DROP COLUMN "winner",
ADD COLUMN     "finished" BOOLEAN,
ADD COLUMN     "winnerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "battles" ADD CONSTRAINT "battles_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
