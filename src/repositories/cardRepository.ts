import { prisma } from "../database.js";

async function find(userId: number) {
  const cards = await prisma.pokemon.findMany({});
  return cards;
}

async function findByUser(id: number) {
  const pokemosAndTypes = await prisma.pokemonTypePokemon.findMany({
    include: {
      pokemon: {},
      pokemonType: {},
    },
  });

  return pokemosAndTypes;
}

export default {
  findByUser,
};
