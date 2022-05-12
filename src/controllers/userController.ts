import { Request, Response } from "express";
import userService from "../services/userService.js";
import errorFunctions from "../utils/errorFunctions.js";

async function create(req: Request, res: Response) {
  const { body } = req;
  await userService.create(body);

  res.sendStatus(201);
}

async function valid(req: Request, res: Response) {
  const { body } = req;
  const token = await userService.validUser(body);

  res.send({ token });
}

async function validSession(req: Request, res: Response) {
  const { token } = req.params;
  console.log(token);
  if (!token) errorFunctions.unauthorizedError("token invalid");

  const session = await userService.validToken(token);
  return session;
}

export default {
  create,
  valid,
  validSession,
};
