import { Address } from "@/interfaces/Address";
import { InMemoryOrganizationsRepository } from "@/repostiories/in-memory/in-memory-organizations-repository";
import { InMemoryUserRepository } from "@/repostiories/in-memory/in-memory-user-repository";
import { OrganizationsRepository } from "@/repostiories/organizations-repository";
import { UserRepository } from "@/repostiories/user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateUserUseCase } from "../create-user/create-user-use-case";
import { EmailAlreadyExistsError } from "../errors/email-already-exists-error";
import { RegisterOrganizationUseCase } from "./register-org-use-case";

let orgRepository: OrganizationsRepository;
let userRepository: UserRepository;
let sut: RegisterOrganizationUseCase;
let createUserUseCase: CreateUserUseCase;

const fakeAddrees = {
  zipCode: "333333",
  city: "London",
  state: "London",
  street: "Fake Street",
  number: "123",
};
describe("Register Org", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrganizationsRepository();
    userRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
    sut = new RegisterOrganizationUseCase(orgRepository, createUserUseCase);
  });

  it("Shoud be able to register a org", async () => {
    const { org } = await sut.execute({
      address: {
        zipCode: "333333",
        city: "London",
        state: "London",
        street: "Fake Street",
        number: "123",
      },
      email: "test@test.com",
      responsible: "John Doe",
      whatsapp: "123456789",
      password: "test123",
      id: "test123",
    });

    expect(org).toEqual(
      expect.objectContaining({
        id: "test123",
      })
    );
  });

  it("Shoud not be able to register a org with existent email", async () => {
    await sut.execute({
      address: fakeAddrees,
      email: "test@test.com",
      responsible: "John Snow",
      whatsapp: "999999999",
      password: "test123",
      id: "test123",
    });

    await expect(
      sut.execute({
        address: fakeAddrees,
        email: "test@test.com",
        responsible: "John Doe",
        whatsapp: "123456789",
        password: "test123",
        id: "test456",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });

  it("Shoud not be able to register a org without address", async () => {
    const emptyAddress = {} as Address;

    await expect(
      sut.execute({
        address: emptyAddress,
        email: "test@test.com",
        responsible: "John Doe",
        whatsapp: "123456789",
        password: "test123",
        id: "test456",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("Shoud not be able to register a org without whatsapp number", async () => {
    await expect(
      sut.execute({
        address: fakeAddrees,
        email: "test@test.com",
        responsible: "John Doe",
        whatsapp: "",
        password: "test123",
        id: "test456",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
