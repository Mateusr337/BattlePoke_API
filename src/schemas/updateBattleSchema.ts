import joi from "joi";

const BattleUpdateSchema = joi.object({
  id: joi.number().integer().required(),
  wins: joi.boolean(),
  finish: joi.boolean(),
});

export default BattleUpdateSchema;
