import joi from "joi";
var evolutionSchema = joi.object({
    pokemonId: joi.number().integer().required()
});
export default evolutionSchema;
