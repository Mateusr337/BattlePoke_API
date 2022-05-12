import joi from "joi";

const authSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export default authSchema;
