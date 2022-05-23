import { Router } from "express";
import cardController from "../controllers/cardController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import evolutionSchema from "../schemas/evolutionSchema.js";

const cardRouter = Router();

cardRouter.get("/cards", ensureAuthenticatedMiddleware, cardController.find);

cardRouter.get(
  "/cards/user",
  ensureAuthenticatedMiddleware,
  cardController.findByUser
);

cardRouter.get(
  "/cards/battles/:battleLevel",
  ensureAuthenticatedMiddleware,
  cardController.findPokemonsByLevel
);

cardRouter.post(
  "/cards",
  ensureAuthenticatedMiddleware,
  cardController.createPokemonUser
);

cardRouter.get(
  "/cards/users/battles/:battleId",
  ensureAuthenticatedMiddleware,
  cardController.findByBattleId
);

cardRouter.get(
  "/cards/:name",
  ensureAuthenticatedMiddleware,
  cardController.findByName
);

cardRouter.patch(
  "/cards/evolution",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(evolutionSchema),
  cardController.evolution
);

cardRouter.delete(
  "/cards/:id",
  ensureAuthenticatedMiddleware,
  cardController.remove
);

export default cardRouter;
