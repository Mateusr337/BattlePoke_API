var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import supertest from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import battleFactory from "../factories/battleFactory.js";
import pokemonsFactory from "../factories/pokemonsFactory.js";
import userFactory from "../factories/userFactory.js";
afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var truncate = function (table) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$executeRawUnsafe("TRUNCATE TABLE \"".concat(table, "\" CASCADE"))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var agent = supertest(app);
describe("users", function () {
    describe("POST /users", function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, truncate("users")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should answer with status code 201", function () { return __awaiter(void 0, void 0, void 0, function () {
            var userData, res, userCreated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = userFactory.createUserInsertData();
                        delete userData.points;
                        return [4 /*yield*/, agent.post("/users").send(userData)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, prisma.user.findFirst({
                                where: { email: userData.email }
                            })];
                    case 2:
                        userCreated = _a.sent();
                        expect(res.status).toEqual(201);
                        expect(res.body).not.toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("POST /users/login", function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, truncate("users")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should answer with token", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, email, password, id, res, userCreated;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, userFactory.createUser()];
                    case 1:
                        _a = _b.sent(), email = _a.email, password = _a.password, id = _a.id;
                        return [4 /*yield*/, agent.post("/users/login").send({ email: email, password: password })];
                    case 2:
                        res = _b.sent();
                        return [4 /*yield*/, prisma.user.findUnique({ where: { id: id } })];
                    case 3:
                        userCreated = _b.sent();
                        expect(res.body.token.length).toBeGreaterThan(0);
                        expect(userCreated).not.toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("POST /users/validToken", function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, truncate("users")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should answer with session object", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, email, password, id, res, userCreated;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, userFactory.createUser()];
                    case 1:
                        _a = _b.sent(), email = _a.email, password = _a.password, id = _a.id;
                        return [4 /*yield*/, agent.post("/users/login").send({ email: email, password: password })];
                    case 2:
                        res = _b.sent();
                        return [4 /*yield*/, prisma.user.findUnique({ where: { id: id } })];
                    case 3:
                        userCreated = _b.sent();
                        expect(res.body.token).not.toBeNull();
                        expect(userCreated).not.toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GET /users", function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, truncate("users")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should answer with user data", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userFactory.createLogin()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, agent.get("/users").set(user.authorization)];
                    case 2:
                        res = _a.sent();
                        expect(res.body.id).not.toBeNull();
                        expect(res.status).toEqual(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("PACTH /users/upLevels", function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, truncate("users")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should answer with status code 204", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, res, userUpLevel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userFactory.createLogin()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, agent
                                .patch("/users/upLevels")
                                .send({ level: user.level + 1 })
                                .set(user.authorization)];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, prisma.user.findFirst()];
                    case 3:
                        userUpLevel = _a.sent();
                        expect(res.status).toEqual(204);
                        expect(userUpLevel.level).toEqual(user.level + 1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe("pokemons", function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, truncate("pokemonsUsers")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, truncate("users")];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("GET /cards", function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, truncate("users")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should answer with list of cards", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userFactory.createLogin()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, agent.get("/cards").set(user.authorization)];
                    case 2:
                        res = _a.sent();
                        expect(res.status).toEqual(200);
                        expect(res.body.length).toBeGreaterThan(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("POST /cards", function () {
        it("should answer with status code 201", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, res, createdCards;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userFactory.createLogin()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, agent
                                .post("/cards")
                                .set(user.authorization)
                                .send({ cards: [1] })];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, prisma.pokemonUser.findMany()];
                    case 3:
                        createdCards = _a.sent();
                        expect(res.status).toEqual(201);
                        expect(createdCards.length).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GET /cards/user", function () {
        it("should answer with list of cards", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userFactory.createLogin()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, prisma.pokemonUser.create({
                                data: { userId: user.id, pokemonId: 1 }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, agent.get("/cards/user").set(user.authorization)];
                    case 3:
                        res = _a.sent();
                        expect(res.status).toEqual(200);
                        expect(res.body).not.toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GET /cards/battles/:battleLevel", function () {
        it("should answer with list of cards", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, level, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userFactory.createLogin()];
                    case 1:
                        user = _a.sent();
                        level = battleFactory.randomLevel();
                        return [4 /*yield*/, agent
                                .get("/cards/battles/".concat(level))
                                .set(user.authorization)];
                    case 2:
                        res = _a.sent();
                        expect(res.status).toEqual(200);
                        expect(res.body.length).toBeGreaterThan(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GET /cards/users/battles/:battleId", function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, truncate("battles")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should answer with list of cards", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, battle, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userFactory.createLogin()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, battleFactory.createBattle(user.id)];
                    case 2:
                        battle = _a.sent();
                        return [4 /*yield*/, agent
                                .get("/cards/users/battles/".concat(battle.id))
                                .set(user.authorization)];
                    case 3:
                        res = _a.sent();
                        expect(res.status).toEqual(200);
                        expect(res.body.length).toEqual(3);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GET /cards/:name", function () {
        it("should answer with pokemon object", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userFactory.createLogin()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, agent.get("/cards/charizard").set(user.authorization)];
                    case 2:
                        res = _a.sent();
                        expect(res.body).not.toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GET /cards/evolution", function () {
        it("should answer with pokemon id different", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, pokemon, res, pokemonUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userFactory.createLogin(5)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, pokemonsFactory.createPokemonUser("charmander", user.id)];
                    case 2:
                        pokemon = _a.sent();
                        return [4 /*yield*/, agent
                                .patch("/cards/evolution")
                                .set(user.authorization)
                                .send({ pokemonId: pokemon.id })];
                    case 3:
                        res = _a.sent();
                        return [4 /*yield*/, prisma.pokemonUser.findFirst()];
                    case 4:
                        pokemonUser = _a.sent();
                        expect(res.status).toEqual(204);
                        expect(pokemonUser.id).not.toEqual(pokemon.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("DELETE /cards/remove", function () {
        it("should answer with pokemon user empty", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, pokemon, res, pokemnosUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userFactory.createLogin()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, pokemonsFactory.createPokemonUser("eevee", user.id)];
                    case 2:
                        pokemon = _a.sent();
                        return [4 /*yield*/, agent["delete"]("/cards/".concat(pokemon.id))
                                .set(user.authorization)];
                    case 3:
                        res = _a.sent();
                        return [4 /*yield*/, prisma.pokemonUser.findMany()];
                    case 4:
                        pokemnosUser = _a.sent();
                        expect(res.status).toEqual(202);
                        expect(pokemnosUser.length).toEqual(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe("battles", function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, truncate("battles")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("POST /battles", function () {
        it("should answer with status code 201", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, level, pokemons, pokemonsIds, res, battle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userFactory.createLogin()];
                    case 1:
                        user = _a.sent();
                        level = battleFactory.randomLevel();
                        return [4 /*yield*/, pokemonsFactory.findPokemons(3)];
                    case 2:
                        pokemons = _a.sent();
                        pokemonsIds = pokemons.map(function (pokemon) { return pokemon.id; });
                        return [4 /*yield*/, agent
                                .post("/battles")
                                .set(user.authorization)
                                .send({ level: level, pokemonsIds: pokemonsIds })];
                    case 3:
                        res = _a.sent();
                        return [4 /*yield*/, prisma.battle.findFirst()];
                    case 4:
                        battle = _a.sent();
                        expect(res.status).toEqual(201);
                        expect(battle).not.toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GET /battles/:id", function () {
        it("should answer with not null", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, battle, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userFactory.createLogin()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, battleFactory.createBattle(user.id)];
                    case 2:
                        battle = _a.sent();
                        return [4 /*yield*/, agent
                                .get("/battles/".concat(battle.id))
                                .set(user.authorization)];
                    case 3:
                        res = _a.sent();
                        expect(res.body).not.toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GET /storyBattles/users", function () {
        it("should answer with array.length more than 0", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userFactory.createLogin()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, battleFactory.createBattle(user.id)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, agent
                                .get("/storyBattles/users")
                                .set(user.authorization)];
                    case 3:
                        res = _a.sent();
                        expect(res.body.length).toBeGreaterThan(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("PATCH /battles", function () {
        it("should answer with array.length more than 0", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, battle, res, battleUp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userFactory.createLogin()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, battleFactory.createBattle(user.id)];
                    case 2:
                        battle = _a.sent();
                        return [4 /*yield*/, agent
                                .patch("/battles")
                                .set(user.authorization)
                                .send({ id: battle.id, finish: true, wins: true })];
                    case 3:
                        res = _a.sent();
                        return [4 /*yield*/, prisma.battle.findFirst()];
                    case 4:
                        battleUp = _a.sent();
                        expect(res.status).toEqual(204);
                        expect(battleUp.finish).toEqual(true);
                        expect(battleUp.wins).toEqual(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
