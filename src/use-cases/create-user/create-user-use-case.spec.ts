import { InMemoryUserRepository } from "@/repostiories/in-memory/in-memory-user-repository";
import { UserRepository } from "@/repostiories/user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { EmailAlreadyExistsError } from "../errors/email-already-exists-error";
import { CreateUserUseCase } from "./create-user-use-case";

let userRepository: UserRepository;
let sut: CreateUserUseCase;
describe("Create user use case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new CreateUserUseCase(userRepository);
  });

  it("Shoud be able to create a user", async () => {
    const newUser = {
      email: "john.doe@example.com",
      password: "password123",
      id: "test123",
    };
    const userResponse = await sut.execute(newUser);
    const { user } = userResponse;

    expect(user.id).toEqual(newUser.id);
    expect(user.email).toBe(newUser.email);
  });

  it("Shoud not be able to create a user with existent email", async () => {
    const newUser = {
      email: "john.doe@example.com",
      password: "password123",
      id: "test123",
    };
    await sut.execute(newUser);

    await expect(
      sut.execute({
        email: "john.doe@example.com",
        password: "newpassword123",
        id: "test456",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });
});
