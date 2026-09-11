import { ApplicationError } from "@pine/errors";

export class InvalidWorkspaceRelationError extends ApplicationError {
  constructor(message = "Invalid workspace relation") {
    super("INVALID_WORKSPACE_RELATION", message, true);
  }
}
