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

async function remove(id: number) {
  await prisma.pokemonUser.delete({
    where: { id },
  });
}

export default {
  find,
  update,
  remove,
};
