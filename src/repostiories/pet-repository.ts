import { Pet } from "@/interfaces/Pet";

export interface RegisterPetParams extends Omit<Pet, "id"> {
  id?: string;
}

export interface PetRepository {
  register: (data: RegisterPetParams) => Promise<Pet>;
  findById: (id: string) => Promise<Pet | null>;
  findByOrganization: (organization_id: string) => Promise<Pet[]>;
  findByCity: (city: string) => Promise<Pet[]>;
}
