import { ApplicationError } from "@pine/errors";

export class WorkspaceRelationNotFoundError extends ApplicationError {
  constructor(message = "Workspace relation not found") {
    super("WORKSPACE_RELATION_NOT_FOUND", message, true);
  }
}
