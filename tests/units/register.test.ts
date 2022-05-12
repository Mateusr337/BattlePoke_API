import userRepository from "../../src/repositories/userRepository";
import userService from "../../src/services/userService";
import userFactory from "../factories/userFactory";
import { jest } from "@jest/globals";
import errorFunctions from "../../src/utils/errorFunctions.js";

describe("POST /users", () => {
  it("should answer with status code 409", async () => {
    const user = {
      id: 1,
      ...userFactory.createUserInsertData(),
      level: "0",
    };

    jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(user);

    expect(async () => {
      await userService.create(user);
    }).rejects.toEqual(errorFunctions.conflictRequestError("user"));
  });
});
