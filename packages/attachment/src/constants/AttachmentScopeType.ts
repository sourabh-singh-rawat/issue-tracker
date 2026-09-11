export const ATTACHMENT_SCOPE_TYPE = {
  IDENTITY: "IDENTITY",
  WORKSPACE: "WORKSPACE",
} as const;

export type AttachmentScopeType =
  (typeof ATTACHMENT_SCOPE_TYPE)[keyof typeof ATTACHMENT_SCOPE_TYPE];
