import { InMemoryPetRepository } from "@/repostiories/in-memory/in-memory-pet-repository";
import { PetRepository } from "@/repostiories/pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FilterPetsUseCase } from "./filter-pets-use-case";

const fakeAddrees = {
  cep: "333333",
  city: "London",
  state: "London",
  street: "Fake Street",
  number: "123",
};

let sut: FilterPetsUseCase;
let petRepository: PetRepository;
describe("Fetch pet by filters", () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    sut = new FilterPetsUseCase(petRepository);
  });

  it("Shoud be able to fetch pet by age", async () => {
    await petRepository.register({
      adoptionRequirements: [],
      age: 2,
      city: "London",
      description: "Beautiful dog",
      energyLevel: 100,
      environmentLevel: 100,
      independencieLevel: 100,
      name: "Rufus",
      organization_id: "test123",
      pictures: ["https://example.com/image1.jpg"],
      stature: 0.5,
    });

    const { pets } = await sut.execute({
      age: 2,
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([
      expect.objectContaining({
        age: 2,
        name: "Rufus",
      }),
    ]);
  });

  it("Shoud be able to fetch pet by 2 filters optionals", async () => {
    await petRepository.register({
      adoptionRequirements: [],
      age: 2,
      city: "London",
      description: "Beautiful dog",
      energyLevel: 100,
      environmentLevel: 100,
      independencieLevel: 100,
      name: "Rufus",
      organization_id: "test123",
      pictures: ["https://example.com/image1.jpg"],
      stature: 0.5,
    });

    await petRepository.register({
      adoptionRequirements: [],
      age: 2,
      city: "London",
      description: "Beautiful dog",
      energyLevel: 200,
      environmentLevel: 100,
      independencieLevel: 100,
      name: "Rufus abd2",
      organization_id: "test123",
      pictures: ["https://example.com/image1.jpg"],
      stature: 0.5,
    });

    const { pets } = await sut.execute({
      stature: 0.5,
      energyLevel: 100,
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([
      expect.objectContaining({
        name: "Rufus",
        stature: 0.5,
        energyLevel: 100,
      }),
    ]);
  });
});
