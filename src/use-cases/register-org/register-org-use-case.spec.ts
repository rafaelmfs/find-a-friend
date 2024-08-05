import { AddressRepository } from "@/repostiories/address-repository";
import { InMemoryAddressRepository } from "@/repostiories/in-memory/in-memory-address-repository";
import { InMemoryOrganizationsRepository } from "@/repostiories/in-memory/in-memory-organizations-repository";
import { InMemoryUserRepository } from "@/repostiories/in-memory/in-memory-user-repository";
import { OrganizationsRepository } from "@/repostiories/organizations-repository";
import { UserRepository } from "@/repostiories/user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateUserUseCase } from "../create-user/create-user-use-case";
import { EmailAlreadyExistsError } from "../errors/email-already-exists-error";
import {
  RegisterOrganizationUseCase,
  RegisterOrganizationUseCaseRequest,
} from "./register-org-use-case";

let orgRepository: OrganizationsRepository;
let userRepository: UserRepository;
let sut: RegisterOrganizationUseCase;
let createUserUseCase: CreateUserUseCase;
let addressRepository: AddressRepository;

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
    addressRepository = new InMemoryAddressRepository();
    sut = new RegisterOrganizationUseCase(orgRepository, createUserUseCase);

    InMemoryAddressRepository.items = [];
  });

  it("Shoud be able to register a org", async () => {
    const address = await addressRepository.create(fakeAddrees);
    const { org } = await sut.execute({
      address_id: address.id,
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
    const address = await addressRepository.create(fakeAddrees);

    await sut.execute({
      address_id: address.id,
      email: "test@test.com",
      responsible: "John Snow",
      whatsapp: "999999999",
      password: "test123",
      id: "test123",
    });

    await expect(
      sut.execute({
        address_id: address.id,
        email: "test@test.com",
        responsible: "John Doe",
        whatsapp: "123456789",
        password: "test123",
        id: "test456",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });

  it("Shoud not be able to register a org without address", async () => {
    const request = {
      email: "test@test.com",
      responsible: "John Doe",
      whatsapp: "123456789",
      password: "test123",
      id: "test456",
    } as RegisterOrganizationUseCaseRequest;
    await expect(sut.execute(request)).rejects.toBeInstanceOf(Error);
  });

  it("Shoud not be able to register a org without whatsapp number", async () => {
    const address = await addressRepository.create(fakeAddrees);

    await expect(
      sut.execute({
        address_id: address.id,
        email: "test@test.com",
        responsible: "John Doe",
        whatsapp: "",
        password: "test123",
        id: "test456",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
