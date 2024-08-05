import { AddressRepository } from "@/repostiories/address-repository";
import { InMemoryAddressRepository } from "@/repostiories/in-memory/in-memory-address-repository";
import { InMemoryOrganizationsRepository } from "@/repostiories/in-memory/in-memory-organizations-repository";
import { InMemoryUserRepository } from "@/repostiories/in-memory/in-memory-user-repository";
import { OrganizationsRepository } from "@/repostiories/organizations-repository";
import { UserRepository } from "@/repostiories/user-repository";
import { hash, hashSync } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { AuthenticateUseCase } from "./authenticate-org-use-case";

let sut: AuthenticateUseCase;
let userRepository: UserRepository;
let organizationRepository: OrganizationsRepository;
let addressRepository: AddressRepository;

describe("Authenticate use case", () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository();
    userRepository = new InMemoryUserRepository();
    sut = new AuthenticateUseCase(organizationRepository, userRepository);
    addressRepository = new InMemoryAddressRepository();

    InMemoryAddressRepository.items = [];
  });

  it("Should be able to authenticate with a organization", async () => {
    const user = await userRepository.register({
      email: "john.doe@example.com",
      password_hash: hashSync("password123", 6),
      id: 123,
    });
    const fakeAddress = await addressRepository.create({
      street: "Rua 123",
      number: "123",
      city: "Cidade Teste",
      state: "SP",
      zipCode: "",
    });

    await organizationRepository.register({
      address_id: fakeAddress.id,
      email: user.email,
      responsible: "John Snow",
      whatsapp: "999999999",
      id: "test123",
      user_id: user.id,
    });

    const { organization } = await sut.execute({
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(organization).toEqual(
      expect.objectContaining({
        id: "test123",
      })
    );
  });

  it("Should not be able to authenticate with email incorrect", async () => {
    const user = await userRepository.register({
      email: "john123@example.com",
      password_hash: hashSync("password123", 6),
      id: 123,
    });

    const fakeAddress = await addressRepository.create({
      street: "Rua 123",
      number: "123",
      city: "Cidade Teste",
      state: "SP",
      zipCode: "",
    });

    await organizationRepository.register({
      address_id: fakeAddress.id,
      email: user.email,
      responsible: "John Snow",
      whatsapp: "999999999",
      id: "test123",
      user_id: user.id,
    });

    await expect(
      sut.execute({
        email: "john.doe@example.com",
        password: "password123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not be able to authenticate with password incorrect", async () => {
    const user = await userRepository.register({
      email: "john123@example.com",
      password_hash: await hash("password123", 6),
      id: 123,
    });

    const fakeAddress = await addressRepository.create({
      street: "Rua 123",
      number: "123",
      city: "Cidade Teste",
      state: "SP",
      zipCode: "",
    });

    await organizationRepository.register({
      address_id: fakeAddress.id,
      email: user.email,
      responsible: "John Snow",
      whatsapp: "999999999",
      id: "test123",
      user_id: user.id,
    });

    await expect(
      sut.execute({
        email: "john123@example.com",
        password: "1234",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
