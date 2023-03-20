var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { pokemonLevels, pokemons, pokemonsTypesTable, pokemonTypes, } from "./constants.js";
import { prisma } from "../src/database.js";
function getPokemonByName(name) {
    return __awaiter(this, void 0, void 0, function () {
        var pokemon;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.pokemon.findUnique({ where: { name: name } })];
                case 1:
                    pokemon = _a.sent();
                    return [2 /*return*/, pokemon];
            }
        });
    });
}
function insertPokemonsBattles(listOfPokemons, numberOfLevel) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = listOfPokemons.map(function (pokemon) {
                        return {
                            level: numberOfLevel,
                            pokemonId: pokemon.id
                        };
                    });
                    return [4 /*yield*/, prisma.pokemonLevel.createMany({ data: data })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export default function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var pokemonsData, _a, _b, _c, _d, _e, _f, _g, _h;
        var _this = this;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    pokemonTypes.map(function (type) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.type.upsert({
                                        where: { name: type },
                                        update: {},
                                        create: { name: type }
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    pokemonLevels.map(function (level) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.category.upsert({
                                        where: { name: level.name },
                                        update: {},
                                        create: {
                                            name: level.name,
                                            number: "".concat(level.number)
                                        }
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, prisma.$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["TRUNCATE TABLE \"pokemonsTypes\""], ["TRUNCATE TABLE \"pokemonsTypes\""])))];
                case 1:
                    _j.sent();
                    pokemons.map(function (pokemon) { return __awaiter(_this, void 0, void 0, function () {
                        var id, createdPokemon, typesOfPokemon;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.category.findUnique({
                                        where: { number: "".concat(pokemon.levelNumber) }
                                    })];
                                case 1:
                                    id = (_a.sent()).id;
                                    delete pokemon.levelNumber;
                                    return [4 /*yield*/, prisma.pokemon.upsert({
                                            where: { name: pokemon.name },
                                            update: __assign({}, pokemon),
                                            create: __assign(__assign({}, pokemon), { categoryId: id })
                                        })];
                                case 2:
                                    createdPokemon = _a.sent();
                                    typesOfPokemon = pokemonsTypesTable.filter(function (pokemonType) { return pokemonType.name === pokemon.name; });
                                    typesOfPokemon.map(function (type) { return __awaiter(_this, void 0, void 0, function () {
                                        var typeId, result;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, prisma.type.findUnique({
                                                        where: { name: type.typeName }
                                                    })];
                                                case 1:
                                                    typeId = (_a.sent()).id;
                                                    return [4 /*yield*/, prisma.pokemonType.create({
                                                            data: {
                                                                pokemonId: createdPokemon.id,
                                                                typeId: typeId
                                                            }
                                                        })];
                                                case 2:
                                                    result = _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, prisma.$executeRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["TRUNCATE TABLE \"pokemonsLevels\""], ["TRUNCATE TABLE \"pokemonsLevels\""])))];
                case 2:
                    _j.sent();
                    return [4 /*yield*/, getPokemonByName("charmander")];
                case 3:
                    _a = [
                        _j.sent()
                    ];
                    return [4 /*yield*/, getPokemonByName("eevee")];
                case 4:
                    _a = _a.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, getPokemonByName("caterpie")];
                case 5:
                    pokemonsData = _a.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, insertPokemonsBattles(pokemonsData, 1)];
                case 6:
                    _j.sent();
                    return [4 /*yield*/, getPokemonByName("wartortle")];
                case 7:
                    _b = [
                        _j.sent()
                    ];
                    return [4 /*yield*/, getPokemonByName("zubat")];
                case 8:
                    _b = _b.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, getPokemonByName("bulbasaur")];
                case 9:
                    pokemonsData = _b.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, insertPokemonsBattles(pokemonsData, 2)];
                case 10:
                    _j.sent();
                    return [4 /*yield*/, getPokemonByName("zubat")];
                case 11:
                    _c = [
                        _j.sent()
                    ];
                    return [4 /*yield*/, getPokemonByName("ivysaur")];
                case 12:
                    _c = _c.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, getPokemonByName("gyarados")];
                case 13:
                    pokemonsData = _c.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, insertPokemonsBattles(pokemonsData, 3)];
                case 14:
                    _j.sent();
                    return [4 /*yield*/, getPokemonByName("meowth")];
                case 15:
                    _d = [
                        _j.sent()
                    ];
                    return [4 /*yield*/, getPokemonByName("raichu")];
                case 16:
                    _d = _d.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, getPokemonByName("mewtwo")];
                case 17:
                    pokemonsData = _d.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, insertPokemonsBattles(pokemonsData, 4)];
                case 18:
                    _j.sent();
                    return [4 /*yield*/, getPokemonByName("snorlax")];
                case 19:
                    _e = [
                        _j.sent()
                    ];
                    return [4 /*yield*/, getPokemonByName("raichu")];
                case 20:
                    _e = _e.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, getPokemonByName("charizard")];
                case 21:
                    pokemonsData = _e.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, insertPokemonsBattles(pokemonsData, 5)];
                case 22:
                    _j.sent();
                    return [4 /*yield*/, getPokemonByName("snorlax")];
                case 23:
                    _f = [
                        _j.sent()
                    ];
                    return [4 /*yield*/, getPokemonByName("mewtwo")];
                case 24:
                    _f = _f.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, getPokemonByName("charizard")];
                case 25:
                    pokemonsData = _f.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, insertPokemonsBattles(pokemonsData, 6)];
                case 26:
                    _j.sent();
                    return [4 /*yield*/, getPokemonByName("ninetales")];
                case 27:
                    _g = [
                        _j.sent()
                    ];
                    return [4 /*yield*/, getPokemonByName("mewtwo")];
                case 28:
                    _g = _g.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, getPokemonByName("charizard")];
                case 29:
                    pokemonsData = _g.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, insertPokemonsBattles(pokemonsData, 7)];
                case 30:
                    _j.sent();
                    return [4 /*yield*/, getPokemonByName("zubat")];
                case 31:
                    _h = [
                        _j.sent()
                    ];
                    return [4 /*yield*/, getPokemonByName("mewtwo")];
                case 32:
                    _h = _h.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, getPokemonByName("snorlax")];
                case 33:
                    _h = _h.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, getPokemonByName("caterpie")];
                case 34:
                    pokemonsData = _h.concat([
                        _j.sent()
                    ]);
                    return [4 /*yield*/, insertPokemonsBattles(pokemonsData, 8)];
                case 35:
                    _j.sent();
                    return [2 /*return*/];
            }
        });
    });
}
seed()["catch"](function (e) {
    console.log(e);
    process.exit(1);
})["finally"](function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var templateObject_1, templateObject_2;
