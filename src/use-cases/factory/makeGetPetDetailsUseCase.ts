import { PrismaAddressRepostory } from "@/repostiories/prisma/prisma-address-repository";
import { PrismaOrganizationsRepository } from "@/repostiories/prisma/prisma-organizations-repository";
import { PrismaPetsRepository } from "@/repostiories/prisma/prisma-pets-repository";
import { GetPetDetailsCase } from "../get-pet-details/get-pet-details-use-case";

export function makeGetPetDetailsUseCase() {
  const petRepository = new PrismaPetsRepository();
  const orgsRepository = new PrismaOrganizationsRepository();
  const addressRepository = new PrismaAddressRepostory();
  const getPetDetailsUseCase = new GetPetDetailsCase(
    petRepository,
    orgsRepository,
    addressRepository
  );

  return getPetDetailsUseCase;
}
