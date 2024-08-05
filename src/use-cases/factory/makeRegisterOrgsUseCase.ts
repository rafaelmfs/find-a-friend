import { PrismaOrganizationsRepository } from "@/repostiories/prisma/prisma-organizations-repository";
import { PrismaUsersRepository } from "@/repostiories/prisma/prisma-user-repository";
import { CreateUserUseCase } from "../create-user/create-user-use-case";
import { RegisterOrganizationUseCase } from "../register-org/register-org-use-case";

export function makeRegisterOrganizationUseCase() {
  const orgRepository = new PrismaOrganizationsRepository();
  const userRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);

  const registerOrgUseCase = new RegisterOrganizationUseCase(
    orgRepository,
    createUserUseCase
  );

  return registerOrgUseCase;
}
