import { AddressRepository } from "@/repostiories/address-repository";
import { InMemoryAddressRepository } from "@/repostiories/in-memory/in-memory-address-repository";
import { InMemoryOrganizationsRepository } from "@/repostiories/in-memory/in-memory-organizations-repository";
import { InMemoryPetRepository } from "@/repostiories/in-memory/in-memory-pet-repository";
import { OrganizationsRepository } from "@/repostiories/organizations-repository";
import { PetRepository } from "@/repostiories/pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterPetUseCase } from "./register-pet-use-case";

let orgRepository: OrganizationsRepository;
let petRepository: PetRepository;
let addressRepository: AddressRepository;
let sut: RegisterPetUseCase;

describe("Register Pet", () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    orgRepository = new InMemoryOrganizationsRepository();
    addressRepository = new InMemoryAddressRepository();
    sut = new RegisterPetUseCase(petRepository, orgRepository);

    InMemoryAddressRepository.items = [];
  });

  it("Shoud be able to register a pet", async () => {
    const address = await addressRepository.create({
      city: "Sao Paulo",
      state: "SP",
      zipCode: "",
      number: "",
      street: "",
    });
    const org = await orgRepository.register({
      address_id: address.id,
      email: "john.doe@example.com",
      id: "test123",
      responsible: "John Doe",
      whatsapp: "+5511999999999",
      user_id: 123,
    });

    const { pet } = await sut.execute({
      name: "Rex",
      description: "Adorable little dog",
      age: 3,
      stature: 0.5,
      energyLevel: 100,
      independencieLevel: 100,
      environmentLevel: 100,
      adoptionRequirements: ["No vaccinations", "No grooming"],
      organization_id: org.id,
      pictures: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
      ],
      id: "test123",
    });

    expect(pet).toEqual(expect.objectContaining({ id: "test123" }));
  });

  it("Shoud not be able to register a pet without organization", async () => {
    await expect(
      sut.execute({
        name: "Rex",
        description: "Adorable little dog",
        age: 3,
        stature: 0.5,
        energyLevel: 100,
        independencieLevel: 100,
        environmentLevel: 100,
        adoptionRequirements: ["No vaccinations", "No grooming"],
        organization_id: "",
        pictures: [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg",
        ],
        id: "test123",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
