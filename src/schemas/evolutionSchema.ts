import joi from "joi";

const evolutionSchema = joi.object({
  pokemonId: joi.number().integer().required(),
});

export default evolutionSchema;
