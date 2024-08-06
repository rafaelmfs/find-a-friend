import { makeFilterPetsUseCase } from "@/use-cases/factory/makeFilterPetsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const getPetDetailsQuerySchema = z.object({
  age: z.coerce.number().optional(),
  stature: z.coerce.number().optional(),
  energyLevel: z.coerce.number().optional(),
  independencieLevel: z.coerce.number().optional(),
});

export async function getAllPets(request: FastifyRequest, reply: FastifyReply) {
  const fetchAllPetsFiltered = makeFilterPetsUseCase();

  try {
    const { age, energyLevel, independencieLevel, stature } =
      getPetDetailsQuerySchema.parse(request.query);

    const pets = await fetchAllPetsFiltered.execute({
      age,
      energyLevel,
      independencieLevel,
      stature,
    });

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
