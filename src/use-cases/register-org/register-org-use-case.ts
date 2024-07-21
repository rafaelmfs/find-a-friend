import { Address } from "@/interfaces/Address";
import { OrganizationsRepository } from "@/repostiories/organizations-repository";
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

    const org = await this.orgsRepository.register({
      address: data.address,
      email: data.email,
      responsible: data.responsible,
      whatsapp: data.whatsapp,
      user_id: user.id,
      id: data.id,
    });

    return {
      org,
    };
  }
}
