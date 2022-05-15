-- CreateTable
CREATE TABLE "pokemonsBattles" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "pokemonsBattles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pokemonsBattles" ADD CONSTRAINT "pokemonsBattles_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
