import battleRepository, {
  BattleLevel,
} from "../repositories/battleRepository.js";
import battlePokemonRepository from "../repositories/battlePokemonRepository.js";

async function create(
  level: BattleLevel,
  userId: number,
  pokemonsIds: Array<number>
) {
  const battle = await battleRepository.create(userId, level);
  await battlePokemonRepository.create(pokemonsIds, battle.id);

  return battle;
}

async function findById(id: number) {
  const battle = await battleRepository.findById(id);
  return battle;
}

export default {
  create,
  findById,
};