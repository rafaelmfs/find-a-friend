import fastify from "fastify";
import { addressRoutes } from "./http/controllers/address/routes";
import { authenticationRoutes } from "./http/controllers/auth/authenticate/routes";
import { organizationRoutes } from "./http/controllers/organizations/routes";
import { userRoutes } from "./http/controllers/users/routes";

import jwt from "@fastify/jwt";
import { env } from "./env";
import { petRoutes } from "./http/controllers/auth/pet/routes";

export const app = fastify({
  logger: true,
});

app.register(jwt, {
  secret: env.JWT_SECRET_KEY,
});

app.register(authenticationRoutes, { prefix: "/auth" });
app.register(organizationRoutes, { prefix: "/organization" });
app.register(addressRoutes, { prefix: "/address" });
app.register(userRoutes, { prefix: "/user" });
app.register(petRoutes, { prefix: "/pet" });
