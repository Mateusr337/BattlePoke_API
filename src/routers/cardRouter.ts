import { Router } from "express";
import cardController from "../controllers/cardController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";

const cardRouter = Router();

cardRouter.get("/cards/user", ensureAuthenticatedMiddleware, cardController.findByUser);

export default cardRouter;
