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

async function findByUser(req: Request, res: Response) {
  const { user } = res.locals;

  const battles = await battleService.findByUser(user.id);
  res.send(battles);
}

async function update(req: Request, res: Response) {
  const data = req.body;
  const { id } = req.body;

  await battleService.update(id, data);
  res.sendStatus(204);
}

export default {
  create,
  findById,
  findByUser,
  update,
};
