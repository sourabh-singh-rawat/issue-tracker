import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Auth } from "@sourabhrawatcc/core-utils";
import { container } from "../app/containers";

export const projectActivityRoutes = (
  fastify: FastifyInstance,
  fastifyOptions: {},
  done: () => void,
) => {
  const controller = container.get("projectActivityController");
  const { requireTokens, setCurrentUser, requireAuth, requireNoAuth } = Auth;
  const auth: RouteShorthandOptions = {
    preHandler: [requireTokens, setCurrentUser, requireAuth],
  };

  fastify.get("/:id", auth, controller.getProjectActivityList);

  done();
};
