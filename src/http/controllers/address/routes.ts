import { FastifyInstance } from "fastify";
import { createAddress } from "./create";

export async function addressRoutes(app: FastifyInstance) {
  app.post("/address", createAddress);
}
