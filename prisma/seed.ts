import {
  pokemonLevels,
  pokemons,
  pokemonsTypesTable,
  pokemonTypes,
} from "./constants.js";
import { prisma } from "../src/database.js";
import { Pokemon } from "@prisma/client";

async function getPokemonByName(name: string) {
  const pokemon = await prisma.pokemon.findUnique({ where: { name } });
  return pokemon;
}

async function insertPokemonsBattles(
  listOfPokemons: Array<Pokemon>,
  numberOfLevel: number
) {
  const data = listOfPokemons.map((pokemon) => {
    return {
      level: numberOfLevel,
      pokemonId: pokemon.id,
    };
  });

  await prisma.pokemonBattle.createMany({ data });
}

export default async function seed() {
  pokemonTypes.map(async (type: string) => {
    await prisma.pokemonType.upsert({
      where: { name: type },
      update: {},
      create: { name: type },
    });
  });

  pokemonLevels.map(async (level) => {
    await prisma.pokemonLevel.upsert({
      where: { name: level.name },
      update: {},
      create: {
        name: level.name,
        number: `${level.number}`,
      },
    });
  });

  await prisma.$executeRaw`TRUNCATE TABLE "pokemonsTypesPokemons"`;

  pokemons.map(async (pokemon) => {
    const { id } = await prisma.pokemonLevel.findUnique({
      where: { number: `${pokemon.levelNumber}` },
    });

    delete pokemon.levelNumber;

    const createdPokemon = await prisma.pokemon.upsert({
      where: { name: pokemon.name },
      update: {},
      create: {
        ...pokemon,
        pokemonLevelId: id,
      },
    });

    const typesOfPokemon = pokemonsTypesTable.filter(
      (pokemonType) => pokemonType.name === pokemon.name
    );

    typesOfPokemon.map(async (type) => {
      const { id: typeId } = await prisma.pokemonType.findUnique({
        where: { name: type.typeName },
      });

      const result = await prisma.pokemonTypePokemon.create({
        data: {
          pokemonId: createdPokemon.id,
          pokemonTypeId: typeId,
        },
      });
    });
  });

  await prisma.$executeRaw`TRUNCATE TABLE "pokemonsBattles"`;

  let pokemonsData = [
    await getPokemonByName("charmander"),
    await getPokemonByName("eevee"),
    await getPokemonByName("caterpie"),
  ];

  await insertPokemonsBattles(pokemonsData, 1);

  pokemonsData = [
    await getPokemonByName("wartortle"),
    await getPokemonByName("zubat"),
    await getPokemonByName("bulbasaur"),
  ];

  await insertPokemonsBattles(pokemonsData, 2);

  pokemonsData = [
    await getPokemonByName("zubat"),
    await getPokemonByName("ivysaur"),
    await getPokemonByName("gyarados"),
  ];

  await insertPokemonsBattles(pokemonsData, 2);
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
