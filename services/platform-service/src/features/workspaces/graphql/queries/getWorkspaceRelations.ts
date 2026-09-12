import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { WorkspaceRelationObject } from "@/features/workspaces/graphql/objects/WorkspaceRelationObject";
import type { IWorkspaceRelationService } from "@/features/workspaces/services";

builder.queryFields((t) => ({
  getWorkspaceRelations: t.field({
    type: [WorkspaceRelationObject],
    args: {
      workspaceId: t.arg.string({ required: true }),
      relation: t.arg.string({ required: false }),
      identityId: t.arg.string({ required: false }),
    },
    resolve: async (_root, args, ctx) => {
      const service = container.get<IWorkspaceRelationService>(TYPES.WorkspaceRelationService);
      return service.list(
        {
          workspaceId: args.workspaceId,
          relation: args.relation ?? undefined,
          identityId: args.identityId ?? undefined,
        },
        requireIdentityId(ctx),
      );
    },
  }),
}));
