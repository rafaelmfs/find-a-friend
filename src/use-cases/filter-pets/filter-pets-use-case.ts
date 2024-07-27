import { Pet } from "@/interfaces/Pet";
import { FilterPetParams, PetRepository } from "@/repostiories/pet-repository";

interface FilterPetsUseCaseRequest extends FilterPetParams {}

interface FilterPetsUseCaseResponse {
  pets: Pet[];
}

export class FilterPetsUseCase {
  constructor(private petRepository: PetRepository) {}
  async execute(
    data: FilterPetsUseCaseRequest
  ): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petRepository.filter(data);

    return {
      pets,
    };
  }
}
