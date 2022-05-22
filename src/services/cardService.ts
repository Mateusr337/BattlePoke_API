import {
  LevelsBattles,
  PokemonUserInsertData,
} from "./../repositories/cardRepository.js";
import cardRepository from "../repositories/cardRepository.js";
import battlePokemonRepository from "../repositories/battlePokemonRepository.js";
import pokemonUserRepository from "../repositories/pokemonUserRepository.js";
import userRepository from "../repositories/userRepository.js";
import userService from "./userService.js";

async function findByUser(userId: number) {
  const cards = await cardRepository.findByUser(userId);
  return cards;
}

async function find() {
  const cards = await cardRepository.find();
  return cards;
}

async function createPokemonUser(userId: number, pokemonsIds: Array<number>) {
  const pokemonsUsersData: Array<PokemonUserInsertData> = pokemonsIds.map(
    (id) => {
      return { userId, pokemonId: id };
    }
  );

  await cardRepository.createPokemonUser(pokemonsUsersData);
}

async function findPokemonsByLevel(level: LevelsBattles) {
  const pokemons = await cardRepository.findPokemonsBattleByLevel(level);
  return pokemons;
}

async function findByBattleId(battleId: number) {
  const battlesPokemons = await battlePokemonRepository.findByBattleId(
    battleId
  );

  let cards = [];

  for (let battlePokemon of battlesPokemons) {
    const card = await cardRepository.findById(battlePokemon.pokemonId);
    cards.push(card);
  }

  return cards;
}

async function findByName(name: string) {
  const pokemon = await cardRepository.findByName(name);
  return pokemon;
}

async function evolution(userId: number, pokemonId: number) {
  const pokemonUser = await pokemonUserRepository.find(userId, pokemonId);
  const { evolution: evolutionName } = await cardRepository.findById(pokemonId);
  const evolution = await cardRepository.findByName(evolutionName);

  await pokemonUserRepository.update(
    { pokemonId: evolution.id },
    pokemonUser.id
  );

  const user = await userService.findById(userId);
  await userRepository.update({ points: user.points - 5 }, userId);

  return evolution;
}

export default {
  findByUser,
  find,
  createPokemonUser,
  findPokemonsByLevel,
  findByBattleId,
  findByName,
  evolution,
};
