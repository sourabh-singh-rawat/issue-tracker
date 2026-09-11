import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { WorkspaceObject } from "@/features/workspaces/graphql/objects/WorkspaceObject";
import type { IWorkspaceService } from "@/features/workspaces/services";

builder.queryFields((t) => ({
  getMyWorkspaces: t.field({
    type: [WorkspaceObject],
    authScopes: {
      identityRequired: true,
    },
    resolve: async (_root, _args, ctx) => {
      const service = container.get<IWorkspaceService>(TYPES.WorkspaceService);
      return service.listMyWorkspaces(requireIdentityId(ctx));
    },
  }),
}));
