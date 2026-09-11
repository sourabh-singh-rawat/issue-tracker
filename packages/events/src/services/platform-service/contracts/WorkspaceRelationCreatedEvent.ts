import { defineEvent } from "../../../cloud-events";
import { WorkspaceRelationCreatedDataSchema } from "../schemas";

export const WorkspaceRelationCreatedEvent = defineEvent({
  type: "platform.workspace-relation.created",
  version: 1,
  schema: WorkspaceRelationCreatedDataSchema,
});
