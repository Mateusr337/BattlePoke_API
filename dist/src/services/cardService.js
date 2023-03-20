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
import cardRepository from "../repositories/cardRepository.js";
import battlePokemonRepository from "../repositories/battlePokemonRepository.js";
import pokemonUserRepository from "../repositories/pokemonUserRepository.js";
import userRepository from "../repositories/userRepository.js";
import userService from "./userService.js";
function findByUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var cards;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findByUser(userId)];
                case 1:
                    cards = _a.sent();
                    return [2 /*return*/, cards];
            }
        });
    });
}
function find() {
    return __awaiter(this, void 0, void 0, function () {
        var cards;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.find()];
                case 1:
                    cards = _a.sent();
                    return [2 /*return*/, cards];
            }
        });
    });
}
function createPokemonUser(userId, pokemonsIds) {
    return __awaiter(this, void 0, void 0, function () {
        var pokemonsUsersData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pokemonsUsersData = pokemonsIds.map(function (id) {
                        return { userId: userId, pokemonId: id };
                    });
                    return [4 /*yield*/, cardRepository.createPokemonUser(pokemonsUsersData)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function findPokemonsByLevel(level) {
    return __awaiter(this, void 0, void 0, function () {
        var pokemons;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findPokemonsBattleByLevel(level)];
                case 1:
                    pokemons = _a.sent();
                    return [2 /*return*/, pokemons];
            }
        });
    });
}
function findByBattleId(battleId) {
    return __awaiter(this, void 0, void 0, function () {
        var battlesPokemons, cards, _i, battlesPokemons_1, battlePokemon, card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, battlePokemonRepository.findByBattleId(battleId)];
                case 1:
                    battlesPokemons = _a.sent();
                    cards = [];
                    _i = 0, battlesPokemons_1 = battlesPokemons;
                    _a.label = 2;
                case 2:
                    if (!(_i < battlesPokemons_1.length)) return [3 /*break*/, 5];
                    battlePokemon = battlesPokemons_1[_i];
                    return [4 /*yield*/, cardRepository.findById(battlePokemon.pokemonId)];
                case 3:
                    card = _a.sent();
                    cards.push(card);
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, cards];
            }
        });
    });
}
function findByName(name) {
    return __awaiter(this, void 0, void 0, function () {
        var pokemon;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findByName(name)];
                case 1:
                    pokemon = _a.sent();
                    return [2 /*return*/, pokemon];
            }
        });
    });
}
function evolution(userId, pokemonId) {
    return __awaiter(this, void 0, void 0, function () {
        var pokemonUser, evolutionName, evolution, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pokemonUserRepository.find(userId, pokemonId)];
                case 1:
                    pokemonUser = _a.sent();
                    return [4 /*yield*/, cardRepository.findById(pokemonId)];
                case 2:
                    evolutionName = (_a.sent()).evolution;
                    return [4 /*yield*/, cardRepository.findByName(evolutionName)];
                case 3:
                    evolution = _a.sent();
                    return [4 /*yield*/, pokemonUserRepository.update({ pokemonId: evolution.id }, pokemonUser.id)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, userService.findById(userId)];
                case 5:
                    user = _a.sent();
                    return [4 /*yield*/, userRepository.update({ points: user.points - 5 }, userId)];
                case 6:
                    _a.sent();
                    return [2 /*return*/, evolution];
            }
        });
    });
}
function remove(userId, pokemonId) {
    return __awaiter(this, void 0, void 0, function () {
        var pokemonUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pokemonUserRepository.find(userId, pokemonId)];
                case 1:
                    pokemonUser = _a.sent();
                    return [4 /*yield*/, pokemonUserRepository.remove(pokemonUser.id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export default {
    findByUser: findByUser,
    find: find,
    createPokemonUser: createPokemonUser,
    findPokemonsByLevel: findPokemonsByLevel,
    findByBattleId: findByBattleId,
    findByName: findByName,
    evolution: evolution,
    remove: remove
};
