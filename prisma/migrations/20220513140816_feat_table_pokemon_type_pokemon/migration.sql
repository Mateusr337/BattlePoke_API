/*
  Warnings:

  - You are about to drop the column `pokemonTypeId` on the `pokemons` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pokemons" DROP CONSTRAINT "pokemons_pokemonTypeId_fkey";

-- DropIndex
DROP INDEX "sessions_token_key";

-- AlterTable
ALTER TABLE "pokemons" DROP COLUMN "pokemonTypeId";

-- CreateTable
CREATE TABLE "pokemonsTypesPokemons" (
    "id" SERIAL NOT NULL,
    "pokemonTypeId" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "pokemonsTypesPokemons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pokemonsTypesPokemons" ADD CONSTRAINT "pokemonsTypesPokemons_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemonsTypesPokemons" ADD CONSTRAINT "pokemonsTypesPokemons_pokemonTypeId_fkey" FOREIGN KEY ("pokemonTypeId") REFERENCES "pokemonsTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
