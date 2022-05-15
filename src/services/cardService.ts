import { LevelsBattles, PokemonUserInsertData } from "./../repositories/cardRepository";
import cardRepository from "../repositories/cardRepository.js";

async function findByUser(userId: number) {
  const cards = await cardRepository.findByUser(userId);
  return cards;
}

async function find() {
  const cards = await cardRepository.find();
  return cards;
}

async function createPokemonUser(userId: number, pokemonsIds: Array<number>) {
  const pokemonsUsersData: Array<PokemonUserInsertData> = pokemonsIds.map((id) => {
    return { userId, pokemonId: id };
  });

  await cardRepository.createPokemonUser(pokemonsUsersData);
}

async function findPokemonsByLevel(level: LevelsBattles) {
  const pokemons = await cardRepository.findPokemonsBattleByLevel(level);
  return pokemons;
}

export default {
  findByUser,
  find,
  createPokemonUser,
  findPokemonsByLevel,
};
