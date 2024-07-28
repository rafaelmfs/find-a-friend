import { Address } from "@/interfaces/Address";
import { Organization } from "@/interfaces/Organization";
import { prisma } from "@/lib/prisma";
import {
  OrganizationsRepository,
  RegisterOrganizationParams,
} from "../organizations-repository";
import { PrismaAddressRepostory } from "./prisma-address-repository";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  private async createNewAddressToOrg(address: Address): Promise<
    Address & {
      id: number;
    }
  > {
    const addressRepository = new PrismaAddressRepostory();
    const newAddress = await addressRepository.create(address);

    return newAddress;
  }
  async register(data: RegisterOrganizationParams): Promise<Organization> {
    const address = await this.createNewAddressToOrg(data.address);
    const newOrg = await prisma.organization.create({
      data: {
        responsible: data.responsible,
        whatsapp: data.whatsapp,
        email: data.email,
        user_id: data.user_id,
        address_id: address.id,
      },
      select: {
        address_id: false,
        user_id: true,
        address: true,
        whatsapp: true,
        email: true,
        id: true,
        responsible: true,
      },
    });

    return newOrg;
  }
  async findById(id: string): Promise<Organization | null> {
    const org = await prisma.organization.findUnique({
      where: { id },
      include: {
        address: true,
      },
    });

    return org;
  }
  async findByEmail(email: string): Promise<Organization | null> {
    const org = await prisma.organization.findUnique({
      where: { email },
      include: {
        address: true,
      },
    });

    return org;
  }
}
