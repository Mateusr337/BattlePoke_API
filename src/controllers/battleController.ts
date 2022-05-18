import { Request, Response } from "express";
import battleService from "../services/battleService.js";

async function create(req: Request, res: Response) {
  const { user1, user2 } = req.body;
  await battleService.create([user1, user2]);

  res.sendStatus(201);
}

export default {
  create,
};
