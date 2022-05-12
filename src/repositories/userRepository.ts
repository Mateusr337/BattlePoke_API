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

async function sessionInsert(token: string) {
  const session = await prisma.session.create({ data: { token } });
  return session;
}

async function sessionFind(token: string) {
  const session = await prisma.session.findUnique({ where: { token } });
  return session;
}

export default {
  create,
  findByEmail,
  sessionInsert,
  sessionFind,
};
