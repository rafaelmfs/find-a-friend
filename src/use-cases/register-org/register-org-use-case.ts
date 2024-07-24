import { Address } from "@/interfaces/Address";
import { OrganizationsRepository } from "@/repostiories/organizations-repository";
import { z } from "zod";
import { Organization } from "../../interfaces/Organization";
import { CreateUserUseCase } from "../create-user/create-user-use-case";

interface RegisterOrganizationUseCaseRequest {
  responsible: string;
  password: string;
  email: string;
  address: Address;
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
  address: z.object({
    cep: z.string(),
    street: z.string().min(3).max(100),
    number: z.string().min(1),
    state: z.string().min(2).max(20),
    city: z.string().min(3).max(100),
  }),
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
      address: validatedData.address,
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
