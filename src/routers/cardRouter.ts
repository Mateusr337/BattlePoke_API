import { Router } from "express";
import cardController from "../controllers/cardController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";

const cardRouter = Router();

cardRouter.get("/cards", ensureAuthenticatedMiddleware, cardController.find);
cardRouter.get("/cards/user", ensureAuthenticatedMiddleware, cardController.findByUser);

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

export default cardRouter;
