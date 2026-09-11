import { requireIdentityId } from "@pine/identity";
import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import type { IWorkspaceService } from "@/features/workspaces/services";

builder.mutationFields((t) => ({
  deleteWorkspace: t.string({
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const service = container.get<IWorkspaceService>(TYPES.WorkspaceService);
      await service.delete(id, requireIdentityId(ctx));
      return id;
    },
  }),
}));
