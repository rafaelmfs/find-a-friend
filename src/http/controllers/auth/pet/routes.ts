import { verifyJWT } from "@/http/middlewares/verifyJWT";
import { FastifyInstance } from "fastify";
import { register } from "./register";

export async function petRoutes(app: FastifyInstance) {
  app.post("/pet", { onRequest: verifyJWT }, register);
}
