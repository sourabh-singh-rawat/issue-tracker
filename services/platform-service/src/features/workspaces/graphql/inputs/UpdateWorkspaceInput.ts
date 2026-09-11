import { builder } from "@pine/server";

export const UpdateWorkspaceInput = builder.inputType("UpdateWorkspaceInput", {
  fields: (t) => ({
    parentWorkspaceId: t.string({ required: false }),
  }),
});
