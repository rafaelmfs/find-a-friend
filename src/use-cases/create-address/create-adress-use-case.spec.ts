import { AddressRepository } from "@/repostiories/address-repository";
import { InMemoryAddressRepository } from "@/repostiories/in-memory/in-memory-address-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateAddressUseCase } from "./create-address-use-case";

let addressRepository: AddressRepository;
let sut: CreateAddressUseCase;
describe("Create address use case", () => {
  beforeEach(() => {
    addressRepository = new InMemoryAddressRepository();
    sut = new CreateAddressUseCase(addressRepository);
  });

  it("Shoud be able to create a address", async () => {
    const { address } = await sut.execute({
      zipCode: "12345-678",
      street: "Main St",
      number: "123",
      state: "NY",
      city: "New York",
    });

    expect(address.zipCode).to.equal("12345-678");
  });
});
