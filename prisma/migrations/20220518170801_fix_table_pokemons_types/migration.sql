/*
  Warnings:

  - You are about to drop the column `pokemonTypeId` on the `pokemonsTypes` table. All the data in the column will be lost.
  - Added the required column `TypeId` to the `pokemonsTypes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pokemonsTypes" DROP CONSTRAINT "pokemonsTypes_pokemonTypeId_fkey";

-- AlterTable
ALTER TABLE "pokemonsTypes" DROP COLUMN "pokemonTypeId",
ADD COLUMN     "TypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "pokemonsTypes" ADD CONSTRAINT "pokemonsTypes_TypeId_fkey" FOREIGN KEY ("TypeId") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
