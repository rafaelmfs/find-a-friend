import { Organization } from "@/interfaces/Organization";
import { AddressNotFound } from "@/use-cases/errors/address-not-found";
import { randomUUID } from "crypto";
import {
  OrganizationsRepository,
  RegisterOrganizationParams,
} from "../organizations-repository";
import { InMemoryAddressRepository } from "./in-memory-address-repository";

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  private items: Organization[] = [];

  private async getOrgAddress(address_id: number) {
    const address = InMemoryAddressRepository.items.find(
      (savedAddress) => savedAddress.id === address_id
    );

    if (!address) {
      throw new AddressNotFound();
    }

    return address;
  }

  async register(data: RegisterOrganizationParams) {
    const address = await this.getOrgAddress(data.address_id);
    const newOrg = {
      ...data,
      id: data?.id ?? randomUUID(),
    };

    this.items.push(newOrg);

    return {
      ...newOrg,
      address,
    };
  }

  async findById(id: string) {
    const org = this.items.find((org) => org.id === id);

    if (!org) {
      return null;
    }

    const address = await this.getOrgAddress(org.address_id);

    return {
      ...org,
      address,
    };
  }

  async findByEmail(email: string) {
    const org = this.items.find((org) => org.email === email);

    if (!org) {
      return null;
    }

    const address = await this.getOrgAddress(org.address_id);

    return {
      ...org,
      address,
    };
  }
}
