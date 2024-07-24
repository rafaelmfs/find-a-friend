import { Pet } from "@/interfaces/Pet";
import { OrganizationsRepository } from "@/repostiories/organizations-repository";
import { PetRepository } from "@/repostiories/pet-repository";
import { formatCityAndState } from "@/utils/formatCityAndState";
import { OrganizationNotFound } from "../errors/organization-not-found";

interface RegisterPetUseCaseRequest {
  name: string;
  description: string;
  age: number;
  stature: number;
  energyLevel: number;
  independencieLevel: number;
  environmentLevel: number;
  adoptionRequirements: string[];
  organization_id: string;
  pictures: string[];
  id?: string;
}

interface RegisterPetUseCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(
    private petRepository: PetRepository,
    private organizationRepositor: OrganizationsRepository
  ) {}
  async execute(
    data: RegisterPetUseCaseRequest
  ): Promise<RegisterPetUseCaseResponse> {
    const organization = await this.organizationRepositor.findById(
      data.organization_id
    );
    if (!organization) {
      throw new OrganizationNotFound();
    }

    const pet = await this.petRepository.register({
      ...data,
      city: formatCityAndState({
        city: organization.address.city,
        state: organization.address.state,
      }),
      organization_id: organization.id,
      id: data.id,
    });

    return {
      pet,
    };
  }
}
