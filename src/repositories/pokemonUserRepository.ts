import { prisma } from "../database.js";

interface updatePokemonUser {
  pokemonId?: number;
  userId?: number;
}

async function find(userId: number, pokemonId: number) {
  const pokemonUser = await prisma.pokemonUser.findFirst({
    where: { AND: [{ pokemonId }, { userId }] },
  });

  return pokemonUser;
}

async function update(data: updatePokemonUser, id: number) {
  const pokemonUser = await prisma.pokemonUser.update({
    where: { id },
    data,
  });
  return pokemonUser;
}

export default {
  find,
  update,
};
