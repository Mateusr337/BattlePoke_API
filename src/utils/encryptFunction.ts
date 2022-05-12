import bcrypt from "bcrypt";
import errors from "./errorFunctions.js";

function encryptData(data: string) {
  const encrypted = bcrypt.hashSync(data, 10);
  return encrypted;
}

async function compareEncrypted(data: string, hash: string) {
  const match = await bcrypt.compare(data, hash);
  if (!match) throw errors.unauthorizedError("e-mail or password");
}

const encryptFunctions = {
  encryptData,
  compareEncrypted,
};

export default encryptFunctions;
