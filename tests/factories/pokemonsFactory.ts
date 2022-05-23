import { prisma } from "../../src/database.js";

async function findPokemons(qtd: number) {
  const pokemons = await prisma.pokemon.findMany();

  return pokemons.slice(qtd);
}

async function createPokemonUser(pokemonName: string, userId: number) {
  const pokemon = await prisma.pokemon.findFirst({
    where: { name: pokemonName },
  });

  await prisma.pokemonUser.create({
    data: {
      pokemonId: pokemon.id,
      userId,
    },
  });

  return pokemon;
}

export default {
  findPokemons,
  createPokemonUser,
};
