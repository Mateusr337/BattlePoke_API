/*
  Warnings:

  - You are about to drop the column `finished` on the `battles` table. All the data in the column will be lost.
  - You are about to drop the column `battleUserId` on the `battlesUsersPokemons` table. All the data in the column will be lost.
  - You are about to drop the column `pokemonLevelId` on the `pokemons` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `pokemonsLevels` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `pokemonsLevels` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `pokemonsTypes` table. All the data in the column will be lost.
  - You are about to drop the `battlesUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pokemonsBattles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pokemonsTypesPokemons` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Level` to the `battles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `battles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `battleId` to the `battlesUsersPokemons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `pokemons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `pokemonsLevels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pokemonId` to the `pokemonsLevels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pokemonId` to the `pokemonsTypes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pokemonTypeId` to the `pokemonsTypes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "battlesUsers" DROP CONSTRAINT "battlesUsers_battleId_fkey";

-- DropForeignKey
ALTER TABLE "battlesUsers" DROP CONSTRAINT "battlesUsers_userId_fkey";

-- DropForeignKey
ALTER TABLE "battlesUsersPokemons" DROP CONSTRAINT "battlesUsersPokemons_battleUserId_fkey";

-- DropForeignKey
ALTER TABLE "pokemons" DROP CONSTRAINT "pokemons_pokemonLevelId_fkey";

-- DropForeignKey
ALTER TABLE "pokemonsBattles" DROP CONSTRAINT "pokemonsBattles_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "pokemonsTypesPokemons" DROP CONSTRAINT "pokemonsTypesPokemons_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "pokemonsTypesPokemons" DROP CONSTRAINT "pokemonsTypesPokemons_pokemonTypeId_fkey";

-- DropIndex
DROP INDEX "pokemonsLevels_name_key";

-- DropIndex
DROP INDEX "pokemonsLevels_number_key";

-- DropIndex
DROP INDEX "pokemonsTypes_name_key";

-- AlterTable
ALTER TABLE "battles" DROP COLUMN "finished",
ADD COLUMN     "Level" INTEGER NOT NULL,
ADD COLUMN     "finish" BOOLEAN,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "wins" BOOLEAN;

-- AlterTable
ALTER TABLE "battlesUsersPokemons" DROP COLUMN "battleUserId",
ADD COLUMN     "battleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pokemons" DROP COLUMN "pokemonLevelId",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pokemonsLevels" DROP COLUMN "name",
DROP COLUMN "number",
ADD COLUMN     "level" INTEGER NOT NULL,
ADD COLUMN     "pokemonId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pokemonsTypes" DROP COLUMN "name",
ADD COLUMN     "pokemonId" INTEGER NOT NULL,
ADD COLUMN     "pokemonTypeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "battlesUsers";

-- DropTable
DROP TABLE "pokemonsBattles";

-- DropTable
DROP TABLE "pokemonsTypesPokemons";

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_number_key" ON "categories"("number");

-- CreateIndex
CREATE UNIQUE INDEX "types_name_key" ON "types"("name");

-- AddForeignKey
ALTER TABLE "pokemons" ADD CONSTRAINT "pokemons_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemonsTypes" ADD CONSTRAINT "pokemonsTypes_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemonsTypes" ADD CONSTRAINT "pokemonsTypes_pokemonTypeId_fkey" FOREIGN KEY ("pokemonTypeId") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battles" ADD CONSTRAINT "battles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battlesUsersPokemons" ADD CONSTRAINT "battlesUsersPokemons_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "battles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemonsLevels" ADD CONSTRAINT "pokemonsLevels_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
