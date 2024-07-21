import { Organization } from "@/interfaces/Organization";

export interface OrganizationsRepository {
  register: (data: Organization) => Promise<Organization>;
  findById: (id: string) => Promise<Organization | null>;
  findByEmail: (email: string) => Promise<Organization | null>;
}
