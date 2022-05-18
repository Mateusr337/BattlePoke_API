import { prisma } from "../database.js";

async function create() {
  const battle = await prisma.battle.create({
    data: {
      finished: false,
    },
  });

  return battle;
}

async function finish(winnerId: number) {
  const battles = await prisma.battle.findMany({
    where: { finished: false },
  });
  const battle = battles[battles.length - 1];

  await prisma.battle.update({
    where: { id: battle.id },
    data: { finished: true },
  });

  await prisma.battleUser.updateMany({
    where: { AND: [{ battleId: battle.id }, { userId: winnerId }] },
    data: {},
  });
}

export default {
  create,
  finish,
};
