import { Request, Response } from "express";
import cardService from "../services/cardService.js";

async function findByUser(req: Request, res: Response) {
  const { user } = res.locals;
  const cards = await cardService.findByUser(user.id);

  res.send(cards);
}

export default {
  findByUser,
};
