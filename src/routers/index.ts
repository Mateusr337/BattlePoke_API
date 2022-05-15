import { Router } from "express";
import cardsRouter from "./cardRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(cardsRouter);

// if (process.env.NODE_ENV === "test") {
//   router.use(e2eRouter);
// }
export default router;
