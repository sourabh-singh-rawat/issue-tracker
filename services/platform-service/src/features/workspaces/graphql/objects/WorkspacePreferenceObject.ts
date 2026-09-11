import { builder } from "@pine/server";
import type { IdentityWorkspacePreference } from "@/db";

export const WorkspacePreferenceObject = builder.objectRef<IdentityWorkspacePreference>(
  "WorkspacePreferenceObject",
);

WorkspacePreferenceObject.implement({
  fields: (t) => ({
    workspaceId: t.exposeString("workspaceId"),
    tenantId: t.exposeString("tenantId"),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
  }),
});
