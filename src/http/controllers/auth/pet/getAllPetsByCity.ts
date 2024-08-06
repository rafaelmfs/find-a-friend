import { makeFethPetsByCityUseCase } from "@/use-cases/factory/makeFetchPetsByCityUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const getPetsByCityParamsSchema = z.object({
  city: z.string(),
});

export async function getAllPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchPetByCity = makeFethPetsByCityUseCase();

  try {
    const { city } = getPetsByCityParamsSchema.parse(request.params);

    const pets = await fetchPetByCity.execute({ city });

    return reply.status(200).send({
      data: pets,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.format() });
      return;
    }

    reply.status(502).send({ error: "Internal server error!" });
  }
}
