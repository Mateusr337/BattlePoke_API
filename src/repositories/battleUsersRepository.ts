import { BattleUser } from "@prisma/client";
import { prisma } from "./../database.js";

export type createBattleUser = Omit<BattleUser, "id">;

async function create(data: createBattleUser) {
  const battleUser = await prisma.battleUser.create({
    data,
  });
  return battleUser;
}

export default {
  create,
};
