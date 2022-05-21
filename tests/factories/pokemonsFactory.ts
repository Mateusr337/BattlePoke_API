import { prisma } from "../../src/database.js";

async function findPokemons(qtd: number) {
  const pokemons = await prisma.pokemon.findMany();

  return pokemons.slice(qtd);
}

export default {
  findPokemons,
};
