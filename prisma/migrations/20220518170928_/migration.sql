/*
  Warnings:

  - You are about to drop the column `TypeId` on the `pokemonsTypes` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `pokemonsTypes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pokemonsTypes" DROP CONSTRAINT "pokemonsTypes_TypeId_fkey";

-- AlterTable
ALTER TABLE "pokemonsTypes" DROP COLUMN "TypeId",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "pokemonsTypes" ADD CONSTRAINT "pokemonsTypes_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
