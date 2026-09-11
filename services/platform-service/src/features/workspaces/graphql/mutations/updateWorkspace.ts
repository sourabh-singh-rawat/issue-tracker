import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { UpdateWorkspaceInput } from "@/features/workspaces/graphql/inputs/UpdateWorkspaceInput";
import { WorkspaceObject } from "@/features/workspaces/graphql/objects/WorkspaceObject";
import type { IWorkspaceService } from "@/features/workspaces/services";

builder.mutationFields((t) => ({
  updateWorkspace: t.field({
    type: WorkspaceObject,
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: UpdateWorkspaceInput, required: true }),
    },
    resolve: async (_root, { id, input }, ctx) => {
      const service = container.get<IWorkspaceService>(TYPES.WorkspaceService);

      return service.update(
        id,
        {
          parentWorkspaceId: input.parentWorkspaceId,
        },
        requireIdentityId(ctx),
      );
    },
  }),
}));
