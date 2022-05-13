import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";
import encryptFunctions from "../../src/utils/encryptFunction.js";

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

export default {
  createUserInsertData,
  createUser,
};
