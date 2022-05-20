<<<<<<< HEAD
=======
import { LevelsBattles } from "./../repositories/cardRepository";
import { User } from "@prisma/client";
>>>>>>> 174052bdf463664e1bf0c4f636dccf7e213aeeec
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

async function findPokemonsByLevel(req: Request, res: Response) {
  const level = parseInt(req.params.battleLevel);

  const cards = await cardService.findPokemonsByLevel(level as LevelsBattles);
  res.send(cards);
}

async function findByUserAndBattle(req: Request, res: Response) {
  const { user } = res.locals;
  const battleId = parseInt(req.params.battleId);

  const cards = await cardService.findByUserAndBattle(user.id, battleId);
  res.send(cards);
}

export default {
  findByUser,
  createPokemonUser,
  find,
  findPokemonsByLevel,
  findByUserAndBattle,
};
