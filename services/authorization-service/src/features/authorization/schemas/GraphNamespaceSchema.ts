import Type from "typebox";

export const GraphNamespaceSchema = Type.Union([
  Type.Literal("identity"),
  Type.Literal("profile"),
  Type.Literal("platform"),
  Type.Literal("tenant"),
  Type.Literal("workspace"),
  Type.Literal("role"),
  Type.Literal("permission"),
]);
