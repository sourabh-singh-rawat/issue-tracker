import { ApplicationError } from "@pine/errors";

export class WorkspaceNameConflictError extends ApplicationError {
  constructor(message = "Workspace name already exists in this tenant") {
    super("WORKSPACE_NAME_CONFLICT", message, true);
  }
}
