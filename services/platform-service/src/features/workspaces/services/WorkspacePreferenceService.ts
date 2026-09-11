import { requirePermission, type IAuthorizationClient } from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { IdentityWorkspacePreference } from "@/db";
import { WorkspaceNotFoundError } from "@/features/workspaces/errors";
import type { IWorkspacePreferenceRepository } from "@/features/workspaces/repositories/IWorkspacePreferenceRepository";
import type { IWorkspaceRepository } from "@/features/workspaces/repositories/IWorkspaceRepository";
import type { IWorkspacePreferenceService } from "@/features/workspaces/services/IWorkspacePreferenceService";

@injectable()
export class WorkspacePreferenceService implements IWorkspacePreferenceService {
  constructor(
    @inject(TYPES.WorkspacePreferenceRepository)
    private readonly preferenceRepository: IWorkspacePreferenceRepository,
    @inject(TYPES.WorkspaceRepository)
    private readonly workspaceRepository: IWorkspaceRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
  ) {}

  async get(identityId: string) {
    return this.preferenceRepository.findByIdentityId(identityId);
  }

  async set(workspaceId: string, identityId: string): Promise<IdentityWorkspacePreference> {
    const workspace = await this.workspaceRepository.findById(workspaceId);
    if (!workspace || workspace.isActive === false) {
      throw new WorkspaceNotFoundError(`Workspace not found: ${workspaceId}`);
    }

    await requirePermission(
      this.authorizationClient,
      identityId,
      "read",
      `workspace:${workspaceId}`,
    );

    return this.preferenceRepository.upsert({
      identityId,
      workspaceId: workspace.id,
      tenantId: workspace.tenantId,
    });
  }
}
