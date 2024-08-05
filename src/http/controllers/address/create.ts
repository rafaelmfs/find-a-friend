import { makeCreateAddressUseCase } from "@/use-cases/factory/makeCreateAddressUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const createAddressBodySchema = z.object({
  zipCode: z.string(),
  street: z.string(),
  number: z.string(),
  state: z.string(),
  city: z.string(),
});
export async function createAddress(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { city, number, state, street, zipCode } =
      createAddressBodySchema.parse(request.body);

    const createAddressUseCase = makeCreateAddressUseCase();
    const newAddress = await createAddressUseCase.execute({
      city,
      number,
      state,
      street,
      zipCode,
    });

    return reply.status(201).send(newAddress);
  } catch (error) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.format() });
      return;
    }

    reply.status(502).send({ error: "Internal server error!" });
  }
}
