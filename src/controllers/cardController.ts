import { Request, Response } from "express";
import cardService from "../services/cardService.js";

async function findByUser(req: Request, res: Response) {
  const { user } = res.locals;
  const cards = await cardService.findByUser(user.id);

  res.send(cards);
}

async function find(req: Request, res: Response) {
  const cards = await cardService.find();
  res.send(cards);
}

async function createPokemonUser(req: Request, res: Response) {
  const { user } = res.locals;
  const pokemonsIds = req.body.cards;

  await cardService.createPokemonUser(user.id, pokemonsIds);
  res.sendStatus(201);
}

export default {
  findByUser,
  createPokemonUser,
  find,
};
