import { Address } from "@/interfaces/Address";
import { Organization } from "@/interfaces/Organization";
import { Pet } from "@/interfaces/Pet";
import { AddressRepository } from "@/repostiories/address-repository";
import { OrganizationsRepository } from "@/repostiories/organizations-repository";
import { PetRepository } from "@/repostiories/pet-repository";
import { AddressNotFound } from "../errors/address-not-found";
import { OrganizationNotFound } from "../errors/organization-not-found";
import { PetNotFoundError } from "../errors/pet-not-found-error";

interface GetPetDetailsCaseRequest {
  pet_id: string;
}

interface GetPetDetailsCaseResponse {
  pet: Pet;
  org: {
    name: string;
    address: Address;
    whatsapp: string;
  };
}

export class GetPetDetailsCase {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrganizationsRepository,
    private addressRepository: AddressRepository
  ) {}

  private async getPetById(petId: string): Promise<Pet> {
    const pet = await this.petRepository.findById(petId);
    if (!pet) {
      throw new PetNotFoundError();
    }

    return pet;
  }

  private async getOrganizationById(orgId: string): Promise<Organization> {
    const org = await this.orgRepository.findById(orgId);
    if (!org) {
      throw new OrganizationNotFound();
    }

    return org;
  }

  private async getOrgAddressById(addressId: number): Promise<Address> {
    const address = await this.addressRepository.getAddressById(addressId);

    if (!address) {
      throw new AddressNotFound();
    }

    return address;
  }
  async execute({
    pet_id,
  }: GetPetDetailsCaseRequest): Promise<GetPetDetailsCaseResponse> {
    const pet = await this.getPetById(pet_id);
    const org = await this.getOrganizationById(pet.organization_id);
    const address = await this.getOrgAddressById(org.address_id);

    return {
      pet,
      org: {
        ...org,
        address,
        name: org.responsible,
      },
    };
  }
}
