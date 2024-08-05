import { PrismaOrganizationsRepository } from "@/repostiories/prisma/prisma-organizations-repository";
import { GetOrganizationDetailsUseCase } from "../get-organization-details/get-organization-details-use-case";

export function makeGetOrgDetailsUseCase() {
  const orgRepository = new PrismaOrganizationsRepository();
  const getOrgDetailsUseCase = new GetOrganizationDetailsUseCase(orgRepository);

  return getOrgDetailsUseCase;
}
