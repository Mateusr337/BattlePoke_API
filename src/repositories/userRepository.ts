import { prisma } from "./../database.js";

export interface InsertUserData {
  email: string;
  name: string;
  password: string;
  imageURL: string;
  level: string;
}

async function create(data: InsertUserData) {
  const user = await prisma.user.create({ data });
  return user;
}

async function findByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}

async function findById(id: number) {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
}

async function sessionInsert(token: string) {
  const session = await prisma.session.create({ data: { token } });
  return session;
}

async function sessionFind(token: string) {
  const session = await prisma.session.findUnique({ where: { token } });
  return session;
}

async function updateLevel(userId: number, newLevel: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { level: newLevel },
  });
}

export default {
  create,
  findByEmail,
  sessionInsert,
  sessionFind,
  findById,
  updateLevel,
};
