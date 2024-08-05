import { PrismaPetsRepository } from "@/repostiories/prisma/prisma-pets-repository";
import { FilterPetsUseCase } from "../filter-pets/filter-pets-use-case";

export function makeFilterPetsByCityUseCase() {
  const petRepository = new PrismaPetsRepository();
  const filterPetsUseCase = new FilterPetsUseCase(petRepository);

  return filterPetsUseCase;
}
