import { apiSlice as api } from "../api.config";
export const addTagTypes = ["issue", "workspace"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getProjectActivityList: build.query<
        GetProjectActivityListApiResponse,
        GetProjectActivityListApiArg
      >({
        query: (queryArg) => ({ url: `/activities/projects/${queryArg.id}` }),
        providesTags: ["issue"],
      }),
      getWorkspaceMemberList: build.query<
        GetWorkspaceMemberListApiResponse,
        GetWorkspaceMemberListApiArg
      >({
        query: (queryArg) => ({
          url: `/projects/${queryArg.id}/workspace-members`,
        }),
        providesTags: ["workspace"],
      }),
      getAllWorkspaces: build.query<
        GetAllWorkspacesApiResponse,
        GetAllWorkspacesApiArg
      >({
        query: () => ({ url: `/workspaces` }),
        providesTags: ["workspace"],
      }),
      createWorkspace: build.mutation<
        CreateWorkspaceApiResponse,
        CreateWorkspaceApiArg
      >({
        query: (queryArg) => ({
          url: `/workspaces`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["workspace"],
      }),
      getWorkspace: build.query<GetWorkspaceApiResponse, GetWorkspaceApiArg>({
        query: (queryArg) => ({ url: `/workspaces/${queryArg.id}` }),
        providesTags: ["workspace"],
      }),
      createWorkspaceInvite: build.mutation<
        CreateWorkspaceInviteApiResponse,
        CreateWorkspaceInviteApiArg
      >({
        query: (queryArg) => ({
          url: `/workspaces/invite`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["workspace"],
      }),
      getWorkspaceRoleList: build.query<
        GetWorkspaceRoleListApiResponse,
        GetWorkspaceRoleListApiArg
      >({
        query: () => ({ url: `/workspaces/role` }),
        providesTags: ["workspace"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type GetProjectActivityListApiResponse =
  /** status 200 Get project activities for a given project */ {
    rows: string[];
    rowCount: number;
  };
export type GetProjectActivityListApiArg = {
  id?: string;
};
export type GetWorkspaceMemberListApiResponse =
  /** status 200 Returns the workspace members */ {
    rows?: {
      id?: string;
      displayName?: string;
      createdAt?: string;
    };
  };
export type GetWorkspaceMemberListApiArg = {
  /** Numeric id of the workspace */
  id: string;
};
export type GetAllWorkspacesApiResponse = /** status 201 all workspaces */ {
  data: {
    id: string;
    name: string;
    createdAt: string;
  }[];
  dataCount: number;
};
export type GetAllWorkspacesApiArg = void;
export type CreateWorkspaceApiResponse = /** status 201 Workspace created */ {
  id: string;
};
export type CreateWorkspaceApiArg = {
  /** Fields used to create a workspace */
  body: {
    name: Name;
    description?: Description;
  };
};
export type GetWorkspaceApiResponse = /** status 200 Returns the workspace */ {
  data?: {
    id?: string;
    name?: string;
    createdAt?: string;
  };
};
export type GetWorkspaceApiArg = {
  /** Numeric id of the workspace to get */
  id: string;
};
export type CreateWorkspaceInviteApiResponse =
  /** status 201 Workspace member created */ undefined;
export type CreateWorkspaceInviteApiArg = {
  /** Fields used to create a new workspace member invite */
  body: {
    email: Email;
    workspaceRole: Name;
  };
};
export type GetWorkspaceRoleListApiResponse =
  /** status 200 Get workspace roles list */ {
    rows: string[];
    rowCount: number;
  };
export type GetWorkspaceRoleListApiArg = void;
export type Schema = {
  errors?: {
    message: string;
    field?: string;
  }[];
};
export type Name = string;
export type Description = string;
export type Email = string;
export const {
  useGetProjectActivityListQuery,
  useGetWorkspaceMemberListQuery,
  useGetAllWorkspacesQuery,
  useCreateWorkspaceMutation,
  useGetWorkspaceQuery,
  useCreateWorkspaceInviteMutation,
  useGetWorkspaceRoleListQuery,
} = injectedRtkApi;
