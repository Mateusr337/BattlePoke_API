import { prisma } from "../database.js";

async function create(pokemonsIds: Array<number>, battleUserId: number) {
  const data = pokemonsIds.map((id: number) => ({ pokemonId: id, battleUserId }));

  await prisma.battleUserPokemon.createMany({
    data,
  });
}

export default {
  create,
};
