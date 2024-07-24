import { Organization } from "@/interfaces/Organization";

export interface RegisterOrganizationParams extends Omit<Organization, "id"> {
  id?: string;
}

export interface OrganizationsRepository {
  register: (data: RegisterOrganizationParams) => Promise<Organization>;
  findById: (id: string) => Promise<Organization | null>;
  findByEmail: (email: string) => Promise<Organization | null>;
}
