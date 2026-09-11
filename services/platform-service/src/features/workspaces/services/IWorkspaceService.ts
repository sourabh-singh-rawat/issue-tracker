import type { Workspace } from "@/db";
import type { WorkspaceNode } from "@/features/workspaces/utils";

export type CreateWorkspaceInput = {
  tenantId: string;
  parentWorkspaceId?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  isActive?: boolean;
};

export type ListWorkspacesInput = {
  tenantId: string;
  parentWorkspaceId?: string | null;
};

export type UpdateWorkspaceInput = {
  parentWorkspaceId?: string | null;
};

export interface IWorkspaceService {
  create: (input: CreateWorkspaceInput, identityId: string) => Promise<Workspace>;
  getById: (id: string, identityId: string) => Promise<Workspace>;
  list: (input: ListWorkspacesInput, identityId: string) => Promise<Workspace[]>;
  listMyWorkspaces: (identityId: string) => Promise<WorkspaceNode[]>;
  update: (id: string, input: UpdateWorkspaceInput, identityId: string) => Promise<Workspace>;
  delete: (id: string, identityId: string) => Promise<void>;
}
