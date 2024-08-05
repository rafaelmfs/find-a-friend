import { verifyJWT } from "@/http/middlewares/verifyJWT";
import { FastifyInstance } from "fastify";
import { getPetDetails } from "./getPetDetails";
import { register } from "./register";

export async function petRoutes(app: FastifyInstance) {
  app.post("/", { onRequest: verifyJWT }, register);

  app.get("/:id", { onRequest: verifyJWT }, getPetDetails);
  // app.post("/", { onRequest: verifyJWT }, register);
  // app.post("/", { onRequest: verifyJWT }, register);
}
