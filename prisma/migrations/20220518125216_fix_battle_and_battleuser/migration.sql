/*
  Warnings:

  - You are about to drop the column `winnerId` on the `battles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "battles" DROP CONSTRAINT "battles_winnerId_fkey";

-- AlterTable
ALTER TABLE "battles" DROP COLUMN "winnerId";

-- AlterTable
ALTER TABLE "battlesUsers" ADD COLUMN     "winner" BOOLEAN;
