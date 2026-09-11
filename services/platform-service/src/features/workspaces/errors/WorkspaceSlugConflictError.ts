import { ApplicationError } from "@pine/errors";

export class WorkspaceSlugConflictError extends ApplicationError {
  constructor(message = "Workspace slug already exists in this tenant") {
    super("WORKSPACE_SLUG_CONFLICT", message, true);
  }
}
