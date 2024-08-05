import { Address } from "@/interfaces/Address";
import { prisma } from "@/lib/prisma";

import { AddressRepository } from "../address-repository";

export class PrismaAddressRepostory implements AddressRepository {
  async create(address: Address) {
    const newAddress = await prisma.address.create({
      data: address,
    });

    return newAddress;
  }

  async getAddressById(id: number) {
    const address = await prisma.address.findUniqueOrThrow({
      where: { id },
    });

    return address;
  }
}
