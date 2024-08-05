import { Address } from "@/interfaces/Address";
import { Organization } from "@/interfaces/Organization";

export interface RegisterOrganizationParams extends Omit<Organization, "id"> {
  id?: string;
}

export interface OrganizationResponse extends Required<Organization> {
  address: Required<Address>;
}
export interface OrganizationsRepository {
  register: (data: RegisterOrganizationParams) => Promise<OrganizationResponse>;
  findById: (id: string) => Promise<OrganizationResponse | null>;
  findByEmail: (email: string) => Promise<OrganizationResponse | null>;
}
