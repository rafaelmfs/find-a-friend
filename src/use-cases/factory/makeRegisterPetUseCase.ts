import { PrismaOrganizationsRepository } from "@/repostiories/prisma/prisma-organizations-repository";
import { PrismaPetsRepository } from "@/repostiories/prisma/prisma-pets-repository";
import { RegisterPetUseCase } from "../register-pet/register-pet-use-case";

export function makeRegisterPetUseCase() {
  const petRepository = new PrismaPetsRepository();
  const orgsRepository = new PrismaOrganizationsRepository();
  const registerPetUseCase = new RegisterPetUseCase(
    petRepository,
    orgsRepository
  );

  return registerPetUseCase;
}
