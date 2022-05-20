import { Router } from "express";
import userController from "../controllers/userController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import authSchema from "../schemas/authSchema.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post(
  "/users",
  validateSchemaMiddleware(userSchema),
  userController.create
);
userRouter.get(
  "/users",
  ensureAuthenticatedMiddleware,
  userController.findByIdOrFail
);

userRouter.post(
  "/users/validToken",
  ensureAuthenticatedMiddleware,
  userController.responseToken
);

userRouter.post(
  "/users/login",
  validateSchemaMiddleware(authSchema),
  userController.valid
);

userRouter.patch(
  "/users/upLevels",
  ensureAuthenticatedMiddleware,
  userController.updateLevel
);

export default userRouter;
