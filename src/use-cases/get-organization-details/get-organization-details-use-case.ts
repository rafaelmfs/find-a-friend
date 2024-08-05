import { Organization } from "@/interfaces/Organization";
import { OrganizationsRepository } from "@/repostiories/organizations-repository";
import { OrganizationNotFound } from "../errors/organization-not-found";

interface GetOrganizationDetailsCaseRequest {
  org_id: string;
}

interface GetOrganizationDetailsCaseResponse {
  organization: Required<Organization>;
}

export class GetOrganizationDetailsUseCase {
  constructor(private orgRepository: OrganizationsRepository) {}

  async execute({
    org_id,
  }: GetOrganizationDetailsCaseRequest): Promise<GetOrganizationDetailsCaseResponse> {
    const org = await this.orgRepository.findById(org_id);

    if (!org) {
      throw new OrganizationNotFound();
    }

    return {
      organization: org,
    };
  }
}
