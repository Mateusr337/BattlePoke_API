import cardRepository from "../repositories/cardRepository.js";

async function findByUser(userId: number) {
  const cards = await cardRepository.findByUser(userId);
  return cards;
}

export default {
  findByUser,
};
