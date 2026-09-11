/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { graphQLFetcher } from '../../graphql/fetcher';
export { graphQLFetcher };
import type * as Types from './graphql';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query';
export type FindIdentitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindIdentitiesQuery = { findIdentities: Array<{ id: string | null }> | null };

export type GetIdentitiesQueryVariables = Exact<{
  platformId: string;
}>;


export type GetIdentitiesQuery = { getIdentities: Array<{ id: string | null, displayName: string | null }> | null };

export type CreatePlatformRelationMutationVariables = Exact<{
  input: Types.CreatePlatformRelationInput;
}>;


export type CreatePlatformRelationMutation = { createPlatformRelation: { id: string | null, identityId: string | null, relation: string | null } | null };

export type DeletePlatformRelationMutationVariables = Exact<{
  id: string;
}>;


export type DeletePlatformRelationMutation = { deletePlatformRelation: string | null };

export type GetIdentityRelationsQueryVariables = Exact<{
  identityId: string;
}>;


export type GetIdentityRelationsQuery = { getIdentityRelations: { identityId: string | null, platform: Array<{ id: string | null, identityId: string | null, relation: string | null }> | null, tenants: Array<{ id: string | null, tenantId: string | null, identityId: string | null, relation: string | null }> | null, workspaces: Array<{ id: string | null, workspaceId: string | null, identityId: string | null, relation: string | null }> | null } | null };

export type GetPlatformRelationsQueryVariables = Exact<{
  relation?: string | null | undefined;
  identityId?: string | null | undefined;
}>;


export type GetPlatformRelationsQuery = { getPlatformRelations: Array<{ id: string | null, identityId: string | null, relation: string | null }> | null };

export type CreateTenantMutationVariables = Exact<{
  input: Types.CreateTenantInput;
}>;


export type CreateTenantMutation = { createTenant: { id: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

export type CreateTenantRelationMutationVariables = Exact<{
  input: Types.CreateTenantRelationInput;
}>;


export type CreateTenantRelationMutation = { createTenantRelation: { id: string | null, tenantId: string | null, identityId: string | null, relation: string | null } | null };

export type DeleteTenantMutationVariables = Exact<{
  id: string;
  platformId: string;
}>;


export type DeleteTenantMutation = { deleteTenant: string | null };

export type GetTenantQueryVariables = Exact<{
  id: string;
}>;


export type GetTenantQuery = { getTenant: { id: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

export type GetTenantRelationsQueryVariables = Exact<{
  tenantId: string;
}>;


export type GetTenantRelationsQuery = { getTenantRelations: Array<{ id: string | null, tenantId: string | null, identityId: string | null, relation: string | null }> | null };

export type GetTenantsQueryVariables = Exact<{
  platformId: string;
}>;


export type GetTenantsQuery = { getTenants: Array<{ id: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown }> | null };

export type CreateWorkspaceMutationVariables = Exact<{
  input: Types.CreateWorkspaceInput;
}>;


export type CreateWorkspaceMutation = { createWorkspace: { id: string | null, tenantId: string | null, parentWorkspaceId: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

export type CreateWorkspaceRelationMutationVariables = Exact<{
  input: Types.CreateWorkspaceRelationInput;
}>;


export type CreateWorkspaceRelationMutation = { createWorkspaceRelation: { id: string | null, workspaceId: string | null, identityId: string | null, relation: string | null } | null };

export type DeleteWorkspaceRelationMutationVariables = Exact<{
  id: string;
}>;


export type DeleteWorkspaceRelationMutation = { deleteWorkspaceRelation: boolean | null };

export type GetWorkspaceQueryVariables = Exact<{
  id: string;
}>;


export type GetWorkspaceQuery = { getWorkspace: { id: string | null, tenantId: string | null, parentWorkspaceId: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

export type GetWorkspaceRelationsQueryVariables = Exact<{
  workspaceId: string;
}>;


export type GetWorkspaceRelationsQuery = { getWorkspaceRelations: Array<{ id: string | null, workspaceId: string | null, identityId: string | null, relation: string | null }> | null };

export type GetWorkspacesQueryVariables = Exact<{
  tenantId: string;
  parentWorkspaceId?: string | null | undefined;
}>;


export type GetWorkspacesQuery = { getWorkspaces: Array<{ id: string | null, tenantId: string | null, parentWorkspaceId: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown }> | null };

export type UpdateWorkspaceMutationVariables = Exact<{
  id: string;
  input: Types.UpdateWorkspaceInput;
}>;


export type UpdateWorkspaceMutation = { updateWorkspace: { id: string | null, tenantId: string | null, parentWorkspaceId: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown } | null };


export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const FindIdentitiesDocument = new TypedDocumentString(`
    query FindIdentities {
  findIdentities {
    id
  }
}
    `);

export const useFindIdentitiesQuery = <
      TData = FindIdentitiesQuery,
      TError = unknown
    >(
      variables?: FindIdentitiesQueryVariables,
      options?: Omit<UseQueryOptions<FindIdentitiesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindIdentitiesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindIdentitiesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindIdentities'] : ['FindIdentities', variables],
    queryFn: graphQLFetcher<FindIdentitiesQuery, FindIdentitiesQueryVariables>(FindIdentitiesDocument, variables),
    ...options
  }
    )};

useFindIdentitiesQuery.document = FindIdentitiesDocument;

useFindIdentitiesQuery.getKey = (variables?: FindIdentitiesQueryVariables) => variables === undefined ? ['FindIdentities'] : ['FindIdentities', variables];

export const GetIdentitiesDocument = new TypedDocumentString(`
    query GetIdentities($platformId: String!) {
  getIdentities(platformId: $platformId) {
    id
    displayName
  }
}
    `);

export const useGetIdentitiesQuery = <
      TData = GetIdentitiesQuery,
      TError = unknown
    >(
      variables: GetIdentitiesQueryVariables,
      options?: Omit<UseQueryOptions<GetIdentitiesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetIdentitiesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetIdentitiesQuery, TError, TData>(
      {
    queryKey: ['GetIdentities', variables],
    queryFn: graphQLFetcher<GetIdentitiesQuery, GetIdentitiesQueryVariables>(GetIdentitiesDocument, variables),
    ...options
  }
    )};

useGetIdentitiesQuery.document = GetIdentitiesDocument;

useGetIdentitiesQuery.getKey = (variables: GetIdentitiesQueryVariables) => ['GetIdentities', variables];

export const CreatePlatformRelationDocument = new TypedDocumentString(`
    mutation CreatePlatformRelation($input: CreatePlatformRelationInput!) {
  createPlatformRelation(input: $input) {
    id
    identityId
    relation
  }
}
    `);

export const useCreatePlatformRelationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreatePlatformRelationMutation, TError, CreatePlatformRelationMutationVariables, TContext>) => {
    
    return useMutation<CreatePlatformRelationMutation, TError, CreatePlatformRelationMutationVariables, TContext>(
      {
    mutationKey: ['CreatePlatformRelation'],
    mutationFn: (variables?: CreatePlatformRelationMutationVariables) => graphQLFetcher<CreatePlatformRelationMutation, CreatePlatformRelationMutationVariables>(CreatePlatformRelationDocument, variables)(),
    ...options
  }
    )};

useCreatePlatformRelationMutation.getKey = () => ['CreatePlatformRelation'];

export const DeletePlatformRelationDocument = new TypedDocumentString(`
    mutation DeletePlatformRelation($id: String!) {
  deletePlatformRelation(id: $id)
}
    `);

export const useDeletePlatformRelationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeletePlatformRelationMutation, TError, DeletePlatformRelationMutationVariables, TContext>) => {
    
    return useMutation<DeletePlatformRelationMutation, TError, DeletePlatformRelationMutationVariables, TContext>(
      {
    mutationKey: ['DeletePlatformRelation'],
    mutationFn: (variables?: DeletePlatformRelationMutationVariables) => graphQLFetcher<DeletePlatformRelationMutation, DeletePlatformRelationMutationVariables>(DeletePlatformRelationDocument, variables)(),
    ...options
  }
    )};

useDeletePlatformRelationMutation.getKey = () => ['DeletePlatformRelation'];

export const GetIdentityRelationsDocument = new TypedDocumentString(`
    query GetIdentityRelations($identityId: String!) {
  getIdentityRelations(identityId: $identityId) {
    identityId
    platform {
      id
      identityId
      relation
    }
    tenants {
      id
      tenantId
      identityId
      relation
    }
    workspaces {
      id
      workspaceId
      identityId
      relation
    }
  }
}
    `);

export const useGetIdentityRelationsQuery = <
      TData = GetIdentityRelationsQuery,
      TError = unknown
    >(
      variables: GetIdentityRelationsQueryVariables,
      options?: Omit<UseQueryOptions<GetIdentityRelationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetIdentityRelationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetIdentityRelationsQuery, TError, TData>(
      {
    queryKey: ['GetIdentityRelations', variables],
    queryFn: graphQLFetcher<GetIdentityRelationsQuery, GetIdentityRelationsQueryVariables>(GetIdentityRelationsDocument, variables),
    ...options
  }
    )};

useGetIdentityRelationsQuery.document = GetIdentityRelationsDocument;

useGetIdentityRelationsQuery.getKey = (variables: GetIdentityRelationsQueryVariables) => ['GetIdentityRelations', variables];

export const GetPlatformRelationsDocument = new TypedDocumentString(`
    query GetPlatformRelations($relation: String, $identityId: String) {
  getPlatformRelations(relation: $relation, identityId: $identityId) {
    id
    identityId
    relation
  }
}
    `);

export const useGetPlatformRelationsQuery = <
      TData = GetPlatformRelationsQuery,
      TError = unknown
    >(
      variables?: GetPlatformRelationsQueryVariables,
      options?: Omit<UseQueryOptions<GetPlatformRelationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPlatformRelationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPlatformRelationsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPlatformRelations'] : ['GetPlatformRelations', variables],
    queryFn: graphQLFetcher<GetPlatformRelationsQuery, GetPlatformRelationsQueryVariables>(GetPlatformRelationsDocument, variables),
    ...options
  }
    )};

useGetPlatformRelationsQuery.document = GetPlatformRelationsDocument;

useGetPlatformRelationsQuery.getKey = (variables?: GetPlatformRelationsQueryVariables) => variables === undefined ? ['GetPlatformRelations'] : ['GetPlatformRelations', variables];

export const CreateTenantDocument = new TypedDocumentString(`
    mutation CreateTenant($input: CreateTenantInput!) {
  createTenant(input: $input) {
    id
    name
    slug
    description
    isActive
    createdAt
    updatedAt
  }
}
    `);

export const useCreateTenantMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateTenantMutation, TError, CreateTenantMutationVariables, TContext>) => {
    
    return useMutation<CreateTenantMutation, TError, CreateTenantMutationVariables, TContext>(
      {
    mutationKey: ['CreateTenant'],
    mutationFn: (variables?: CreateTenantMutationVariables) => graphQLFetcher<CreateTenantMutation, CreateTenantMutationVariables>(CreateTenantDocument, variables)(),
    ...options
  }
    )};

useCreateTenantMutation.getKey = () => ['CreateTenant'];

export const CreateTenantRelationDocument = new TypedDocumentString(`
    mutation CreateTenantRelation($input: CreateTenantRelationInput!) {
  createTenantRelation(input: $input) {
    id
    tenantId
    identityId
    relation
  }
}
    `);

export const useCreateTenantRelationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateTenantRelationMutation, TError, CreateTenantRelationMutationVariables, TContext>) => {
    
    return useMutation<CreateTenantRelationMutation, TError, CreateTenantRelationMutationVariables, TContext>(
      {
    mutationKey: ['CreateTenantRelation'],
    mutationFn: (variables?: CreateTenantRelationMutationVariables) => graphQLFetcher<CreateTenantRelationMutation, CreateTenantRelationMutationVariables>(CreateTenantRelationDocument, variables)(),
    ...options
  }
    )};

useCreateTenantRelationMutation.getKey = () => ['CreateTenantRelation'];

export const DeleteTenantDocument = new TypedDocumentString(`
    mutation DeleteTenant($id: String!, $platformId: String!) {
  deleteTenant(id: $id, platformId: $platformId)
}
    `);

export const useDeleteTenantMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteTenantMutation, TError, DeleteTenantMutationVariables, TContext>) => {
    
    return useMutation<DeleteTenantMutation, TError, DeleteTenantMutationVariables, TContext>(
      {
    mutationKey: ['DeleteTenant'],
    mutationFn: (variables?: DeleteTenantMutationVariables) => graphQLFetcher<DeleteTenantMutation, DeleteTenantMutationVariables>(DeleteTenantDocument, variables)(),
    ...options
  }
    )};

useDeleteTenantMutation.getKey = () => ['DeleteTenant'];

export const GetTenantDocument = new TypedDocumentString(`
    query GetTenant($id: String!) {
  getTenant(id: $id) {
    id
    name
    slug
    description
    isActive
    createdAt
    updatedAt
  }
}
    `);

export const useGetTenantQuery = <
      TData = GetTenantQuery,
      TError = unknown
    >(
      variables: GetTenantQueryVariables,
      options?: Omit<UseQueryOptions<GetTenantQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTenantQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTenantQuery, TError, TData>(
      {
    queryKey: ['GetTenant', variables],
    queryFn: graphQLFetcher<GetTenantQuery, GetTenantQueryVariables>(GetTenantDocument, variables),
    ...options
  }
    )};

useGetTenantQuery.document = GetTenantDocument;

useGetTenantQuery.getKey = (variables: GetTenantQueryVariables) => ['GetTenant', variables];

export const GetTenantRelationsDocument = new TypedDocumentString(`
    query GetTenantRelations($tenantId: String!) {
  getTenantRelations(tenantId: $tenantId) {
    id
    tenantId
    identityId
    relation
  }
}
    `);

export const useGetTenantRelationsQuery = <
      TData = GetTenantRelationsQuery,
      TError = unknown
    >(
      variables: GetTenantRelationsQueryVariables,
      options?: Omit<UseQueryOptions<GetTenantRelationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTenantRelationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTenantRelationsQuery, TError, TData>(
      {
    queryKey: ['GetTenantRelations', variables],
    queryFn: graphQLFetcher<GetTenantRelationsQuery, GetTenantRelationsQueryVariables>(GetTenantRelationsDocument, variables),
    ...options
  }
    )};

useGetTenantRelationsQuery.document = GetTenantRelationsDocument;

useGetTenantRelationsQuery.getKey = (variables: GetTenantRelationsQueryVariables) => ['GetTenantRelations', variables];

export const GetTenantsDocument = new TypedDocumentString(`
    query GetTenants($platformId: String!) {
  getTenants(platformId: $platformId) {
    id
    name
    slug
    description
    isActive
    createdAt
    updatedAt
  }
}
    `);

export const useGetTenantsQuery = <
      TData = GetTenantsQuery,
      TError = unknown
    >(
      variables: GetTenantsQueryVariables,
      options?: Omit<UseQueryOptions<GetTenantsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTenantsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTenantsQuery, TError, TData>(
      {
    queryKey: ['GetTenants', variables],
    queryFn: graphQLFetcher<GetTenantsQuery, GetTenantsQueryVariables>(GetTenantsDocument, variables),
    ...options
  }
    )};

useGetTenantsQuery.document = GetTenantsDocument;

useGetTenantsQuery.getKey = (variables: GetTenantsQueryVariables) => ['GetTenants', variables];

export const CreateWorkspaceDocument = new TypedDocumentString(`
    mutation CreateWorkspace($input: CreateWorkspaceInput!) {
  createWorkspace(input: $input) {
    id
    tenantId
    parentWorkspaceId
    name
    slug
    description
    isActive
    createdAt
    updatedAt
  }
}
    `);

export const useCreateWorkspaceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateWorkspaceMutation, TError, CreateWorkspaceMutationVariables, TContext>) => {
    
    return useMutation<CreateWorkspaceMutation, TError, CreateWorkspaceMutationVariables, TContext>(
      {
    mutationKey: ['CreateWorkspace'],
    mutationFn: (variables?: CreateWorkspaceMutationVariables) => graphQLFetcher<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>(CreateWorkspaceDocument, variables)(),
    ...options
  }
    )};

useCreateWorkspaceMutation.getKey = () => ['CreateWorkspace'];

export const CreateWorkspaceRelationDocument = new TypedDocumentString(`
    mutation CreateWorkspaceRelation($input: CreateWorkspaceRelationInput!) {
  createWorkspaceRelation(input: $input) {
    id
    workspaceId
    identityId
    relation
  }
}
    `);

export const useCreateWorkspaceRelationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateWorkspaceRelationMutation, TError, CreateWorkspaceRelationMutationVariables, TContext>) => {
    
    return useMutation<CreateWorkspaceRelationMutation, TError, CreateWorkspaceRelationMutationVariables, TContext>(
      {
    mutationKey: ['CreateWorkspaceRelation'],
    mutationFn: (variables?: CreateWorkspaceRelationMutationVariables) => graphQLFetcher<CreateWorkspaceRelationMutation, CreateWorkspaceRelationMutationVariables>(CreateWorkspaceRelationDocument, variables)(),
    ...options
  }
    )};

useCreateWorkspaceRelationMutation.getKey = () => ['CreateWorkspaceRelation'];

export const DeleteWorkspaceRelationDocument = new TypedDocumentString(`
    mutation DeleteWorkspaceRelation($id: String!) {
  deleteWorkspaceRelation(id: $id)
}
    `);

export const useDeleteWorkspaceRelationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteWorkspaceRelationMutation, TError, DeleteWorkspaceRelationMutationVariables, TContext>) => {
    
    return useMutation<DeleteWorkspaceRelationMutation, TError, DeleteWorkspaceRelationMutationVariables, TContext>(
      {
    mutationKey: ['DeleteWorkspaceRelation'],
    mutationFn: (variables?: DeleteWorkspaceRelationMutationVariables) => graphQLFetcher<DeleteWorkspaceRelationMutation, DeleteWorkspaceRelationMutationVariables>(DeleteWorkspaceRelationDocument, variables)(),
    ...options
  }
    )};

useDeleteWorkspaceRelationMutation.getKey = () => ['DeleteWorkspaceRelation'];

export const GetWorkspaceDocument = new TypedDocumentString(`
    query GetWorkspace($id: String!) {
  getWorkspace(id: $id) {
    id
    tenantId
    parentWorkspaceId
    name
    slug
    description
    isActive
    createdAt
    updatedAt
  }
}
    `);

export const useGetWorkspaceQuery = <
      TData = GetWorkspaceQuery,
      TError = unknown
    >(
      variables: GetWorkspaceQueryVariables,
      options?: Omit<UseQueryOptions<GetWorkspaceQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetWorkspaceQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetWorkspaceQuery, TError, TData>(
      {
    queryKey: ['GetWorkspace', variables],
    queryFn: graphQLFetcher<GetWorkspaceQuery, GetWorkspaceQueryVariables>(GetWorkspaceDocument, variables),
    ...options
  }
    )};

useGetWorkspaceQuery.document = GetWorkspaceDocument;

useGetWorkspaceQuery.getKey = (variables: GetWorkspaceQueryVariables) => ['GetWorkspace', variables];

export const GetWorkspaceRelationsDocument = new TypedDocumentString(`
    query GetWorkspaceRelations($workspaceId: String!) {
  getWorkspaceRelations(workspaceId: $workspaceId) {
    id
    workspaceId
    identityId
    relation
  }
}
    `);

export const useGetWorkspaceRelationsQuery = <
      TData = GetWorkspaceRelationsQuery,
      TError = unknown
    >(
      variables: GetWorkspaceRelationsQueryVariables,
      options?: Omit<UseQueryOptions<GetWorkspaceRelationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetWorkspaceRelationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetWorkspaceRelationsQuery, TError, TData>(
      {
    queryKey: ['GetWorkspaceRelations', variables],
    queryFn: graphQLFetcher<GetWorkspaceRelationsQuery, GetWorkspaceRelationsQueryVariables>(GetWorkspaceRelationsDocument, variables),
    ...options
  }
    )};

useGetWorkspaceRelationsQuery.document = GetWorkspaceRelationsDocument;

useGetWorkspaceRelationsQuery.getKey = (variables: GetWorkspaceRelationsQueryVariables) => ['GetWorkspaceRelations', variables];

export const GetWorkspacesDocument = new TypedDocumentString(`
    query GetWorkspaces($tenantId: String!, $parentWorkspaceId: String) {
  getWorkspaces(tenantId: $tenantId, parentWorkspaceId: $parentWorkspaceId) {
    id
    tenantId
    parentWorkspaceId
    name
    slug
    description
    isActive
    createdAt
    updatedAt
  }
}
    `);

export const useGetWorkspacesQuery = <
      TData = GetWorkspacesQuery,
      TError = unknown
    >(
      variables: GetWorkspacesQueryVariables,
      options?: Omit<UseQueryOptions<GetWorkspacesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetWorkspacesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetWorkspacesQuery, TError, TData>(
      {
    queryKey: ['GetWorkspaces', variables],
    queryFn: graphQLFetcher<GetWorkspacesQuery, GetWorkspacesQueryVariables>(GetWorkspacesDocument, variables),
    ...options
  }
    )};

useGetWorkspacesQuery.document = GetWorkspacesDocument;

useGetWorkspacesQuery.getKey = (variables: GetWorkspacesQueryVariables) => ['GetWorkspaces', variables];

export const UpdateWorkspaceDocument = new TypedDocumentString(`
    mutation UpdateWorkspace($id: String!, $input: UpdateWorkspaceInput!) {
  updateWorkspace(id: $id, input: $input) {
    id
    tenantId
    parentWorkspaceId
    name
    slug
    description
    isActive
    createdAt
    updatedAt
  }
}
    `);

export const useUpdateWorkspaceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateWorkspaceMutation, TError, UpdateWorkspaceMutationVariables, TContext>) => {
    
    return useMutation<UpdateWorkspaceMutation, TError, UpdateWorkspaceMutationVariables, TContext>(
      {
    mutationKey: ['UpdateWorkspace'],
    mutationFn: (variables?: UpdateWorkspaceMutationVariables) => graphQLFetcher<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>(UpdateWorkspaceDocument, variables)(),
    ...options
  }
    )};

useUpdateWorkspaceMutation.getKey = () => ['UpdateWorkspace'];
