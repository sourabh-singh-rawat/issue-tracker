import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./generated/openapi.json",
  apiFile: "./auth.config.ts",
  apiImport: "apiSlice",
  outputFiles: {
    "./generated/identity.api.ts": {
      filterEndpoints: ["generateTokens", "getCurrentUser", "revokeTokens"],
    },
    "./generated/user.api.ts": {
      filterEndpoints: ["registerUser", "setDefaultWorkspace"],
    },
  },
  exportName: "issueTrackerApi",
  hooks: true,
  tag: true,
};

export default config;
