import joi, { number } from "joi";

const battleSchema = joi.object({
  user1: joi
    .object({
      id: joi.number().integer().required(),
      pokemonIds: joi.array().items(joi.number().integer()).required(),
    })
    .required(),

  user2: joi.object({
    id: joi.number().integer().required(),
    pokemonIds: joi.array().items(joi.number().integer()).required(),
  }),
});

export default battleSchema;
