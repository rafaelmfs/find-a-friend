import { Organization } from "@/interfaces/Organization";
import { randomUUID } from "crypto";
import { OrganizationsRepository } from "../organizations-repository";

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  private items: Organization[] = [];
  async register(data: Organization) {
    const newOrg = {
      ...data,
      id: data?.id ?? randomUUID(),
    };

    this.items.push(newOrg);
    return newOrg;
  }

  async findById(id: string) {
    const org = this.items.find((org) => org.id === id);
    return org ?? null;
  }

  async findByEmail(email: string) {
    const org = this.items.find((org) => org.email === email);
    return org ?? null;
  }
}
