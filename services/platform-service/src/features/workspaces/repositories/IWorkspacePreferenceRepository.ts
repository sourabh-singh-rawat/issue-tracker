import type { DbClient, IdentityWorkspacePreference } from "@/db";

export type WorkspacePreferenceRepositoryOptions = { tx: DbClient };

export type UpsertWorkspacePreferenceEntity = {
  identityId: string;
  workspaceId: string;
  tenantId: string;
};

export interface IWorkspacePreferenceRepository {
  findByIdentityId: (
    identityId: string,
    options?: WorkspacePreferenceRepositoryOptions,
  ) => Promise<IdentityWorkspacePreference | null>;
  upsert: (
    entity: UpsertWorkspacePreferenceEntity,
    options?: WorkspacePreferenceRepositoryOptions,
  ) => Promise<IdentityWorkspacePreference>;
}
