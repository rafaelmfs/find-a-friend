import { PrismaOrganizationsRepository } from "@/repostiories/prisma/prisma-organizations-repository";
import { PrismaUsersRepository } from "@/repostiories/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "../authenticate-org/authenticate-org-use-case";

export function makeAuthenticateOrgUseCase() {
  const userRepository = new PrismaUsersRepository();
  const organizationRepository = new PrismaOrganizationsRepository();
  const authenticateUseCase = new AuthenticateUseCase(
    organizationRepository,
    userRepository
  );

  return authenticateUseCase;
}
