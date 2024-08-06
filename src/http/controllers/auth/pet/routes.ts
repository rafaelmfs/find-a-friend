import { verifyJWT } from "@/http/middlewares/verifyJWT";
import { FastifyInstance } from "fastify";
import { getAllPets } from "./getAllPets";
import { getAllPetsByCity } from "./getAllPetsByCity";
import { getPetDetails } from "./getPetDetails";
import { register } from "./register";

export async function petRoutes(app: FastifyInstance) {
  app.post("/", { onRequest: verifyJWT }, register);
  app.get("/", { onRequest: verifyJWT }, getAllPets);
  app.get("/:id", { onRequest: verifyJWT }, getPetDetails);
  app.get("/city/:city", { onRequest: verifyJWT }, getAllPetsByCity);
}
