import supertest from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import userFactory from "../factories/userFactory.js";

afterEach(async () => {
  await prisma.$disconnect();
});

const truncate = async (table: string) => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${table} CASCADE`);
};

const agent = supertest(app);

describe("POST /users", () => {
  beforeEach(async () => {
    await truncate("users");
  });

  it("should answer with status code 201", async () => {
    const userData = userFactory.createUserInsertData();

    const res = await agent.post("/users").send(userData);
    const userCreated = await prisma.user.findFirst({ where: { email: userData.email } });

    expect(res.status).toEqual(201);
    expect(res.body).not.toBeNull();
  });
});

describe("POST /users/login", () => {
  beforeEach(async () => {
    await truncate("users");
  });

  it("should answer with token", async () => {
    const { email, password, id } = await userFactory.createUser();

    const res = await agent.post("/users/login").send({ email, password });

    const userCreated = await prisma.user.findUnique({ where: { id } });

    expect(res.body.token.length).toBeGreaterThan(0);
    expect(userCreated).not.toBeNull();
  });
});

describe("GET /users/:token - valid token", () => {
  beforeEach(async () => {
    await truncate("users");
  });

  it("should answer with session object", async () => {
    const { email, password, id } = await userFactory.createUser();

    const res = await agent.post("/users/login").send({ email, password });

    const userCreated = await prisma.user.findUnique({ where: { id } });

    expect(res.body.token).not.toBeNull();
    expect(userCreated).not.toBeNull();
  });
});
