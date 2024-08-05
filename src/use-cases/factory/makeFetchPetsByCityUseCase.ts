import { PrismaPetsRepository } from "@/repostiories/prisma/prisma-pets-repository";
import { FetchPetsByCity } from "../fetch-pets-by-city/fetch-pets-by-city";

export function makeFethPetsByCityUseCase() {
  const petRepository = new PrismaPetsRepository();
  const fetchPetsByCityUseCase = new FetchPetsByCity(petRepository);

  return fetchPetsByCityUseCase;
}
