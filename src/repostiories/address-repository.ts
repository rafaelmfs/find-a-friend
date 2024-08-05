import { Address } from "../interfaces/Address";

export interface AddressRepository {
  create: (address: Address) => Promise<Required<Address>>;
  getAddressById: (id: number) => Promise<Address | null>;
}
