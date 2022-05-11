-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT E'0',
    "imagemURL" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pokemonTypeId" INTEGER NOT NULL,
    "pokemonLevelId" INTEGER NOT NULL,
    "life" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "imageURL" TEXT NOT NULL,

    CONSTRAINT "pokemons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemonsUsers" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "pokemonsUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemonsLevels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "pokemonsLevels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemonsTypes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "pokemonsTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battles" (
    "id" SERIAL NOT NULL,
    "winner" INTEGER NOT NULL,

    CONSTRAINT "battles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battlesUsers" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "battleId" INTEGER NOT NULL,

    CONSTRAINT "battlesUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pokemons_name_key" ON "pokemons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pokemonsLevels_name_key" ON "pokemonsLevels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pokemonsLevels_number_key" ON "pokemonsLevels"("number");

-- CreateIndex
CREATE UNIQUE INDEX "pokemonsTypes_name_key" ON "pokemonsTypes"("name");

-- AddForeignKey
ALTER TABLE "pokemons" ADD CONSTRAINT "pokemons_pokemonLevelId_fkey" FOREIGN KEY ("pokemonLevelId") REFERENCES "pokemonsLevels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemons" ADD CONSTRAINT "pokemons_pokemonTypeId_fkey" FOREIGN KEY ("pokemonTypeId") REFERENCES "pokemonsTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "pokemonsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "pokemonsUsers_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battles" ADD CONSTRAINT "battles_winner_fkey" FOREIGN KEY ("winner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battlesUsers" ADD CONSTRAINT "battlesUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battlesUsers" ADD CONSTRAINT "battlesUsers_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "battles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
