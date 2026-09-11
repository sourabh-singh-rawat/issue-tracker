export type WorkspaceRelation = {
  id: string;
  workspaceId: string;
  identityId: string;
  relation: string;
};

export type CreateWorkspaceRelationInput = {
  workspaceId: string;
  relation: string;
  identityId: string;
};

export type ListWorkspaceRelationsInput = {
  workspaceId: string;
  relation?: string;
  identityId?: string;
};

export type CreateWorkspaceRelationOptions = {
  skipAuthorization?: boolean;
};

export interface IWorkspaceRelationService {
  create: (
    input: CreateWorkspaceRelationInput,
    identityId: string,
    options?: CreateWorkspaceRelationOptions,
  ) => Promise<WorkspaceRelation>;
  getById: (id: string, identityId: string) => Promise<WorkspaceRelation>;
  list: (input: ListWorkspaceRelationsInput, identityId: string) => Promise<WorkspaceRelation[]>;
  delete: (id: string, identityId: string) => Promise<void>;
}
