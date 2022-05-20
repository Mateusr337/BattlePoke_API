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

async function findByIdOrFail(req: Request, res: Response) {
  const { user } = res.locals;
  if (!user) errorFunctions.notFoundError("user");

  res.send(user);
}

async function responseToken(req: Request, res: Response) {
  res.sendStatus(200);
}

async function updateLevel(req: Request, res: Response) {
  const { level } = req.body;
  const { user } = res.locals;

  await userService.updateLevel(user.id, level);
  res.sendStatus(204);
}

export default {
  create,
  valid,
  responseToken,
  findByIdOrFail,
  updateLevel,
};
