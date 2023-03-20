import { Router } from "express";
import battleRouter from "./battleRouter.js";
import cardsRouter from "./cardRouter.js";
import userRouter from "./userRouter.js";
var router = Router();
router.use(userRouter);
router.use(cardsRouter);
router.use(battleRouter);
// if (process.env.NODE_ENV === "test") {
//   router.use(e2eRouter);
// }
export default router;
