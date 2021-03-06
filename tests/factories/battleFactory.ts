import { prisma } from "../../src/database.js";
import pokemonsFactory from "./pokemonsFactory.js";

function randomLevel() {
  return Math.floor(Math.random() * 2) + 1;
}

async function createBattle(userId: number) {
  const battle = await prisma.battle.create({
    data: {
      userId,
      Level: randomLevel(),
      finish: false,
      wins: null,
    },
  });

  const pokemons = await pokemonsFactory.findPokemons(3);

  await prisma.battlePokemon.createMany({
    data: [
      { battleId: battle.id, pokemonId: pokemons[0].id },
      { battleId: battle.id, pokemonId: pokemons[1].id },
      { battleId: battle.id, pokemonId: pokemons[2].id },
    ],
  });

  return battle;
}

export default {
  randomLevel,
  createBattle,
};
