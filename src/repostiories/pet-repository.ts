import { Pet } from "@/interfaces/Pet";

export interface RegisterPetParams extends Omit<Pet, "id"> {
  id?: string;
}

export interface FilterPetParams {
  age?: number;
  stature?: number;
  energyLevel?: number;
  independencieLevel?: number;
}

export interface PetRepository {
  register: (data: RegisterPetParams) => Promise<Pet>;
  findById: (id: string) => Promise<Pet | null>;
  findByOrganization: (organization_id: string) => Promise<Pet[]>;
  filterByCity: (city: string) => Promise<Pet[]>;
  filter: (data: FilterPetParams) => Promise<Pet[]>;
}
