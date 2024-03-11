import fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { ErrorHandler, logger } from "@sourabhrawatcc/core-utils";
import { workspaceRoutes } from "../../routes/workspace.routes";

export const fastifyServer = fastify({ logger });

fastifyServer.register(cors, {
  origin: "https://localhost:3000",
  credentials: true,
});
fastifyServer.register(cookie, { secret: process.env.JWT_SECRET });
fastifyServer.setErrorHandler(ErrorHandler.handleError);

fastifyServer.register(workspaceRoutes, { prefix: "/api/v1/workspaces" });
