import { OrganizationNotFound } from "@/use-cases/errors/organization-not-found";
import { makeGetOrgDetailsUseCase } from "@/use-cases/factory/makeGetOrgDetailsUseCase";
import { makeRegisterPetUseCase } from "@/use-cases/factory/makeRegisterPetUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const registerPetBodySchema = z.object({
  adoptionRequirements: z.array(z.string()).optional(),
  age: z.number(),
  description: z.string(),
  energyLevel: z.number(),
  environmentLevel: z.number(),
  independencieLevel: z.number(),
  name: z.string(),
  pictures: z.array(z.string()).optional(),
  stature: z.number(),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const org_id = request.user.sub;
  const getOrganizationDetailsUseCase = makeGetOrgDetailsUseCase();

  try {
    const { organization: authenticatedOrganization } =
      await getOrganizationDetailsUseCase.execute({
        org_id,
      });
    const receivedPetDetails = registerPetBodySchema.parse(request.body);
    const registerPetUseCase = makeRegisterPetUseCase();

    const { pet } = await registerPetUseCase.execute({
      age: receivedPetDetails.age,
      description: receivedPetDetails.description,
      energyLevel: receivedPetDetails.energyLevel,
      environmentLevel: receivedPetDetails.environmentLevel,
      independencieLevel: receivedPetDetails.independencieLevel,
      name: receivedPetDetails.name,
      organization_id: authenticatedOrganization.id,
      stature: receivedPetDetails.stature,
      pictures: receivedPetDetails.pictures ?? [],
      adoptionRequirements: receivedPetDetails.adoptionRequirements ?? [],
    });

    return reply.status(201).send({
      pet,
    });
  } catch (error) {
    if (error instanceof OrganizationNotFound) {
      reply.status(401).send({ error: "Organization not found" });
      return;
    }
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.format() });
      return;
    }

    reply.status(502).send({ error: "Internal server error!" });
  }
}
