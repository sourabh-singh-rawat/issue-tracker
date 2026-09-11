import { ApplicationError } from "@pine/errors";

export class WorkspaceNotFoundError extends ApplicationError {
  constructor(message = "Workspace not found") {
    super("WORKSPACE_NOT_FOUND", message, true);
  }
}
