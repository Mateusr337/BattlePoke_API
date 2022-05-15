/*
  Warnings:

  - Added the required column `level` to the `pokemonsBattles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pokemonsBattles" ADD COLUMN     "level" INTEGER NOT NULL;
