import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userService from "../services/userService.js";
import errorFunctions from "../utils/errorFunctions.js";

export async function ensureAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization as string;
  if (!authorization)
    throw errorFunctions.unauthorizedError("Missing authorization header");

  const token = authorization.replace("Bearer ", "");
  if (!token) throw errorFunctions.unauthorizedError("Missing token");

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: number;
    };
    const user = await userService.findById(userId);
    res.locals.user = user;

    next();
  } catch {
    throw errorFunctions.unauthorizedError("Invalid token");
  }
}
