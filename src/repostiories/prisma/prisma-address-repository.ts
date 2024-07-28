import { Address } from "@/interfaces/Address";
import { prisma } from "@/lib/prisma";

export class PrismaAddressRepostory {
  async create(address: Address) {
    const newAddress = await prisma.address.create({
      data: address,
    });

    return newAddress;
  }
}
