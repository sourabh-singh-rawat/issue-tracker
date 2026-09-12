import { UnauthorizedError } from "@pine/common";

export const requireTenantId = (target: { tenantId?: string }): string => {
  if (!target.tenantId) {
    throw new UnauthorizedError("Missing tenant context");
  }

  return target.tenantId;
};

export const requireWorkspaceId = (target: { workspaceId?: string }): string => {
  if (!target.workspaceId) {
    throw new UnauthorizedError("Missing workspace context");
  }

  return target.workspaceId;
};
