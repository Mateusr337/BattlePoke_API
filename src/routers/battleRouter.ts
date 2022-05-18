import { Router } from "express";
import battleController from "../controllers/battleController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import battleSchema from "../schemas/battleSchema.js";

const battleRouter = Router();

battleRouter.post(
  "/battles",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(battleSchema),
  battleController.create
);

export default battleRouter;
