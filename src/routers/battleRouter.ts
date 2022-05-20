import { Router } from "express";
import battleController from "../controllers/battleController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import battleSchema from "../schemas/battleSchema.js";
import BattleUpdateSchema from "../schemas/updateBattleSchema.js";

const battleRouter = Router();

battleRouter.post(
  "/battles",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(battleSchema),
  battleController.create
);

battleRouter.patch(
  "/battles",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(BattleUpdateSchema),
  battleController.update
);

battleRouter.get(
  "/battles/:id",
  ensureAuthenticatedMiddleware,
  battleController.findById
);

battleRouter.get(
  "/storyBattles/users",
  ensureAuthenticatedMiddleware,
  battleController.findByUser
);

export default battleRouter;
