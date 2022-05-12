import { Request, Response } from "express";
import userService from "../services/userService.js";

async function create(req: Request, res: Response) {
  const { body } = req;
  await userService.create(body);

  res.sendStatus(201);
}

export default {
  create,
};
