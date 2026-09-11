import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { CreateWorkspaceInput } from "@/features/workspaces/graphql/inputs/CreateWorkspaceInput";
import { WorkspaceObject } from "@/features/workspaces/graphql/objects/WorkspaceObject";
import type { IWorkspaceService } from "@/features/workspaces/services";

builder.mutationFields((t) => ({
  createWorkspace: t.field({
    type: WorkspaceObject,
    args: {
      input: t.arg({ type: CreateWorkspaceInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IWorkspaceService>(TYPES.WorkspaceService);

      return service.create(
        {
          tenantId: input.tenantId,
          parentWorkspaceId: input.parentWorkspaceId ?? undefined,
          name: input.name,
          slug: input.slug,
          description: input.description ?? undefined,
          isActive: input.isActive ?? undefined,
        },
        requireIdentityId(ctx),
      );
    },
  }),
}));
