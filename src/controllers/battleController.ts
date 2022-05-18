import { Request, Response } from "express";
import battleService from "../services/battleService.js";

async function create(req: Request, res: Response) {
  const { pokemonsIds, level } = req.body;
  const { user } = res.locals;

  const battle = await battleService.create(level, user.id, pokemonsIds);
  res.status(201).send(battle);
}

async function findById(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  const battle = await battleService.findById(id);
  res.send(battle);
}

export default {
  create,
  findById,
};
