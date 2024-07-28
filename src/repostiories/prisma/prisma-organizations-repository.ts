import { Organization } from "@/interfaces/Organization";
import { prisma } from "@/lib/prisma";
import {
  OrganizationsRepository,
  RegisterOrganizationParams,
} from "../organizations-repository";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async register(data: RegisterOrganizationParams): Promise<Organization> {
    const newOrg = await prisma.organization.create({
      data: {
        responsible: data.responsible,
        whatsapp: data.whatsapp,
        user_id: data.user_id,
        email: data.email,
        address: {
          create: {
            zip: data.address.zipCode,
            street: data.address.street,
            number: data.address.number,
            state: data.address.state,
            city: data.address.city,
          },
        },
      },
    });
  }
  findById: (id: string) => Promise<Organization | null>;
  findByEmail: (email: string) => Promise<Organization | null>;
}
