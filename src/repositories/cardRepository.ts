import { Pokemon, PokemonLevel, PokemonType, PokemonUser } from "@prisma/client";
import { prisma } from "../database.js";

export type PokemonUserInsertData = Omit<PokemonUser, "id">;
export type LevelsBattles = 1 | 2 | 3;

interface FormattedPokemon {
  id: number;
  imageURL: string;
  name: string;
  pokemonLevel: PokemonLevel;
  pokemonTypes: Array<PokemonType>;
}

function formatPokemons(pokemons: Array<any>): Array<FormattedPokemon> {
  const formatted = pokemons.map((card: any) => ({
    id: card.id as number,
    imageURL: card.imageURL as string,
    name: card.name as string,
    attack: card.attack as number,
    life: card.life as number,

    pokemonLevel: card.pokemonLevel as PokemonLevel,

    pokemonTypes: card.PokemonTypePokemon.map(
      (types: any) => types.pokemonType
    ) as Array<PokemonType>,
  }));

  return formatted;
}

async function find() {
  const cards = await prisma.pokemon.findMany({
    include: {
      pokemonLevel: {},
      PokemonTypePokemon: {
        include: {
          pokemonType: {},
        },
      },
    },
  });

  return formatPokemons(cards);
}

async function findByUser(id: number) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      PokemonUser: {
        include: {
          pokemon: {
            include: {
              pokemonLevel: {},
              PokemonTypePokemon: {
                include: {
                  pokemonType: {},
                },
              },
            },
          },
        },
      },
    },
  });

  const pokemons = user.PokemonUser.map(
    (pokemonUser: PokemonUser & { pokemon: Pokemon }) => pokemonUser.pokemon
  );

  return formatPokemons(pokemons);
}

async function createPokemonUser(data: Array<PokemonUserInsertData>) {
  await prisma.pokemonUser.createMany({ data });
}

async function findPokemonsBattleByLevel(level: LevelsBattles) {
  const cards = await prisma.pokemonBattle.findMany({
    where: { level },
    include: {
      pokemon: {
        include: {
          PokemonTypePokemon: {
            include: {
              pokemonType: {},
            },
          },
          pokemonLevel: {},
        },
      },
    },
  });
  return formatPokemons(cards);
}

export default {
  findByUser,
  find,
  createPokemonUser,
  findPokemonsBattleByLevel,
};
