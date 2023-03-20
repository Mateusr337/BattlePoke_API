import joi from "joi";
var battleSchema = joi.object({
    level: joi.number().integer().required(),
    pokemonsIds: joi.array().items(joi.number().integer()).required()
});
export default battleSchema;
