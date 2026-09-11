import { builder } from "@pine/server";

export const CreateWorkspaceRelationInput = builder.inputType("CreateWorkspaceRelationInput", {
  fields: (t) => ({
    workspaceId: t.string({ required: true }),
    relation: t.string({ required: true }),
    identityId: t.string({ required: true }),
  }),
});
