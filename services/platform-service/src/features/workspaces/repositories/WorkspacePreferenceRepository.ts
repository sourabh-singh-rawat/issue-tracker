import { uuidv7 } from "@pine/common";
import { and, eq, isNull, sql } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import {
  type Database,
  type IdentityWorkspacePreference,
  IdentityWorkspacePreferences,
} from "@/db";
import type {
  IWorkspacePreferenceRepository,
  WorkspacePreferenceRepositoryOptions,
  UpsertWorkspacePreferenceEntity,
} from "@/features/workspaces/repositories/IWorkspacePreferenceRepository";

@injectable()
export class WorkspacePreferenceRepository implements IWorkspacePreferenceRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  async findByIdentityId(
    identityId: string,
    options?: WorkspacePreferenceRepositoryOptions,
  ): Promise<IdentityWorkspacePreference | null> {
    const client = this.client(options);
    const [row] = await client
      .select()
      .from(IdentityWorkspacePreferences)
      .where(
        and(
          eq(IdentityWorkspacePreferences.identityId, identityId),
          isNull(IdentityWorkspacePreferences.deletedAt),
        ),
      )
      .limit(1);

    return row ?? null;
  }

  async upsert(
    entity: UpsertWorkspacePreferenceEntity,
    options?: WorkspacePreferenceRepositoryOptions,
  ): Promise<IdentityWorkspacePreference> {
    const client = this.client(options);
    const now = new Date();
    const existing = await this.findByIdentityId(entity.identityId, options);

    if (existing) {
      const [updated] = await client
        .update(IdentityWorkspacePreferences)
        .set({
          workspaceId: entity.workspaceId,
          tenantId: entity.tenantId,
          updatedAt: now,
          version: sql`${IdentityWorkspacePreferences.version} + 1`,
        })
        .where(
          and(
            eq(IdentityWorkspacePreferences.id, existing.id),
            isNull(IdentityWorkspacePreferences.deletedAt),
          ),
        )
        .returning();

      if (!updated) {
        throw new Error(`Workspace preference not found for update: ${existing.id}`);
      }

      return updated;
    }

    const [created] = await client
      .insert(IdentityWorkspacePreferences)
      .values({
        id: uuidv7(),
        identityId: entity.identityId,
        workspaceId: entity.workspaceId,
        tenantId: entity.tenantId,
        createdAt: now,
        version: 1,
      })
      .returning();

    return created;
  }

  private client(options?: WorkspacePreferenceRepositoryOptions) {
    return options?.tx ?? this.db;
  }
}
