import { prisma } from "../database.js";

async function create(pokemonsIds: Array<number>, battleId: number) {
  const data = pokemonsIds.map((id: number) => ({ pokemonId: id, battleId }));

  await prisma.battlePokemon.createMany({ data });
}

async function findByBattleId(battleId: number) {
  const battlesPokemons = await prisma.battlePokemon.findMany({
    where: { battleId },
  });
  return battlesPokemons;
}

export default {
  create,
  findByBattleId,
};
