import type { Resource } from "../resources";

export type ProfilePermission = "read" | "update";

export type PlatformPermission = "read" | "create_tenant" | "manage_admins";

export type TenantPermission =
  | "read"
  | "read_list"
  | "configure"
  | "manage_members"
  | "create_workspace"
  | "assign_admin"
  | "assign_owner"
  | "suspend"
  | "delete";

export type WorkspacePermission =
  | "read"
  | "update"
  | "manage_members"
  | "create_space"
  | "create_project"
  | "delete";

export type RolePermission = "read" | "create" | "update" | "delete";

export type PermissionGrantPermission = "read" | "create" | "update" | "delete";

export type Permission =
  | ProfilePermission
  | PlatformPermission
  | TenantPermission
  | WorkspacePermission
  | RolePermission
  | PermissionGrantPermission;

export type PermissionKey =
  | `profile:${ProfilePermission}`
  | `platform:${PlatformPermission}`
  | `tenant:${TenantPermission}`
  | `workspace:${WorkspacePermission}`
  | `role:${RolePermission}`
  | `permission:${PermissionGrantPermission}`;

export const PROFILE_PERMISSIONS: readonly ProfilePermission[] = ["read", "update"];

export const PLATFORM_PERMISSIONS: readonly PlatformPermission[] = [
  "read",
  "create_tenant",
  "manage_admins",
];

export const TENANT_PERMISSIONS: readonly TenantPermission[] = [
  "read",
  "read_list",
  "configure",
  "manage_members",
  "create_workspace",
  "assign_admin",
  "assign_owner",
  "suspend",
  "delete",
];

export const WORKSPACE_PERMISSIONS: readonly WorkspacePermission[] = [
  "read",
  "update",
  "manage_members",
  "create_space",
  "create_project",
  "delete",
];

export const ROLE_PERMISSIONS: readonly RolePermission[] = ["read", "create", "update", "delete"];

export const PERMISSION_GRANT_PERMISSIONS: readonly PermissionGrantPermission[] = [
  "read",
  "create",
  "update",
  "delete",
];

const catalog = (
  namespace: Resource,
  permissions: readonly string[],
): readonly { namespace: Resource; permission: string }[] =>
  permissions.map((permission) => ({ namespace, permission }));

export const ALL_PERMISSIONS = [
  ...catalog("profile", PROFILE_PERMISSIONS),
  ...catalog("platform", PLATFORM_PERMISSIONS),
  ...catalog("tenant", TENANT_PERMISSIONS),
  ...catalog("workspace", WORKSPACE_PERMISSIONS),
  ...catalog("role", ROLE_PERMISSIONS),
  ...catalog("permission", PERMISSION_GRANT_PERMISSIONS),
];
