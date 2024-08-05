import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateOrgUseCase } from "@/use-cases/factory/makeAuthenticateOrgUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

const authBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { email, password } = authBodySchema.parse(request.body);
    const authenticateUseCase = makeAuthenticateOrgUseCase();
    const user = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.organization.id,
        },
      }
    );

    return reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.format() });
    }

    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ error: error.message });
    }

    console.log(error);

    return reply.status(502).send({ error: "Internal server error!" });
  }
}
