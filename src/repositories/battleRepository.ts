import { prisma } from "../database.js";

export type BattleLevel = 1 | 2 | 3;

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

async function findById(id: number) {
  const battle = await prisma.battle.findUnique({ where: { id } });
  return battle;
}

export default {
  create,
  findById,
};
