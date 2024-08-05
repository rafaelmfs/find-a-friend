import { FastifyInstance } from "fastify";
import { createUser } from "./create";

export async function userRoutes(app: FastifyInstance) {
  app.post("/user", createUser);
}
