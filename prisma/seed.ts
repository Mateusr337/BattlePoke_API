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

  await prisma.pokemonLevel.createMany({ data });
}

export default async function seed() {
  pokemonTypes.map(async (type: string) => {
    await prisma.type.upsert({
      where: { name: type },
      update: {},
      create: { name: type },
    });
  });

  pokemonLevels.map(async (level) => {
    await prisma.category.upsert({
      where: { name: level.name },
      update: {},
      create: {
        name: level.name,
        number: `${level.number}`,
      },
    });
  });

  await prisma.$executeRaw`TRUNCATE TABLE "pokemonsTypes"`;

  pokemons.map(async (pokemon) => {
    const { id } = await prisma.category.findUnique({
      where: { number: `${pokemon.levelNumber}` },
    });

    delete pokemon.levelNumber;

    const createdPokemon = await prisma.pokemon.upsert({
      where: { name: pokemon.name },
      update: { ...pokemon },
      create: {
        ...pokemon,
        categoryId: id,
      },
    });

    const typesOfPokemon = pokemonsTypesTable.filter(
      (pokemonType) => pokemonType.name === pokemon.name
    );

    typesOfPokemon.map(async (type) => {
      const { id: typeId } = await prisma.type.findUnique({
        where: { name: type.typeName },
      });

      const result = await prisma.pokemonType.create({
        data: {
          pokemonId: createdPokemon.id,
          typeId: typeId,
        },
      });
    });
  });

  await prisma.$executeRaw`TRUNCATE TABLE "pokemonsLevels"`;

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

  await insertPokemonsBattles(pokemonsData, 3);

  pokemonsData = [
    await getPokemonByName("meowth"),
    await getPokemonByName("raichu"),
    await getPokemonByName("mewtwo"),
  ];

  await insertPokemonsBattles(pokemonsData, 4);

  pokemonsData = [
    await getPokemonByName("snorlax"),
    await getPokemonByName("raichu"),
    await getPokemonByName("charizard"),
  ];

  await insertPokemonsBattles(pokemonsData, 5);

  pokemonsData = [
    await getPokemonByName("snorlax"),
    await getPokemonByName("mewtwo"),
    await getPokemonByName("charizard"),
  ];

  await insertPokemonsBattles(pokemonsData, 6);

  pokemonsData = [
    await getPokemonByName("ninetales"),
    await getPokemonByName("mewtwo"),
    await getPokemonByName("charizard"),
  ];

  await insertPokemonsBattles(pokemonsData, 7);

  pokemonsData = [
    await getPokemonByName("zubat"),
    await getPokemonByName("mewtwo"),
    await getPokemonByName("snorlax"),
    await getPokemonByName("caterpie"),
  ];

  await insertPokemonsBattles(pokemonsData, 8);
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
