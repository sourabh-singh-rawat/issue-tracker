import type { IdentityWorkspacePreference } from "@/db";

export interface IWorkspacePreferenceService {
  get: (identityId: string) => Promise<IdentityWorkspacePreference | null>;
  set: (workspaceId: string, identityId: string) => Promise<IdentityWorkspacePreference>;
}
