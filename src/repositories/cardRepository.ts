import { Category, Pokemon, PokemonUser, Type } from "@prisma/client";
import { prisma } from "../database.js";

export type PokemonUserInsertData = Omit<PokemonUser, "id">;
export type LevelsBattles = 1 | 2 | 3;

interface FormattedPokemon {
  id: number;
  imageURL: string;
  name: string;
  category: Category;
  evolution: string;
  types: Array<Type>;
}

function formatPokemons(pokemons: Array<any>): Array<FormattedPokemon> {
  const formatted = pokemons.map((card: any) => ({
    id: card.id as number,
    imageURL: card.imageURL as string,
    name: card.name as string,
    attack: card.attack as number,
    evolution: card.evolution as string | null,
    life: card.life as number,

    category: card.category as Category,

    types: card.pokemonType.map(
      (pokemonsTypes: any) => pokemonsTypes.type
    ) as Array<Type>,
  }));

  return formatted;
}

async function find() {
  const cards = await prisma.pokemon.findMany({
    include: {
      category: {},
      pokemonType: {
        include: {
          type: {},
        },
      },
    },
  });

  return formatPokemons(cards);
}

async function findById(id: number) {
  const cards = await prisma.pokemon.findUnique({
    where: { id },
    include: {
      category: {},
      pokemonType: {
        include: {
          type: {},
        },
      },
    },
  });

  return formatPokemons([cards])[0];
}

async function findByName(name: string) {
  const cards = await prisma.pokemon.findFirst({
    where: { name },
    include: {
      category: {},
      pokemonType: {
        include: {
          type: {},
        },
      },
    },
  });

  return formatPokemons([cards])[0];
}

async function findByUser(id: number) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      PokemonUser: {
        include: {
          pokemon: {
            include: {
              category: {},
              pokemonType: {
                include: {
                  type: {},
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
  const cards = await prisma.pokemonLevel.findMany({
    where: { level },
    include: {
      pokemon: {
        include: {
          pokemonType: {
            include: {
              type: {},
            },
          },
          category: {},
        },
      },
    },
  });

  const pokemons = cards.map((card) => card.pokemon);
  return formatPokemons(pokemons);
}

export default {
  findByUser,
  find,
  createPokemonUser,
  findPokemonsBattleByLevel,
  findById,
  findByName,
};
