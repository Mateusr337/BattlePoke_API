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

export default {
  create,
  findByEmail,
};
