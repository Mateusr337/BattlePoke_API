import { Pokemon } from "@prisma/client";
import supertest from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import battleFactory from "../factories/battleFactory.js";
import pokemonsFactory from "../factories/pokemonsFactory.js";
import userFactory from "../factories/userFactory.js";

afterEach(async () => {
  await prisma.$disconnect();
});

const truncate = async (table: string) => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE`);
};

const agent = supertest(app);

describe("users", () => {
  describe("POST /users", () => {
    beforeEach(async () => {
      await truncate("users");
    });

    it("should answer with status code 201", async () => {
      const userData = userFactory.createUserInsertData();
      delete userData.points;

      const res = await agent.post("/users").send(userData);
      const userCreated = await prisma.user.findFirst({
        where: { email: userData.email },
      });

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

  describe("POST /users/validToken", () => {
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

  describe("GET /users", () => {
    beforeEach(async () => {
      await truncate("users");
    });

    it("should answer with user data", async () => {
      const user = await userFactory.createLogin();

      const res = await agent.get("/users").set(user.authorization);

      expect(res.body.id).not.toBeNull();
      expect(res.status).toEqual(200);
    });
  });

  describe("PACTH /users/upLevels", () => {
    beforeEach(async () => {
      await truncate("users");
    });

    it("should answer with status code 204", async () => {
      const user = await userFactory.createLogin();

      const res = await agent
        .patch(`/users/upLevels`)
        .send({ level: user.level + 1 })
        .set(user.authorization);

      const userUpLevel = await prisma.user.findFirst();

      expect(res.status).toEqual(204);
      expect(userUpLevel.level).toEqual(user.level + 1);
    });
  });
});

describe("pokemons", () => {
  beforeEach(async () => {
    await truncate("pokemonsUsers");
    await truncate("users");
  });

  describe("GET /cards", () => {
    beforeEach(async () => {
      await truncate("users");
    });

    it("should answer with list of cards", async () => {
      const user = await userFactory.createLogin();

      const res = await agent.get("/cards").set(user.authorization);

      expect(res.status).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("POST /cards", () => {
    it("should answer with status code 201", async () => {
      const user = await userFactory.createLogin();

      const res = await agent
        .post("/cards")
        .set(user.authorization)
        .send({ cards: [1] });

      const createdCards = await prisma.pokemonUser.findMany();

      expect(res.status).toEqual(201);
      expect(createdCards.length).toEqual(1);
    });
  });

  describe("GET /cards/user", () => {
    it("should answer with list of cards", async () => {
      const user = await userFactory.createLogin();

      await prisma.pokemonUser.create({
        data: { userId: user.id, pokemonId: 1 },
      });

      const res = await agent.get("/cards/user").set(user.authorization);

      expect(res.status).toEqual(200);
      expect(res.body).not.toBeNull();
    });
  });

  describe("GET /cards/battles/:battleLevel", () => {
    it("should answer with list of cards", async () => {
      const user = await userFactory.createLogin();

      const level = battleFactory.randomLevel();

      const res = await agent
        .get(`/cards/battles/${level}`)
        .set(user.authorization);

      expect(res.status).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /cards/users/battles/:battleId", () => {
    beforeEach(async () => {
      await truncate("battles");
    });

    it("should answer with list of cards", async () => {
      const user = await userFactory.createLogin();
      const battle = await battleFactory.createBattle(user.id);

      const res = await agent
        .get(`/cards/users/battles/${battle.id}`)
        .set(user.authorization);

      expect(res.status).toEqual(200);
      expect(res.body.length).toEqual(3);
    });
  });

  describe("GET /cards/:name", () => {
    it("should answer with pokemon object", async () => {
      const user = await userFactory.createLogin();

      const res = await agent.get(`/cards/charizard`).set(user.authorization);

      expect(res.body).not.toBeNull();
    });
  });

  describe("GET /cards/evolution", () => {
    it("should answer with pokemon id different", async () => {
      const user = await userFactory.createLogin(5);

      const pokemon = await pokemonsFactory.createPokemonUser(
        "charmander",
        user.id
      );

      const res = await agent
        .patch("/cards/evolution")
        .set(user.authorization)
        .send({ pokemonId: pokemon.id });

      const pokemonUser = await prisma.pokemonUser.findFirst();

      expect(res.status).toEqual(204);
      expect(pokemonUser.id).not.toEqual(pokemon.id);
    });
  });

  describe("DELETE /cards/remove", () => {
    it("should answer with pokemon user empty", async () => {
      const user = await userFactory.createLogin();

      const pokemon = await pokemonsFactory.createPokemonUser("eevee", user.id);

      const res = await agent
        .delete(`/cards/${pokemon.id}`)
        .set(user.authorization);

      const pokemnosUser = await prisma.pokemonUser.findMany();

      expect(res.status).toEqual(202);
      expect(pokemnosUser.length).toEqual(0);
    });
  });
});

describe("battles", () => {
  beforeEach(async () => {
    await truncate("battles");
  });

  describe("POST /battles", () => {
    it("should answer with status code 201", async () => {
      const user = await userFactory.createLogin();
      const level = battleFactory.randomLevel();
      const pokemons = await pokemonsFactory.findPokemons(3);

      const pokemonsIds = pokemons.map((pokemon: Pokemon) => pokemon.id);

      const res = await agent
        .post("/battles")
        .set(user.authorization)
        .send({ level, pokemonsIds });

      const battle = await prisma.battle.findFirst();

      expect(res.status).toEqual(201);
      expect(battle).not.toBeNull();
    });
  });

  describe("GET /battles/:id", () => {
    it("should answer with not null", async () => {
      const user = await userFactory.createLogin();
      const battle = await battleFactory.createBattle(user.id);

      const res = await agent
        .get(`/battles/${battle.id}`)
        .set(user.authorization);

      expect(res.body).not.toBeNull();
    });
  });

  describe("GET /storyBattles/users", () => {
    it("should answer with array.length more than 0", async () => {
      const user = await userFactory.createLogin();
      await battleFactory.createBattle(user.id);

      const res = await agent
        .get("/storyBattles/users")
        .set(user.authorization);

      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("PATCH /battles", () => {
    it("should answer with array.length more than 0", async () => {
      const user = await userFactory.createLogin();
      const battle = await battleFactory.createBattle(user.id);

      const res = await agent
        .patch("/battles")
        .set(user.authorization)
        .send({ id: battle.id, finish: true, wins: true });

      const battleUp = await prisma.battle.findFirst();

      expect(res.status).toEqual(204);
      expect(battleUp.finish).toEqual(true);
      expect(battleUp.wins).toEqual(true);
    });
  });
});
