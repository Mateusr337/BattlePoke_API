import { PokemonUser } from "@prisma/client";
import { prisma } from "../database.js";

export type PokemonUserInsertData = Omit<PokemonUser, "id">;
export type LevelsBattles = 1 | 2 | 3;

async function find() {
  const cards = await prisma.pokemon.findMany({
    include: {
      pokemonLevel: {},
      PokemonTypePokemon: {
        include: {
          pokemonType: {},
        },
      },
    },
  });

  return cards;
}

async function findByUser(id: number) {
  const cards = prisma.user.findUnique({
    where: { id },
    include: {
      PokemonUser: {
        include: {
          pokemon: {
            include: {
              pokemonLevel: {},
              PokemonTypePokemon: {
                include: {
                  pokemonType: {},
                },
              },
            },
          },
        },
      },
    },
  });

  return cards;
}

async function createPokemonUser(data: Array<PokemonUserInsertData>) {
  await prisma.pokemonUser.createMany({ data });
}

async function findPokemonsBattleByLevel(level: LevelsBattles) {
  const pokemons = await prisma.pokemonBattle.findMany({
    where: { level },
    include: {
      pokemon: {},
    },
  });
  return pokemons;
}

export default {
  findByUser,
  find,
  createPokemonUser,
  findPokemonsBattleByLevel,
};
