import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { CreateWorkspaceRelationInput } from "@/features/workspaces/graphql/inputs/CreateWorkspaceRelationInput";
import { WorkspaceRelationObject } from "@/features/workspaces/graphql/objects/WorkspaceRelationObject";
import type { IWorkspaceRelationService } from "@/features/workspaces/services";

builder.mutationFields((t) => ({
  createWorkspaceRelation: t.field({
    type: WorkspaceRelationObject,
    args: {
      input: t.arg({ type: CreateWorkspaceRelationInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IWorkspaceRelationService>(TYPES.WorkspaceRelationService);

      return service.create(
        {
          workspaceId: input.workspaceId,
          relation: input.relation,
          identityId: input.identityId,
        },
        requireIdentityId(ctx),
      );
    },
  }),
}));
