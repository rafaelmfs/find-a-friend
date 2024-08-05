import { AddressRepository } from "@/repostiories/address-repository";
import { InMemoryAddressRepository } from "@/repostiories/in-memory/in-memory-address-repository";
import { InMemoryOrganizationsRepository } from "@/repostiories/in-memory/in-memory-organizations-repository";
import { OrganizationsRepository } from "@/repostiories/organizations-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { OrganizationNotFound } from "../errors/organization-not-found";
import { GetOrganizationDetailsUseCase } from "./get-organization-details-use-case";

const fakeAddrees = {
  zipCode: "333333",
  city: "London",
  state: "London",
  street: "Fake Street",
  number: "123",
};

let orgRepository: OrganizationsRepository;
let sut: GetOrganizationDetailsUseCase;
let addressRepository: AddressRepository;

describe("Get org details", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrganizationsRepository();
    sut = new GetOrganizationDetailsUseCase(orgRepository);
    addressRepository = new InMemoryAddressRepository();

    InMemoryAddressRepository.items = [];
  });

  it("Shoud be able to fetch Organization details", async () => {
    const address = await addressRepository.create(fakeAddrees);

    await orgRepository.register({
      address_id: address.id,
      email: "john.doe@example.com",
      id: "test123",
      whatsapp: "+5511999999999",
      responsible: "Jhon doe",
      user_id: 123,
    });

    const response = await sut.execute({
      org_id: "test123",
    });

    expect(response).toEqual(
      expect.objectContaining({
        organization: expect.objectContaining({
          id: "test123",
        }),
      })
    );
  });

  it("Should not be able to fetch organization details to nonexistent organization", async () => {
    await expect(
      sut.execute({
        org_id: "test355",
      })
    ).rejects.toBeInstanceOf(OrganizationNotFound);
  });
});
