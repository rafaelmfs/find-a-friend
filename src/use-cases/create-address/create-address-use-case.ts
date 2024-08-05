import { Address } from "@/interfaces/Address";
import { AddressRepository } from "@/repostiories/address-repository";

interface CreateAddressUseCaseRequest {
  zipCode: string;
  street: string;
  number: string;
  state: string;
  city: string;
}

interface CreateAddressUseCaseResponse {
  address: Required<Address>;
}

export class CreateAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}
  async execute({
    city,
    number,
    state,
    street,
    zipCode,
  }: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {
    const address = await this.addressRepository.create({
      city,
      number,
      state,
      street,
      zipCode,
    });

    return {
      address,
    };
  }
}
