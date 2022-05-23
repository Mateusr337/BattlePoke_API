import { LevelsBattles } from "./../repositories/cardRepository";
import { User } from "@prisma/client";
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

async function findByBattleId(req: Request, res: Response) {
  const battleId = parseInt(req.params.battleId);

  const cards = await cardService.findByBattleId(battleId);
  res.send(cards);
}

async function findByName(req: Request, res: Response) {
  const { name } = req.params;

  const card = await cardService.findByName(name);
  res.send(card);
}

async function evolution(req: Request, res: Response) {
  const { pokemonId } = req.body;
  const { user } = res.locals;

  const newCard = await cardService.evolution(user.id, pokemonId);
  res.status(204).send(newCard);
}

async function remove(req: Request, res: Response) {
  const pokemonId = parseInt(req.params.id);
  const { user } = res.locals;

  await cardService.remove(user.id, pokemonId);
  res.sendStatus(202);
}

export default {
  findByUser,
  createPokemonUser,
  find,
  findPokemonsByLevel,
  findByBattleId,
  findByName,
  evolution,
  remove,
};
