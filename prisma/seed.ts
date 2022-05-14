import {
  pokemonLevels,
  pokemons,
  pokemonsTypesTable,
  pokemonTypes,
} from "./constants.js";
import { prisma } from "../src/database.js";

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

    console.log(createdPokemon);

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

      console.log(result);
    });
  });
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
