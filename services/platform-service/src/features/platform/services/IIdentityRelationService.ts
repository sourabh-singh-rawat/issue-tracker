import type { WorkspaceRelation } from "@/features/workspaces/services/IWorkspaceRelationService";
import type { PlatformRelation } from "@/features/platform/services/IPlatformRelationService";
import type { TenantRelation } from "@/features/tenants/services/ITenantRelationService";

export type IdentityRelations = {
  identityId: string;
  platform: PlatformRelation[];
  tenants: TenantRelation[];
  workspaces: WorkspaceRelation[];
};

export interface IIdentityRelationService {
  list: (identityId: string, callerIdentityId: string) => Promise<IdentityRelations>;
}
