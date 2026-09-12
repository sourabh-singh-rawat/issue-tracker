import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { WorkspaceObject } from "@/features/workspaces/graphql/objects/WorkspaceObject";
import type { IWorkspaceService } from "@/features/workspaces/services";

builder.queryFields((t) => ({
  getWorkspace: t.field({
    type: WorkspaceObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const service = container.get<IWorkspaceService>(TYPES.WorkspaceService);
      return service.getById(id, requireIdentityId(ctx));
    },
  }),
}));
