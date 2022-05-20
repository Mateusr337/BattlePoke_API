import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";
import encryptFunctions from "../../src/utils/encryptFunction.js";

const config = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

function createUserInsertData() {
  return {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    imageURL: faker.internet.url(),
    password: "123456",
  };
}

async function createUser() {
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

async function createLogin() {
  const user = await createUser();

  const expiration = { expiresIn: 60 * 60 * 24 * 30 };
  const token: string = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, expiration);

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
