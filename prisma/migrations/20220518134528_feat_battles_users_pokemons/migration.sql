-- CreateTable
CREATE TABLE "battlesUsersPokemons" (
    "id" SERIAL NOT NULL,
    "battleUserId" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "battlesUsersPokemons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "battlesUsersPokemons" ADD CONSTRAINT "battlesUsersPokemons_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battlesUsersPokemons" ADD CONSTRAINT "battlesUsersPokemons_battleUserId_fkey" FOREIGN KEY ("battleUserId") REFERENCES "battlesUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
