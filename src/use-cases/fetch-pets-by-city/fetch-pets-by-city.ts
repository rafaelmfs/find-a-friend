import { Pet } from "@/interfaces/Pet";
import { PetRepository } from "@/repostiories/pet-repository";

interface FetchPetsByCityUseCaseRequest {
  city: string;
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[];
}

export class FetchPetsByCity {
  constructor(private petRepository: PetRepository) {}
  async execute({
    city,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petRepository.filterByCity(city);

    return {
      pets,
    };
  }
}
