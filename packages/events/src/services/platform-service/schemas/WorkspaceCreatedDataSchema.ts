import Type from "typebox";

export const WorkspaceCreatedDataSchema = Type.Object(
  {
    id: Type.String(),
    tenantId: Type.String(),
    name: Type.String(),
    slug: Type.String(),
    isActive: Type.Boolean(),
    version: Type.Integer({ minimum: 1 }),
    createdAt: Type.String(),
    description: Type.Optional(Type.String()),
    parentWorkspaceId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export type WorkspaceCreatedData = Type.Static<typeof WorkspaceCreatedDataSchema>;
