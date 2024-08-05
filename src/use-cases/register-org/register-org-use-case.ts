import { OrganizationsRepository } from "@/repostiories/organizations-repository";
import { z } from "zod";
import { Organization } from "../../interfaces/Organization";
import { CreateUserUseCase } from "../create-user/create-user-use-case";

export interface RegisterOrganizationUseCaseRequest {
  responsible: string;
  password: string;
  email: string;
  address_id: number;
  whatsapp: string;
  id?: string;
}

interface RegisterOrganizationUseCaseResponse {
  org: Organization;
}

const organizationSchemaValidation = z.object({
  responsible: z.string().min(3).max(100),
  password: z.string().min(4),
  email: z.string().email(),
  address_id: z.number(),
  whatsapp: z.string().min(8),
  id: z.string().optional(),
});

export class RegisterOrganizationUseCase {
  constructor(
    private orgsRepository: OrganizationsRepository,
    private createUserUseCase: CreateUserUseCase
  ) {}
  async execute(
    data: RegisterOrganizationUseCaseRequest
  ): Promise<RegisterOrganizationUseCaseResponse> {
    const { user } = await this.createUserUseCase.execute({
      email: data.email,
      password: data.password,
    });

    const validatedData = organizationSchemaValidation.parse(data);

    const org = await this.orgsRepository.register({
      address_id: validatedData.address_id,
      email: validatedData.email,
      responsible: validatedData.responsible,
      whatsapp: validatedData.whatsapp,
      user_id: user.id,
      id: validatedData.id,
    });

    return {
      org,
    };
  }
}
