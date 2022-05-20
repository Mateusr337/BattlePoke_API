import jwt from "jsonwebtoken";
import encryptFunctions from "../utils/encryptFunction.js";
import errorFunctions from "../utils/errorFunctions.js";
import userRepository, {
  InsertUserData,
} from "./../repositories/userRepository.js";

type insertPartialUserData = Omit<InsertUserData, "level">;
type authUserData = Omit<
  InsertUserData,
  "level" | "imageURL" | "level" | "name"
>;

async function create(data: insertPartialUserData) {
  const user = await userRepository.findByEmail(data.email);
  if (user) throw errorFunctions.conflictRequestError("user");

  data.password = encryptFunctions.encryptData(data.password);

  const createdUser = await userRepository.create({
    ...data,
    level: "0",
  });
}

async function validUser(data: authUserData) {
  const user = await validEmailUser(data.email);

  await encryptFunctions.compareEncrypted(data.password, user.password);

  const expiration = { expiresIn: 60 * 60 * 24 * 30 };
  const token: string = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    expiration
  );

  await userRepository.sessionInsert(token);
  return token;
}

async function validEmailUser(email: string) {
  const user = await userRepository.findByEmail(email);
  if (!user) throw errorFunctions.unauthorizedError("e-mail or password");

  return user;
}

async function findByIdOrFail(id: number) {
  const user = await userRepository.findById(id);
  if (!user) throw errorFunctions.notFoundError("user");

  return user;
}

async function findById(id: number) {
  const user = await userRepository.findById(id);
  return user;
}

async function updateLevel(userId: number, newLevel: string) {
  if (parseInt(newLevel) <= 0 || parseInt(newLevel) > 4) {
    throw errorFunctions.badRequestError("level");
  }
  await userRepository.updateLevel(userId, newLevel);
}

export default {
  create,
  validUser,
  findById,
  findByIdOrFail,
  updateLevel,
};
