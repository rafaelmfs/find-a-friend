import { Organization } from "@/interfaces/Organization";
import { User } from "@/interfaces/User";
import { OrganizationsRepository } from "@/repostiories/organizations-repository";
import { UserRepository } from "@/repostiories/user-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}
interface AuthenticateUseCaseResponse {
  organization: Required<Organization>;
}

export class AuthenticateUseCase {
  constructor(
    private organizationRepository: OrganizationsRepository,
    private userRepository: UserRepository
  ) {}

  private async findOrganizationByEmail(email: string): Promise<Organization> {
    const organization = await this.organizationRepository.findByEmail(email);
    if (!organization) {
      throw new InvalidCredentialsError();
    }

    return organization;
  }

  private async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  private async validatePassword({
    password,
    passwordHash,
  }: {
    password: string;
    passwordHash: string;
  }): Promise<void> {
    const isValid = await compare(password, passwordHash);

    if (!isValid) {
      throw new InvalidCredentialsError();
    }
  }

  async execute(
    data: AuthenticateUseCaseRequest
  ): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.findOrganizationByEmail(data.email);
    const user = await this.findUserById(organization.user_id);

    await this.validatePassword({
      password: data.password,
      passwordHash: user.password_hash,
    });

    return {
      organization,
    };
  }
}
