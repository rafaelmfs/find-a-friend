import { PetNotFoundError } from "@/use-cases/errors/pet-not-found-error";
import { makeGetPetDetailsUseCase } from "@/use-cases/factory/makeGetPetDetailsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const getPetDetailsParamsSchema = z.object({
  id: z.string(),
});

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getPetDetails = makeGetPetDetailsUseCase();

  try {
    const { id: receivePetId } = getPetDetailsParamsSchema.parse(
      request.params
    );
    const pet = await getPetDetails.execute({ pet_id: receivePetId });

    return reply.status(200).send({
      data: pet,
    });
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      reply.status(401).send({ error: error.message });
      return;
    }
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.format() });
      return;
    }

    reply.status(502).send({ error: "Internal server error!" });
  }
}
