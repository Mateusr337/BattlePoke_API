import { BattleUser } from "@prisma/client";
import battleRepository from "../repositories/battleRepository.js";
import battleUserPokemonsRepository from "../repositories/battleUserPokemonsRepository.js";
import battleUsersRepository from "../repositories/battleUsersRepository.js";

interface userCreateBattle {
  id: number;
  pokemonIds: Array<number>;
}

async function create(users: Array<userCreateBattle>) {
  const battle = await battleRepository.create();

  users.map(async (user: userCreateBattle) => {
    if (user === undefined) return;

    const battleUser = await battleUsersRepository.create({
      userId: user.id,
      winner: false,
      battleId: battle.id,
    });

    await battleUserPokemonsRepository.create(user.pokemonIds, battleUser.id);
  });
}

export default {
  create,
};
