import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";

export async function authenticationRoutes(app: FastifyInstance) {
  app.post("/", authenticate);
}
