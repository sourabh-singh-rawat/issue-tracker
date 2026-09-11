import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { WorkspaceRelationObject } from "@/features/workspaces/graphql/objects/WorkspaceRelationObject";
import type { IWorkspaceRelationService } from "@/features/workspaces/services";

builder.queryFields((t) => ({
  getWorkspaceRelation: t.field({
    type: WorkspaceRelationObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<IWorkspaceRelationService>(TYPES.WorkspaceRelationService);
      return service.getById(args.id, requireIdentityId(ctx));
    },
  }),
}));
