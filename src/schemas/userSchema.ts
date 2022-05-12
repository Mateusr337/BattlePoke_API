import joi from "joi";

const userSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.string().required(),
  password: joi.string().required(),
  imageURL: joi.string().uri().required(),
});

export default userSchema;
