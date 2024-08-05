import { Address } from "@/interfaces/Address";
import { AddressRepository } from "../address-repository";

export class InMemoryAddressRepository implements AddressRepository {
  static items: Array<Required<Address>> = [];

  async create(data: Address) {
    const newAddress = {
      ...data,
      id: Math.floor(Math.random()),
    };
    InMemoryAddressRepository.items.push(newAddress);

    return newAddress;
  }

  async getAddressById(id: number) {
    const address = InMemoryAddressRepository.items.find(
      (address) => address.id === id
    );
    if (!address) {
      return null;
    }

    return address;
  }
}
