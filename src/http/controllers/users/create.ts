import { makeCreateUserUseCase } from "@/use-cases/factory/makeCreateUserUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const createUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password } = createUserBodySchema.parse(request.body);

    const createUserUseCase = makeCreateUserUseCase();
    const { user } = await createUserUseCase.execute({
      email,
      password,
    });

    return reply.status(201).send({
      user: {
        email: user.email,
        id: user.id,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.format() });
      return;
    }

    reply.status(502).send({ error: "Internal server error!" });
  }
}
