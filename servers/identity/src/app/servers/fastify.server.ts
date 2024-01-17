import fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { ErrorHandler, logger } from "@sourabhrawatcc/core-utils";
import { identityRoutes } from "../../routes/identity.routes";

export const server = fastify({ logger });

server.register(cors, { origin: "https://localhost:3000", credentials: true });
server.register(cookie, { secret: process.env.JWT_SECRET });
server.setErrorHandler(ErrorHandler.handleError);

server.register(identityRoutes, { prefix: "/api/v1/identity" });
