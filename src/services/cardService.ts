import {
  LevelsBattles,
  PokemonUserInsertData,
} from "./../repositories/cardRepository";
import cardRepository from "../repositories/cardRepository.js";
import battlePokemonRepository from "../repositories/battlePokemonRepository.js";

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

export default {
  findByUser,
  find,
  createPokemonUser,
  findPokemonsByLevel,
  findByBattleId,
  findByName,
};
