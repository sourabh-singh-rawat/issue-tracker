import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./generated/openapi.json",
  apiFile: "./api.config.ts",
  apiImport: "apiSlice",
  outputFiles: {
    "./generated/identity.api.ts": {
      filterEndpoints: ["generateTokens", "getCurrentUser", "revokeTokens"],
    },
    "./generated/issue.api.ts": {
      filterEndpoints: [
        "createIssue",
        "createIssueComment",
        "createIssueTask",
        "getIssue",
        "getIssueList",
        "getIssueStatusList",
        "getIssuePriorityList",
        "getIssueCommentList",
        "getIssueTaskList",
        "updateIssue",
        "updateIssueStatus",
        "updateIssueResolution",
        "updateIssueTask",
        "deleteIssueComment",
        "createIssueAttachment",
        "getIssueAttachmentList",
      ],
    },
    "./generated/project.api.ts": {
      filterEndpoints: [
        "createProject",
        "createProjectInvite",
        "getProjectStatusList",
        "getProjectRoleList",
        "getProjectList",
        "getProject",
        "getProjectMembers",
        "updateProject",
      ],
    },
    "./generated/user.api.ts": {
      filterEndpoints: ["registerUser", "setDefaultWorkspace"],
    },
    "./generated/workspace.api.ts": {
      filterEndpoints: [
        "createWorkspace",
        "getAllWorkspaces",
        "getWorkspace",
        "getWorkspaceRoleList",
        "createWorkspaceInvite",
        "getProjectActivityList",
        "getWorkspaceMemberList",
      ],
    },
  },
  exportName: "issueTrackerApi",
  hooks: true,
  tag: true,
};

export default config;
