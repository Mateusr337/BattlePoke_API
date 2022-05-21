import { UpdateBattle } from "./../repositories/battleRepository.js";
import battleRepository, {
  BattleLevel,
} from "../repositories/battleRepository.js";
import battlePokemonRepository from "../repositories/battlePokemonRepository.js";
import userService from "./userService.js";
import userRepository from "../repositories/userRepository.js";

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

async function findByUser(userId: number) {
  const battles = await battleRepository.findByUser(userId);
  return battles;
}

async function update(id: number, data: UpdateBattle) {
  const battle = await battleRepository.update(data, id);

  if (data.wins) {
    const user = await userService.findById(battle.userId);
    await userRepository.update({ points: user.points + 3 }, battle.userId);
  }
}

export default {
  create,
  findById,
  findByUser,
  update,
};
