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
import cardService from "../services/cardService.js";
function findByUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, cards;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = res.locals.user;
                    return [4 /*yield*/, cardService.findByUser(user.id)];
                case 1:
                    cards = _a.sent();
                    res.send(cards);
                    return [2 /*return*/];
            }
        });
    });
}
function find(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var cards;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardService.find()];
                case 1:
                    cards = _a.sent();
                    res.send(cards);
                    return [2 /*return*/];
            }
        });
    });
}
function createPokemonUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, pokemonsIds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = res.locals.user;
                    pokemonsIds = req.body.cards;
                    return [4 /*yield*/, cardService.createPokemonUser(user.id, pokemonsIds)];
                case 1:
                    _a.sent();
                    res.sendStatus(201);
                    return [2 /*return*/];
            }
        });
    });
}
function findPokemonsByLevel(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var level, cards;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    level = parseInt(req.params.battleLevel);
                    return [4 /*yield*/, cardService.findPokemonsByLevel(level)];
                case 1:
                    cards = _a.sent();
                    res.send(cards);
                    return [2 /*return*/];
            }
        });
    });
}
function findByBattleId(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var battleId, cards;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    battleId = parseInt(req.params.battleId);
                    return [4 /*yield*/, cardService.findByBattleId(battleId)];
                case 1:
                    cards = _a.sent();
                    res.send(cards);
                    return [2 /*return*/];
            }
        });
    });
}
function findByName(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var name, card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = req.params.name;
                    return [4 /*yield*/, cardService.findByName(name)];
                case 1:
                    card = _a.sent();
                    res.send(card);
                    return [2 /*return*/];
            }
        });
    });
}
function evolution(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var pokemonId, user, newCard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pokemonId = req.body.pokemonId;
                    user = res.locals.user;
                    return [4 /*yield*/, cardService.evolution(user.id, pokemonId)];
                case 1:
                    newCard = _a.sent();
                    res.status(204).send(newCard);
                    return [2 /*return*/];
            }
        });
    });
}
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var pokemonId, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pokemonId = parseInt(req.params.id);
                    user = res.locals.user;
                    return [4 /*yield*/, cardService.remove(user.id, pokemonId)];
                case 1:
                    _a.sent();
                    res.sendStatus(202);
                    return [2 /*return*/];
            }
        });
    });
}
export default {
    findByUser: findByUser,
    createPokemonUser: createPokemonUser,
    find: find,
    findPokemonsByLevel: findPokemonsByLevel,
    findByBattleId: findByBattleId,
    findByName: findByName,
    evolution: evolution,
    remove: remove
};
