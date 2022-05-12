import errorFunctions from "../utils/errorFunctions.js";
import userRepository, { InsertUserData } from "./../repositories/userRepository.js";

type insertPartialUserData = Omit<InsertUserData, "level">;

async function create(data: insertPartialUserData) {
  const user = await userRepository.findByEmail(data.email);
  if (user) throw errorFunctions.conflictRequestError("user");

  const createdUser = await userRepository.create({
    ...data,
    level: "0",
  });
}

export default {
  create,
};
