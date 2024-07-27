import { InMemoryPetRepository } from "@/repostiories/in-memory/in-memory-pet-repository";
import { PetRepository } from "@/repostiories/pet-repository";
import { formatCityAndState } from "@/utils/formatCityAndState";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchPetsByCity } from "./fetch-pets-by-city";

const citiesFake = [
  {
    name: "Tokyo",
    state: "JP",
  },
  {
    name: "Paris",
    state: "FR",
  },
  {
    name: "New York",
    state: "US",
  },
  {
    name: "Tokyo",
    state: "JP",
  },
];

let sut: FetchPetsByCity;
let petRepository: PetRepository;
describe("Fetch pet by city", () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    sut = new FetchPetsByCity(petRepository);
  });

  it("Shoud be able to all pets available by city", async () => {
    await Promise.all(
      citiesFake.map((city, index) =>
        petRepository.register({
          adoptionRequirements: [],
          age: 2,
          city: formatCityAndState({
            city: city.name,
            state: city.state,
          }),
          description: "Beautiful dog",
          energyLevel: 100,
          environmentLevel: 100,
          independencieLevel: 100,
          name: "Rufus",
          organization_id: `tst124${index}`,
          pictures: ["https://example.com/image1.jpg"],
          stature: 0.5,
        })
      )
    );

    const { pets } = await sut.execute({ city: "tokyo" });

    expect(pets).toHaveLength(2);

    expect(pets).toContainEqual(
      expect.objectContaining({
        city: formatCityAndState({
          city: "Tokyo",
          state: "JP",
        }),
      })
    );
  });
});
