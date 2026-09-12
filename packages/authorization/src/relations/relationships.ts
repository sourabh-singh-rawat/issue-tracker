import { IDENTITY } from "../identities";
import type { GraphRelationship } from "../types/GraphRelationship";
import {
  ADMIN,
  MEMBER,
  WORKSPACE_TENANT,
  OWNER,
  PLATFORM_OBJECT_ID,
  PLATFORM_TENANT,
  TENANT_PLATFORM,
} from "./names";

export const platformAdminRelationship = (identityId: string): GraphRelationship => ({
  object: { namespace: "platform", id: PLATFORM_OBJECT_ID },
  relation: ADMIN,
  subject: { namespace: IDENTITY, id: identityId },
});

export const platformMemberRelationship = (identityId: string): GraphRelationship => ({
  object: { namespace: "platform", id: PLATFORM_OBJECT_ID },
  relation: MEMBER,
  subject: { namespace: IDENTITY, id: identityId },
});

export const tenantOwnerRelationship = (
  tenantId: string,
  identityId: string,
): GraphRelationship => ({
  object: { namespace: "tenant", id: tenantId },
  relation: OWNER,
  subject: { namespace: IDENTITY, id: identityId },
});

export const tenantAdminRelationship = (
  tenantId: string,
  identityId: string,
): GraphRelationship => ({
  object: { namespace: "tenant", id: tenantId },
  relation: ADMIN,
  subject: { namespace: IDENTITY, id: identityId },
});

export const tenantMemberRelationship = (
  tenantId: string,
  identityId: string,
): GraphRelationship => ({
  object: { namespace: "tenant", id: tenantId },
  relation: MEMBER,
  subject: { namespace: IDENTITY, id: identityId },
});

export const workspaceOwnerRelationship = (
  workspaceId: string,
  identityId: string,
): GraphRelationship => ({
  object: { namespace: "workspace", id: workspaceId },
  relation: OWNER,
  subject: { namespace: IDENTITY, id: identityId },
});

export const workspaceAdminRelationship = (
  workspaceId: string,
  identityId: string,
): GraphRelationship => ({
  object: { namespace: "workspace", id: workspaceId },
  relation: ADMIN,
  subject: { namespace: IDENTITY, id: identityId },
});

export const workspaceMemberRelationship = (
  workspaceId: string,
  identityId: string,
): GraphRelationship => ({
  object: { namespace: "workspace", id: workspaceId },
  relation: MEMBER,
  subject: { namespace: IDENTITY, id: identityId },
});

export const platformTenantRelationship = (tenantId: string): GraphRelationship => ({
  object: { namespace: "platform", id: PLATFORM_OBJECT_ID },
  relation: PLATFORM_TENANT,
  subject: { namespace: "tenant", id: tenantId },
});

export const tenantPlatformRelationship = (tenantId: string): GraphRelationship => ({
  object: { namespace: "tenant", id: tenantId },
  relation: TENANT_PLATFORM,
  subject: { namespace: "platform", id: PLATFORM_OBJECT_ID },
});

export const workspaceTenantRelationship = (
  workspaceId: string,
  tenantId: string,
): GraphRelationship => ({
  object: { namespace: "workspace", id: workspaceId },
  relation: WORKSPACE_TENANT,
  subject: { namespace: "tenant", id: tenantId },
});

