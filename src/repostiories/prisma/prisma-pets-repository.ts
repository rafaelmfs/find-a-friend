import { Pet } from "@/interfaces/Pet";
import { prisma } from "@/lib/prisma";
import { PetAdoptionRequirements, PetPictures } from "@prisma/client";
import {
  FilterPetParams,
  PetRepository,
  RegisterPetParams,
} from "../pet-repository";

interface PetRepositoryReturns {
  PetAdoptionRequirements: Array<PetAdoptionRequirements>;
  PetPictures: Array<PetPictures>;
  age: number;
  city: string;
  description: string;
  energi_level: number;
  environment_level: number;
  independence_level: number;
  id: string;
  name: string;
  organization_id: string;
  stature: number;
}

export class PrismaPetsRepository implements PetRepository {
  private formatDataToReturn(data: PetRepositoryReturns): Pet {
    return {
      adoptionRequirements: data.PetAdoptionRequirements.map(
        (requirement) => requirement.requirement
      ),
      pictures: data.PetPictures?.map((pic) => pic.pic_url),
      age: data.age,
      city: data.city,
      description: data.description,
      energyLevel: data.energi_level,
      environmentLevel: data.environment_level,
      independencieLevel: data.independence_level,
      id: data.id,
      name: data.name,
      organization_id: data.organization_id,
      stature: data.stature,
    };
  }
  async register(data: RegisterPetParams): Promise<Pet> {
    try {
      const newPet = await prisma.pet.create({
        data: {
          name: data.name,
          description: data.description,
          age: data.age,
          city: data.city,
          stature: data.stature,
          energi_level: data.energyLevel,
          environment_level: data.environmentLevel,
          independence_level: data.independencieLevel,
          organization_id: data.organization_id,
          PetPictures: data.pictures
            ? {
                create: data.pictures.map((pic) => ({
                  pic_url: pic,
                })),
              }
            : undefined,
          PetAdoptionRequirements: {
            create: data.adoptionRequirements.map((requirement) => ({
              requirement,
            })),
          },
        },
        include: {
          organization: true,
          PetAdoptionRequirements: true,
          PetPictures: true,
        },
      });

      return this.formatDataToReturn(newPet);
    } catch (error) {
      throw error;
    }
  }
  async findById(id: string): Promise<Pet | null> {
    try {
      const pet = await prisma.pet.findUnique({
        where: { id },
        include: {
          organization: true,
          PetAdoptionRequirements: true,
          PetPictures: true,
        },
      });

      if (!pet) {
        return null;
      }

      return this.formatDataToReturn(pet);
    } catch (error) {
      throw error;
    }
  }
  async findByOrganization(organization_id: string): Promise<Pet[]> {
    try {
      const pets = await prisma.pet.findMany({
        where: { organization_id },
        include: {
          organization: true,
          PetAdoptionRequirements: true,
          PetPictures: true,
        },
      });

      if (pets.length > 0) {
        return pets.map((pet) => this.formatDataToReturn(pet));
      }

      return [];
    } catch (error) {
      throw error;
    }
  }
  async filterByCity(city: string): Promise<Pet[]> {
    try {
      const pets = await prisma.pet.findMany({
        where: {
          city: {
            contains: city,
          },
        },
        include: {
          organization: true,
          PetAdoptionRequirements: true,
          PetPictures: true,
        },
      });

      if (pets.length > 0) {
        return pets.map((pet) => this.formatDataToReturn(pet));
      }

      return [];
    } catch (error) {
      throw error;
    }
  }
  async filter(data: FilterPetParams): Promise<Pet[]> {
    try {
      const pets = await prisma.pet.findMany({
        where: {
          age: data?.age,
          stature: data?.stature,
          energi_level: data?.energyLevel,
          independence_level: data?.independencieLevel,
        },
        include: {
          organization: true,
          PetAdoptionRequirements: true,
          PetPictures: true,
        },
      });

      if (pets.length > 0) {
        return pets.map((pet) => this.formatDataToReturn(pet));
      }

      return [];
    } catch (error) {
      throw error;
    }
  }
}
