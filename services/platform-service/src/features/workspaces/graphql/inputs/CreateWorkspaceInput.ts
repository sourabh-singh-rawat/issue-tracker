import { builder } from "@pine/server";

export const CreateWorkspaceInput = builder.inputType("CreateWorkspaceInput", {
  fields: (t) => ({
    tenantId: t.string({ required: true }),
    parentWorkspaceId: t.string({ required: false }),
    name: t.string({ required: true }),
    slug: t.string({ required: true }),
    description: t.string({ required: false }),
    isActive: t.boolean({ required: false }),
  }),
});
