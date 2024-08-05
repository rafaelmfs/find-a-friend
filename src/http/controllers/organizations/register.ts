import { makeRegisterOrganizationUseCase } from "@/use-cases/factory/makeRegisterOrgsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const registerBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
  responsible: z.string(),
  address_id: z.number(),
  whatsapp: z.string(),
});
export async function registerOrganization(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { address_id, email, password, responsible, whatsapp } =
      registerBodySchema.parse(request.body);

    const registerOrgUseCase = makeRegisterOrganizationUseCase();
    const newOrg = await registerOrgUseCase.execute({
      address_id,
      email,
      password,
      responsible,
      whatsapp,
    });

    return reply.status(201).send(newOrg);
  } catch (error) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.format() });
      return;
    }

    reply.status(502).send({ error: "Internal server error!" });
  }
}
