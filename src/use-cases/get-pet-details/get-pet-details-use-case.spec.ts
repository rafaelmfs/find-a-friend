import { InMemoryOrganizationsRepository } from "@/repostiories/in-memory/in-memory-organizations-repository";
import { InMemoryPetRepository } from "@/repostiories/in-memory/in-memory-pet-repository";
import { OrganizationsRepository } from "@/repostiories/organizations-repository";
import { PetRepository } from "@/repostiories/pet-repository";
import { formatCityAndState } from "@/utils/formatCityAndState";
import { beforeEach, describe, expect, it } from "vitest";
import { PetNotFoundError } from "../errors/pet-not-found-error";
import { GetPetDetailsCase } from "./get-pet-details-use-case";

const fakeAddrees = {
  zipCode: "333333",
  city: "London",
  state: "London",
  street: "Fake Street",
  number: "123",
};

let sut: GetPetDetailsCase;
let petRepository: PetRepository;
let orgRepository: OrganizationsRepository;
describe("Get pet details", () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    orgRepository = new InMemoryOrganizationsRepository();
    sut = new GetPetDetailsCase(petRepository, orgRepository);
  });

  it("Shoud be able to fetch pet details", async () => {
    await orgRepository.register({
      address: fakeAddrees,
      email: "john.doe@example.com",
      id: "test123",
      whatsapp: "+5511999999999",
      responsible: "Jhon doe",
      user_id: "test123",
    });

    await petRepository.register({
      adoptionRequirements: [],
      age: 2,
      city: formatCityAndState({
        city: fakeAddrees.city,
        state: fakeAddrees.state,
      }),
      description: "Beautiful dog",
      energyLevel: 100,
      environmentLevel: 100,
      independencieLevel: 100,
      name: "Rufus",
      organization_id: "test123",
      pictures: ["https://example.com/image1.jpg"],
      stature: 0.5,
      id: "test355",
    });

    const response = await sut.execute({
      pet_id: "test355",
    });

    expect(response).toEqual(
      expect.objectContaining({
        pet: expect.objectContaining({
          id: "test355",
        }),
        org: expect.objectContaining({
          id: "test123",
        }),
      })
    );
  });

  it("Should not be able to fetch pet details to nonexistent pet", async () => {
    await expect(
      sut.execute({
        pet_id: "test355",
      })
    ).rejects.toBeInstanceOf(PetNotFoundError);
  });
});
