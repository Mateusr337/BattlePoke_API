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

describe("POST /users/login", () => {
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

describe("function findById", () => {
  it("should answer with status code 409", async () => {
    const user = await userFactory.createUser();

    const spy = jest
      .spyOn(userRepository, "findById")
      .mockResolvedValueOnce(null);
    await userService.findById(user.id);

    expect(spy).toBeCalledWith(user.id);
  });
});
