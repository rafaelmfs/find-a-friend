import { prisma } from "@/lib/prisma";
import {
  OrganizationResponse,
  OrganizationsRepository,
  RegisterOrganizationParams,
} from "../organizations-repository";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async register(
    data: RegisterOrganizationParams
  ): Promise<OrganizationResponse> {
    const newOrg = await prisma.organization.create({
      data: {
        responsible: data.responsible,
        whatsapp: data.whatsapp,
        email: data.email,
        user_id: data.user_id,
        address_id: data.address_id,
      },
      select: {
        address_id: true,
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
  async findById(id: string): Promise<OrganizationResponse | null> {
    const org = await prisma.organization.findUnique({
      where: { id },
      include: {
        address: true,
      },
    });

    return org;
  }
  async findByEmail(email: string): Promise<OrganizationResponse | null> {
    const org = await prisma.organization.findUnique({
      where: { email },
      include: {
        address: true,
      },
    });

    return org;
  }
}
