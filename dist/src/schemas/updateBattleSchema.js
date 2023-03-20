import joi from "joi";
var BattleUpdateSchema = joi.object({
    id: joi.number().integer().required(),
    wins: joi.boolean(),
    finish: joi.boolean()
});
export default BattleUpdateSchema;
