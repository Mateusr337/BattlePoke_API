/*
  Warnings:

  - Made the column `imageURL` on table `pokemons` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pokemons" ADD COLUMN     "evolution" TEXT,
ALTER COLUMN "imageURL" SET NOT NULL;
