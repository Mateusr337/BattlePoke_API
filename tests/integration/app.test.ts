import supertest from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import userFactory from "../factories/userFactory.js";

afterEach(async () => {
  await prisma.$disconnect();
});

const truncate = async (table: string) => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE`);
};

const agent = supertest(app);

describe("POST /users", () => {
  beforeEach(async () => {
    await truncate("users");
  });

  it("should answer with status code 201", async () => {
    const userData = userFactory.createUserInsertData();

    const res = await agent.post("/users").send(userData);
    const userCreated = await prisma.user.findFirst({
      where: { email: userData.email },
    });

    expect(res.status).toEqual(201);
    expect(res.body).not.toBeNull();
  });
});

// describe("POST /users/login", () => {
//   beforeEach(async () => {
//     await truncate("users");
//   });

//   it("should answer with token", async () => {
//     const { email, password, id } = await userFactory.createUser();

//     const res = await agent.post("/users/login").send({ email, password });

//     const userCreated = await prisma.user.findUnique({ where: { id } });

//     expect(res.body.token.length).toBeGreaterThan(0);
//     expect(userCreated).not.toBeNull();
//   });
// });

// describe("POST /users/validToken", () => {
//   beforeEach(async () => {
//     await truncate("users");
//   });

//   it("should answer with session object", async () => {
//     const { email, password, id } = await userFactory.createUser();

//     const res = await agent.post("/users/login").send({ email, password });

//     const userCreated = await prisma.user.findUnique({ where: { id } });

//     expect(res.body.token).not.toBeNull();
//     expect(userCreated).not.toBeNull();
//   });
// });

// describe("GET /users", () => {
//   beforeEach(async () => {
//     await truncate("users");
//   });

//   it("should answer with user data", async () => {
//     const user = await userFactory.createLogin();

//     const res = await agent.get("/users").set(user.authorization);

//     expect(res.body.id).not.toBeNull();
//     expect(res.status).toEqual(200);
//   });
// });

// describe("GET /cards", () => {
//   beforeEach(async () => {
//     await truncate("users");
//   });

//   it("should answer with list of cards", async () => {
//     const user = await userFactory.createLogin();

//     const res = await agent.get("/cards").set(user.authorization);

//     expect(res.status).toEqual(200);
//     expect(res.body.length).toBeGreaterThan(0);
//   });
// });

// describe("POST /cards", () => {
//   beforeEach(async () => {
//     await truncate("pokemonsUsers");
//   });

//   it("should answer with status code 201", async () => {
//     const user = await userFactory.createLogin();

//     const res = await agent
//       .post("/cards")
//       .set(user.authorization)
//       .send({ cards: [1] });

//     const createdCards = await prisma.pokemonUser.findMany();

//     expect(res.status).toEqual(201);
//     expect(createdCards.length).toEqual(1);
//   });
// });

// describe("GET /cards/user", () => {
//   it("should answer with list of cards", async () => {
//     const user = await userFactory.createLogin();

//     await prisma.pokemonUser.create({
//       data: { userId: user.id, pokemonId: 1 },
//     });

//     const res = await agent.get("/cards/user").set(user.authorization);

//     expect(res.status).toEqual(200);
//     expect(res.body).not.toBeNull();
//   });
// });
