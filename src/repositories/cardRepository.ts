import { pokemonLevels } from "./../../prisma/constants";
import { prisma } from "../database.js";

async function find(userId: number) {
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

export default {
  findByUser,
  find,
};
