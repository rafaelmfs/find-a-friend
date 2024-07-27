import { Pet } from "@/interfaces/Pet";
import { randomUUID } from "crypto";
import {
  FilterPetParams,
  PetRepository,
  RegisterPetParams,
} from "../pet-repository";

export class InMemoryPetRepository implements PetRepository {
  private items: Pet[] = [];

  async register(data: RegisterPetParams) {
    const newPet: Pet = {
      ...data,
      id: data?.id ?? randomUUID(),
    };

    this.items.push(newPet);

    return newPet;
  }

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id);
    return pet ?? null;
  }

  async findByOrganization(organization_id: string) {
    return this.items.filter((pet) => pet.organization_id === organization_id);
  }

  async filterByCity(city: string) {
    return this.items.filter((pet) => {
      const petCity = pet.city.toLowerCase();
      const selectedCity = city.toLowerCase();

      return petCity.includes(selectedCity);
    });
  }

  async filter(data: FilterPetParams): Promise<Pet[]> {
    const { age, energyLevel, independencieLevel, stature } = data;
    const filteredPets = this.items.filter((pet) => {
      if (age && pet.age !== age) return false;
      if (stature && pet.stature !== stature) return false;
      if (energyLevel && pet.energyLevel !== energyLevel) return false;
      if (independencieLevel && pet.independencieLevel !== independencieLevel)
        return false;

      return true;
    });
    return filteredPets;
  }
}
