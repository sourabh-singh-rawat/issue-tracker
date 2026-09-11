import type { Tenant, Workspace } from "@/db";

export type PersonalWorkspaceProvision = {
  tenant: Tenant;
  workspace: Workspace;
  created: boolean;
};

export interface IOnboardingService {
  provisionPersonalWorkspace: (identityId: string) => Promise<PersonalWorkspaceProvision>;
}
