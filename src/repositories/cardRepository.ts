import { PokemonUser } from "@prisma/client";
import { prisma } from "../database.js";

export type PokemonUserInsertData = Omit<PokemonUser, "id">;

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

export default {
  findByUser,
  find,
  createPokemonUser,
};
