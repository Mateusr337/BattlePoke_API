import { faker } from "@faker-js/faker";

function createUserInsertData() {
  return {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    imageURL: faker.internet.url(),
    password: "123456",
  };
}

export default {
  createUserInsertData,
};
