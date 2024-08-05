import { PrismaAddressRepostory } from "@/repostiories/prisma/prisma-address-repository";
import { CreateAddressUseCase } from "../create-address/create-address-use-case";

export function makeCreateAddressUseCase() {
  const addressRepository = new PrismaAddressRepostory();
  const createAddressUseCase = new CreateAddressUseCase(addressRepository);

  return createAddressUseCase;
}
