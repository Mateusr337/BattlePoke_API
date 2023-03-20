import joi from "joi";
var authSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});
export default authSchema;
