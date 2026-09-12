import { builder } from "@pine/server";
import type { Workspace } from "@/db";
import type { WorkspaceNode } from "@/features/workspaces/utils";

type WorkspaceObjectShape = Workspace & {
  children?: WorkspaceNode[];
};

export const WorkspaceObject = builder.objectRef<WorkspaceObjectShape>("WorkspaceObject");

WorkspaceObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    tenantId: t.exposeString("tenantId"),
    parentWorkspaceId: t.exposeString("parentWorkspaceId", { nullable: true }),
    name: t.exposeString("name"),
    slug: t.exposeString("slug"),
    description: t.exposeString("description", { nullable: true }),
    isActive: t.exposeBoolean("isActive"),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
    children: t.field({
      type: [WorkspaceObject],
      resolve: (workspace) => workspace.children ?? [],
    }),
  }),
});
