import { Pet } from "@/interfaces/Pet";
import { randomUUID } from "crypto";
import { PetRepository, RegisterPetParams } from "../pet-repository";

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

  async findByCity(city: string) {
    return this.items.filter((pet) => {
      const petCity = pet.city.toLowerCase();
      const selectedCity = city.toLowerCase();

      return petCity.includes(selectedCity);
    });
  }
}
