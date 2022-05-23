import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";
import encryptFunctions from "../../src/utils/encryptFunction.js";

const config = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

function createUserInsertData(points?: number) {
  return {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    imageURL: faker.internet.url(),
    points: points || 0,
    password: "123456",
  };
}

async function createUser(points?: number) {
  const userPartialData = createUserInsertData();

  const hashPassword = encryptFunctions.encryptData(userPartialData.password);

  const createdUser = await prisma.user.create({
    data: {
      ...userPartialData,
      password: hashPassword,
      level: "0",
    },
  });

  return {
    ...createdUser,
    password: userPartialData.password,
    passwordHash: createdUser.password,
  };
}

async function createLogin(points?: number) {
  const user = await createUser(points);

  const expiration = { expiresIn: 60 * 60 * 24 * 30 };
  const token: string = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    expiration
  );

  await prisma.session.create({
    data: { token },
  });

  return { authorization: config(token), ...user };
}

export default {
  createUserInsertData,
  createUser,
  createLogin,
};
