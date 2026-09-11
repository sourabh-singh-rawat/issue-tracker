import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { WorkspaceObject } from "@/features/workspaces/graphql/objects/WorkspaceObject";
import type { IWorkspaceService } from "@/features/workspaces/services";

builder.queryFields((t) => ({
  getWorkspaces: t.field({
    type: [WorkspaceObject],
    args: {
      tenantId: t.arg.string({ required: true }),
      parentWorkspaceId: t.arg.string({ required: false }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<IWorkspaceService>(TYPES.WorkspaceService);

      return service.list(
        {
          tenantId: args.tenantId,
          parentWorkspaceId: args.parentWorkspaceId ?? undefined,
        },
        requireIdentityId(ctx),
      );
    },
  }),
}));
