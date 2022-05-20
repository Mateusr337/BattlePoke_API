import { prisma } from "../database.js";

export type BattleLevel = 1 | 2 | 3;

export interface UpdateBattle {
  finish: boolean;
  wins: boolean;
}

async function create(userId: number, Level: BattleLevel) {
  const battle = await prisma.battle.create({
    data: {
      userId,
      Level,
      finish: false,
      wins: null,
    },
  });

  return battle;
}

async function update(data: UpdateBattle, id: number) {
  await prisma.battle.update({
    where: { id },
    data,
  });
}

async function findById(id: number) {
  const battle = await prisma.battle.findUnique({ where: { id } });
  return battle;
}

async function findByUser(userId: number) {
  const battles = await prisma.battle.findMany({ where: { userId } });
  return battles;
}

export default {
  create,
  findById,
  findByUser,
  update,
};
