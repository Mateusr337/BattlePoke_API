import { Router } from "express";
import battleRouter from "./battleRouter.js";
import cardsRouter from "./cardRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(cardsRouter);
router.use(battleRouter);

export default router;
